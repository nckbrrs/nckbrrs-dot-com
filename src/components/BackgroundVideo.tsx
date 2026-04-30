"use client";

import { forwardRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface BackgroundVideoProps {
	className?: string;
	controlled?: boolean;
	pixelSize?: number;
	bayerLevel?: 2 | 4 | 8;
	levels?: number;
	hueRotate?: number; // degrees (in-shader, before quantization)
	saturate?: number;  // 1.0 = unchanged (in-shader, before quantization)
	cssHueRotate?: number; // degrees, applied as CSS filter on the canvas (post-dither)
}

const VERT_SRC = /* glsl */ `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const FRAG_SRC = /* glsl */ `
  precision mediump float;
  uniform sampler2D u_video;
  uniform vec2 u_resolution;
  uniform vec2 u_videoSize;
  uniform float u_pixelSize;
  uniform float u_bayerLevel;
  uniform float u_levels;
  uniform float u_hueRotate; // radians
  uniform float u_saturate;
  varying vec2 v_texCoord;

  // Hue rotation around the luma axis (Graphics Gems approximation).
  vec3 hueRotate(vec3 c, float angle) {
    float U = cos(angle);
    float W = sin(angle);
    mat3 m = mat3(
      0.299 + 0.701 * U + 0.168 * W,
      0.587 - 0.587 * U + 0.330 * W,
      0.114 - 0.114 * U - 0.497 * W,
      0.299 - 0.299 * U - 0.328 * W,
      0.587 + 0.413 * U + 0.035 * W,
      0.114 - 0.114 * U + 0.292 * W,
      0.299 - 0.300 * U + 1.250 * W,
      0.587 - 0.588 * U - 1.050 * W,
      0.114 + 0.886 * U - 0.203 * W
    );
    return c * m;
  }

  vec3 saturate3(vec3 c, float s) {
    float luma = dot(c, vec3(0.299, 0.587, 0.114));
    return mix(vec3(luma), c, s);
  }

  // object-cover with object-top: scale video to fill canvas, crop overflow,
  // anchor top when video is taller than canvas, center when wider.
  vec2 coverUV(vec2 uv) {
    float canvasAspect = u_resolution.x / u_resolution.y;
    float videoAspect = u_videoSize.x / u_videoSize.y;
    vec2 outUV = uv;
    if (videoAspect >= canvasAspect) {
      float scale = canvasAspect / videoAspect;
      outUV.x = (1.0 - scale) * 0.5 + uv.x * scale;
    } else {
      float scale = videoAspect / canvasAspect;
      outUV.y = uv.y * scale;
    }
    return outUV;
  }

  // Closed-form Bayer 8x8 via recursive 2x2 base B2(a,b) = 2a + 3b - 4ab.
  // GLSL ES 1.00 doesn't allow dynamic indexing into local arrays.
  float bayer2(float a, float b) {
    return 2.0 * a + 3.0 * b - 4.0 * a * b;
  }
  float bayer8x8(float x, float y) {
    float x0 = mod(x, 2.0);
    float x1 = mod(floor(x / 2.0), 2.0);
    float x2 = floor(x / 4.0);
    float y0 = mod(y, 2.0);
    float y1 = mod(floor(y / 2.0), 2.0);
    float y2 = floor(y / 4.0);
    float v = 16.0 * bayer2(x2, y2) + 4.0 * bayer2(x1, y1) + bayer2(x0, y0);
    return v / 64.0;
  }

  void main() {
    vec2 snappedUV = floor(v_texCoord * u_resolution / u_pixelSize) * u_pixelSize / u_resolution;
    vec4 color = texture2D(u_video, coverUV(snappedUV));
    color.rgb = saturate3(hueRotate(color.rgb, u_hueRotate), u_saturate);

    vec2 pixelCoord = floor(v_texCoord * u_resolution / u_pixelSize);
    float bx = mod(pixelCoord.x, u_bayerLevel);
    float by = mod(pixelCoord.y, u_bayerLevel);

    // Center threshold around 0 so dither is unbiased (avoids hue shift on
    // saturated colors like sky blue).
    float threshold = bayer8x8(bx, by) - 0.5;

    float step = 1.0 / (u_levels - 1.0);
    float r = floor(color.r / step + 0.5 + threshold) * step;
    float g = floor(color.g / step + 0.5 + threshold) * step;
    float b = floor(color.b / step + 0.5 + threshold) * step;

    gl_FragColor = vec4(clamp(r, 0.0, 1.0), clamp(g, 0.0, 1.0), clamp(b, 0.0, 1.0), color.a);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type)!;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw new Error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
	}
	return shader;
}

function createProgram(gl: WebGLRenderingContext, vert: WebGLShader, frag: WebGLShader): WebGLProgram {
	const program = gl.createProgram()!;
	gl.attachShader(program, vert);
	gl.attachShader(program, frag);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
	}
	return program;
}

const BackgroundVideo = forwardRef<HTMLVideoElement, BackgroundVideoProps>(
	function BackgroundVideo(
		{
			className,
			controlled = false,
			pixelSize = 1,
			bayerLevel = 4,
			levels = 4,
			hueRotate = -20,
			saturate = 1.8,
			cssHueRotate = -22,
		},
		ref
	) {
		const internalRef = useRef<HTMLVideoElement>(null);
		const videoRef = (ref as React.RefObject<HTMLVideoElement>) ?? internalRef;
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const rafRef = useRef<number>(0);

		useEffect(() => {
			// Fallback for browsers where autoPlay is blocked and the canplay
			// event fires before React attaches handlers (e.g. a cached video
			// that's instantly ready). Not redundant with onCanPlay below.
			if (controlled || !videoRef.current) return;
			videoRef.current.playbackRate = 2;
			videoRef.current.play().catch(() => {});
		}, [videoRef, controlled]);

		useEffect(() => {
			const canvas = canvasRef.current!;
			const video = videoRef.current!;
			if (!canvas || !video) return;

			const gl = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false });
			if (!gl) {
				console.error("WebGL not supported");
				return;
			}

			const vert = createShader(gl, gl.VERTEX_SHADER, VERT_SRC);
			const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
			const program = createProgram(gl, vert, frag);

			const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
			const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

			const posBuffer = gl.createBuffer()!;
			gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

			const texBuffer = gl.createBuffer()!;
			gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

			const texture = gl.createTexture()!;
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

			const aPosition = gl.getAttribLocation(program, "a_position");
			const aTexCoord = gl.getAttribLocation(program, "a_texCoord");
			const uVideo = gl.getUniformLocation(program, "u_video");
			const uResolution = gl.getUniformLocation(program, "u_resolution");
			const uVideoSize = gl.getUniformLocation(program, "u_videoSize");
			const uPixelSize = gl.getUniformLocation(program, "u_pixelSize");
			const uBayerLevel = gl.getUniformLocation(program, "u_bayerLevel");
			const uLevels = gl.getUniformLocation(program, "u_levels");
			const uHueRotate = gl.getUniformLocation(program, "u_hueRotate");
			const uSaturate = gl.getUniformLocation(program, "u_saturate");

			function render() {
				if (video.readyState < 2) {
					rafRef.current = requestAnimationFrame(render);
					return;
				}

				const w = canvas.clientWidth;
				const h = canvas.clientHeight;
				if (canvas.width !== w || canvas.height !== h) {
					canvas.width = w;
					canvas.height = h;
					gl!.viewport(0, 0, w, h);
				}

				gl!.useProgram(program);

				gl!.bindTexture(gl!.TEXTURE_2D, texture);
				gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, video);

				gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer);
				gl!.enableVertexAttribArray(aPosition);
				gl!.vertexAttribPointer(aPosition, 2, gl!.FLOAT, false, 0, 0);

				gl!.bindBuffer(gl!.ARRAY_BUFFER, texBuffer);
				gl!.enableVertexAttribArray(aTexCoord);
				gl!.vertexAttribPointer(aTexCoord, 2, gl!.FLOAT, false, 0, 0);

				gl!.uniform1i(uVideo, 0);
				gl!.uniform2f(uResolution, canvas.width, canvas.height);
				gl!.uniform2f(
					uVideoSize,
					video.videoWidth || canvas.width,
					video.videoHeight || canvas.height
				);
				gl!.uniform1f(uPixelSize, pixelSize);
				gl!.uniform1f(uBayerLevel, bayerLevel);
				gl!.uniform1f(uLevels, Math.max(2, levels));
				gl!.uniform1f(uHueRotate, (hueRotate * Math.PI) / 180);
				gl!.uniform1f(uSaturate, saturate);

				gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
				rafRef.current = requestAnimationFrame(render);
			}

			const onCanPlayStart = () => {
				rafRef.current = requestAnimationFrame(render);
			};
			video.addEventListener("canplay", onCanPlayStart);

			if (video.readyState >= 2) {
				rafRef.current = requestAnimationFrame(render);
			}

			return () => {
				cancelAnimationFrame(rafRef.current);
				video.removeEventListener("canplay", onCanPlayStart);
				gl.deleteTexture(texture);
				gl.deleteProgram(program);
			};
		}, [pixelSize, bayerLevel, levels, hueRotate, saturate, videoRef]);

		const handleCanPlay = () => {
			// Primary mobile play trigger. autoPlay alone is often blocked on
			// mobile; explicitly calling play() inside a browser-fired event is
			// more reliably permitted. Also sets playbackRate since autoPlay
			// doesn't expose a way to configure that before playback starts.
			// When controlled=true, the parent (FullScreenMenu) owns playback.
			if (controlled || !videoRef.current) return;
			videoRef.current.playbackRate = 2;
			videoRef.current.play().catch(() => {});
		};

		return (
			<>
				<video
					ref={videoRef}
					autoPlay={!controlled}
					muted
					loop
					playsInline
					preload="auto"
					onCanPlay={handleCanPlay}
					style={{
						position: "absolute",
						width: 1,
						height: 1,
						opacity: 0,
						pointerEvents: "none",
					}}
					aria-hidden
				>
					<source src="/sky_compressed.mp4" type="video/mp4" />
				</video>
				<canvas
					ref={canvasRef}
					className={twMerge(
						"fixed inset-0 bg-gray-900 w-full h-full -z-10 -scale-x-100",
						className
					)}
					style={{ filter: `hue-rotate(${cssHueRotate}deg)` }}
				/>
			</>
		);
	}
);

export default BackgroundVideo;
