"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import MobileEdgeFades from "./MobileEdgeFades";

interface BackgroundVideoProps {
	className?: string;
	pixelSize?: number;
	bayerLevel?: number;
	levels?: number;
	hueRotate?: number;
	saturate?: number;
	cssHueRotate?: number;
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
  uniform float u_hueRotate;
  uniform float u_saturate;
  uniform float u_time;
  varying vec2 v_texCoord;

  vec3 hueRotate(vec3 c, float angle) {
    float U = cos(angle);
    float W = sin(angle);
    mat3 m = mat3(
      0.299 + 0.701*U + 0.168*W, 0.587 - 0.587*U + 0.330*W, 0.114 - 0.114*U - 0.497*W,
      0.299 - 0.299*U - 0.328*W, 0.587 + 0.413*U + 0.035*W, 0.114 - 0.114*U + 0.292*W,
      0.299 - 0.300*U + 1.250*W, 0.587 - 0.588*U - 1.050*W, 0.114 + 0.886*U - 0.203*W
    );
    return c * m;
  }

  vec3 saturate3(vec3 c, float s) {
    float luma = dot(c, vec3(0.299, 0.587, 0.114));
    return mix(vec3(luma), c, s);
  }

  vec2 coverUV(vec2 uv) {
    float ca = u_resolution.x / u_resolution.y;
    float va = u_videoSize.x / u_videoSize.y;
    vec2 o = uv;
    if (va >= ca) { float s = ca/va; o.x = (1.0-s)*0.5 + uv.x*s; }
    else          { float s = va/ca; o.y = uv.y*s; }
    return o;
  }

  float bayer2(float a, float b) { return 2.0*a + 3.0*b - 4.0*a*b; }
  float bayer8x8(float x, float y) {
    float x0=mod(x,2.0), x1=mod(floor(x/2.0),2.0), x2=floor(x/4.0);
    float y0=mod(y,2.0), y1=mod(floor(y/2.0),2.0), y2=floor(y/4.0);
    return (16.0*bayer2(x2,y2) + 4.0*bayer2(x1,y1) + bayer2(x0,y0)) / 64.0;
  }

  void main() {
    vec2 snapped = floor(v_texCoord * u_resolution / u_pixelSize) * u_pixelSize / u_resolution;
    vec4 color = texture2D(u_video, coverUV(snapped));
    color.rgb = saturate3(hueRotate(color.rgb, u_hueRotate), u_saturate);

    // Scanlines: dim every other two pixel rows, scrolling downward over time
    float scrolled = floor(v_texCoord.y * u_resolution.y) + floor(u_time * 8.0);
    float scanline = 1.0 - 0.40 * step(1.0, mod(scrolled, 4.0));

    // Apply CRT scanlines before dithering
    color.rgb *= scanline;

    vec2 pc = floor(v_texCoord * u_resolution / u_pixelSize);
    float threshold = bayer8x8(mod(pc.x, u_bayerLevel), mod(pc.y, u_bayerLevel)) - 0.5;
    float lvlStep = 1.0 / (u_levels - 1.0);

    gl_FragColor = vec4(
      clamp(floor(color.r/lvlStep + 0.5 + threshold)*lvlStep, 0.0, 1.0),
      clamp(floor(color.g/lvlStep + 0.5 + threshold)*lvlStep, 0.0, 1.0),
      clamp(floor(color.b/lvlStep + 0.5 + threshold)*lvlStep, 0.0, 1.0),
      color.a
    );
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
	const s = gl.createShader(type)!;
	gl.shaderSource(s, src);
	gl.compileShader(s);
	if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
		throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
	return s;
}

function createProgram(gl: WebGLRenderingContext, v: WebGLShader, f: WebGLShader) {
	const p = gl.createProgram()!;
	gl.attachShader(p, v);
	gl.attachShader(p, f);
	gl.linkProgram(p);
	if (!gl.getProgramParameter(p, gl.LINK_STATUS))
		throw new Error(gl.getProgramInfoLog(p) ?? "link error");
	return p;
}

export default function BackgroundVideo({
	className,
	pixelSize = 1,
	bayerLevel = 7,
	levels = 12,
	hueRotate = 0,
	saturate = 4,
	cssHueRotate = 0,
}: BackgroundVideoProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rafRef = useRef<number>(0);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current!;
		if (!canvas) return;

		const offscreen = document.createElement("canvas");
		offscreen.width = 2;
		offscreen.height = 2;
		const ctx = offscreen.getContext("2d")!;
		ctx.fillStyle = "#1866e3";
		ctx.fillRect(0, 0, 2, 2);

		const gl = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false });
		if (!gl) { console.error("WebGL not supported"); return; }

		const program = createProgram(
			gl,
			createShader(gl, gl.VERTEX_SHADER, VERT_SRC),
			createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
		);

		const posBuffer = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

		const texBuffer = gl.createBuffer()!;
		gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,1, 1,1, 0,0, 1,0]), gl.STATIC_DRAW);

		const texture = gl.createTexture()!;
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		const aPos  = gl.getAttribLocation(program, "a_position");
		const aTex  = gl.getAttribLocation(program, "a_texCoord");
		const uVid  = gl.getUniformLocation(program, "u_video");
		const uRes  = gl.getUniformLocation(program, "u_resolution");
		const uVSz  = gl.getUniformLocation(program, "u_videoSize");
		const uPx   = gl.getUniformLocation(program, "u_pixelSize");
		const uBay  = gl.getUniformLocation(program, "u_bayerLevel");
		const uLvl  = gl.getUniformLocation(program, "u_levels");
		const uHue  = gl.getUniformLocation(program, "u_hueRotate");
		const uSat  = gl.getUniformLocation(program, "u_saturate");
		const uTime = gl.getUniformLocation(program, "u_time");

		const startTime = performance.now();

		function render(now: DOMHighResTimeStamp) {
			const elapsed = (now - startTime) / 1000;
			const w = canvas.clientWidth, h = canvas.clientHeight;
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w; canvas.height = h;
				gl!.viewport(0, 0, w, h);
			}

			gl!.useProgram(program);
			gl!.bindTexture(gl!.TEXTURE_2D, texture);
			gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, offscreen);

			gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer);
			gl!.enableVertexAttribArray(aPos);
			gl!.vertexAttribPointer(aPos, 2, gl!.FLOAT, false, 0, 0);

			gl!.bindBuffer(gl!.ARRAY_BUFFER, texBuffer);
			gl!.enableVertexAttribArray(aTex);
			gl!.vertexAttribPointer(aTex, 2, gl!.FLOAT, false, 0, 0);

			gl!.uniform1i(uVid, 0);
			gl!.uniform2f(uRes, canvas.width, canvas.height);
			gl!.uniform2f(uVSz, offscreen.width, offscreen.height);
			gl!.uniform1f(uPx, pixelSize);
			gl!.uniform1f(uBay, bayerLevel);
			gl!.uniform1f(uLvl, Math.max(2, levels));
			gl!.uniform1f(uHue, (hueRotate * Math.PI) / 180);
			gl!.uniform1f(uSat, saturate);
			gl!.uniform1f(uTime, elapsed);

			gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
			setReady(true);
			rafRef.current = requestAnimationFrame(render);
		}

		rafRef.current = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(rafRef.current);
			gl.deleteTexture(texture);
			gl.deleteProgram(program);
		};
	}, [pixelSize, bayerLevel, levels, hueRotate, saturate]);

	return (
		<>
			<canvas
				ref={canvasRef}
				className={twMerge("fixed inset-0 bg-[#005AFD] w-full h-full -z-10", className)}
				style={{
				filter: `hue-rotate(${cssHueRotate}deg)`,
				opacity: ready ? 1 : 0,
				transition: "opacity 0.6s ease-in",
			}}
			/>
			<MobileEdgeFades className="fixed inset-0 -z-10" />
		</>
	);
}
