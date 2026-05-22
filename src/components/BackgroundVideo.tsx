"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import MobileEdgeFades from "./MobileEdgeFades";

interface BackgroundVideoProps {
	className?: string;
	pixelSize?: number;
	bayerLevel?: 2 | 4 | 8;
	levels?: number;
	hueRotate?: number;
	saturate?: number;
	cssHueRotate?: number;
}

const CLOUD_W = 800;
const CLOUD_H = 450;

// A single puff within a cloud cluster.
// dx/dy: offset from cloud anchor, fraction of cloud `size`.
// r:     radius, fraction of cloud `size`.
// Adjacent puffs are spaced ~2r apart so each dome sits clearly above the
// shared base — creating the classic bumpy cumulus silhouette. No blur is
// applied; the Bayer dithering in the shader provides the soft appearance.
interface Puff {
	dx: number;
	dy: number;
	r: number;
}

const SHAPES: readonly Puff[][] = [
	// Shape A — wide low cumulus, 4-puff base, 3 bumps left-of-center
	[
		{ dx: -0.54, dy:  0.08, r: 0.28 },
		{ dx: -0.16, dy:  0.05, r: 0.33 },
		{ dx:  0.22, dy:  0.07, r: 0.29 },
		{ dx:  0.55, dy:  0.10, r: 0.24 },
		{ dx: -0.30, dy: -0.18, r: 0.19 },
		{ dx: -0.02, dy: -0.22, r: 0.21 },
		{ dx:  0.22, dy: -0.17, r: 0.17 },
	],
	// Shape B — compact, flat base, 2 bumps right-of-center
	[
		{ dx: -0.38, dy:  0.08, r: 0.25 },
		{ dx: -0.02, dy:  0.08, r: 0.29 },
		{ dx:  0.34, dy:  0.08, r: 0.25 },
		{ dx:  0.08, dy: -0.19, r: 0.18 },
		{ dx:  0.36, dy: -0.15, r: 0.16 },
	],
	// Shape C — single unified mass, large center puff with flanking lobes
	[
		{ dx: -0.36, dy:  0.06, r: 0.24 },
		{ dx:  0.00, dy:  0.03, r: 0.31 },
		{ dx:  0.36, dy:  0.06, r: 0.23 },
		{ dx: -0.20, dy: -0.17, r: 0.18 },
		{ dx:  0.14, dy: -0.20, r: 0.18 },
	],
	// Shape D — large billowing, 5-puff base, 4 bumps left-heavy
	[
		{ dx: -0.66, dy:  0.10, r: 0.26 },
		{ dx: -0.32, dy:  0.07, r: 0.32 },
		{ dx:  0.05, dy:  0.05, r: 0.34 },
		{ dx:  0.40, dy:  0.08, r: 0.29 },
		{ dx:  0.68, dy:  0.12, r: 0.22 },
		{ dx: -0.50, dy: -0.20, r: 0.19 },
		{ dx: -0.18, dy: -0.25, r: 0.22 },
		{ dx:  0.16, dy: -0.21, r: 0.18 },
		{ dx:  0.46, dy: -0.16, r: 0.15 },
	],
	// Shape E — medium, 3 bumps right-leaning
	[
		{ dx: -0.42, dy:  0.09, r: 0.26 },
		{ dx: -0.04, dy:  0.06, r: 0.30 },
		{ dx:  0.36, dy:  0.09, r: 0.24 },
		{ dx: -0.16, dy: -0.19, r: 0.16 },
		{ dx:  0.14, dy: -0.23, r: 0.19 },
		{ dx:  0.40, dy: -0.17, r: 0.15 },
	],
	// Shape F — massive, tight bright core with soft wide falloff
	[
		{ dx: -0.38, dy:  0.07, r: 0.30 },
		{ dx: -0.10, dy:  0.04, r: 0.36 },
		{ dx:  0.18, dy:  0.05, r: 0.34 },
		{ dx:  0.24, dy:  0.08, r: 0.26 },
		{ dx: -0.52, dy:  0.10, r: 0.22 },
		{ dx: -0.24, dy: -0.20, r: 0.23 },
		{ dx:  0.04, dy: -0.25, r: 0.27 },
		{ dx:  0.28, dy: -0.21, r: 0.23 },
	],
];

interface Cloud {
	ox: number;     // initial x offset [0, 1]
	oy: number;     // y position [0, 1]
	size: number;   // cloud scale in canvas pixels
	speed: number;  // canvas-widths per second
	shape: number;  // index into SHAPES
}

const CLOUDS: Cloud[] = [
	{ ox: 0.28, oy: 0.18, size: 100, speed: 0.009, shape: 3 },
	{ ox: 0.78, oy: 0.64, size: 260, speed: 0.005, shape: 5 },
	{ ox: -0.02, oy: 0.68, size: 135, speed: 0.007, shape: 1 },
];

function seededRand(seed: number): number {
	const x = Math.sin(seed + 1) * 43758.5453;
	return x - Math.floor(x);
}

// Jitter each cloud's puffs once at startup so shapes are stable but unique
const CLOUD_PUFFS: Puff[][] = CLOUDS.map((cloud, ci) => {
	const base = (SHAPES[cloud.shape] ?? SHAPES[0]) as Puff[];
	return base.map((p, pi) => ({
		dx: p.dx + (seededRand(ci * 100 + pi * 3 + 0) - 0.5) * 0.18,
		dy: p.dy + (seededRand(ci * 100 + pi * 3 + 1) - 0.5) * 0.05,
		r:  Math.max(0.10, p.r + (seededRand(ci * 100 + pi * 3 + 2) - 0.5) * 0.14),
	}));
});

// Max upward/downward reach of each cloud (fraction of size), computed post-jitter
const CLOUD_EXTENTS = CLOUD_PUFFS.map((puffs) => {
	let top = 0, bottom = 0;
	for (const p of puffs) {
		const reach = p.r * 1.6;
		top    = Math.max(top,    -(p.dy - reach));
		bottom = Math.max(bottom,   p.dy + reach);
	}
	return { top, bottom };
});

function drawClouds(ctx: CanvasRenderingContext2D, elapsed: number) {
	// Sky gradient
	ctx.filter = "none";
	ctx.fillStyle = "#2878b8";
	ctx.fillRect(0, 0, CLOUD_W, CLOUD_H);

	for (const [ci, cloud] of CLOUDS.entries()) {
		const nx = cloud.ox + cloud.speed * elapsed;
		const ext = CLOUD_EXTENTS[ci];
		const cy = Math.max(ext.top * cloud.size, Math.min(CLOUD_H - ext.bottom * cloud.size, cloud.oy * CLOUD_H));
		const puffs = CLOUD_PUFFS[ci];

		const cx = nx * CLOUD_W;
		if (cx - cloud.size * 2 > CLOUD_W) continue;

		for (const p of puffs) {
			const px = cx + p.dx * cloud.size;
			const py = cy + p.dy * cloud.size;
			const r  = p.r * cloud.size * 1.6;

			const sg = ctx.createRadialGradient(px, py, 0, px, py, r);
			sg.addColorStop(0.0, "rgba(255,255,255,0.92)");
			sg.addColorStop(0.45, "rgba(255,255,255,0.72)");
			sg.addColorStop(0.75, "rgba(255,255,255,0.30)");
			sg.addColorStop(1.0,  "rgba(255,255,255,0.00)");
			ctx.fillStyle = sg;
			ctx.fillRect(px - r, py - r, r * 2, r * 2);
		}
	}
	ctx.filter = "none";
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

    vec2 pc = floor(v_texCoord * u_resolution / u_pixelSize);
    float threshold = bayer8x8(mod(pc.x, u_bayerLevel), mod(pc.y, u_bayerLevel)) - 0.5;
    float step = 1.0 / (u_levels - 1.0);

    gl_FragColor = vec4(
      clamp(floor(color.r/step + 0.5 + threshold)*step, 0.0, 1.0),
      clamp(floor(color.g/step + 0.5 + threshold)*step, 0.0, 1.0),
      clamp(floor(color.b/step + 0.5 + threshold)*step, 0.0, 1.0),
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
	bayerLevel = 4,
	levels = 4,
	hueRotate = -0,
	saturate = 1.8,
	cssHueRotate = -4,
}: BackgroundVideoProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rafRef = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current!;
		if (!canvas) return;

		const offscreen = document.createElement("canvas");
		offscreen.width = CLOUD_W;
		offscreen.height = CLOUD_H;
		const ctx = offscreen.getContext("2d")!;

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

		const startTime = performance.now();

		function render(now: DOMHighResTimeStamp) {
			const elapsed = (now - startTime) / 1000;

			drawClouds(ctx, elapsed);

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
			gl!.uniform2f(uVSz, CLOUD_W, CLOUD_H);
			gl!.uniform1f(uPx, pixelSize);
			gl!.uniform1f(uBay, bayerLevel);
			gl!.uniform1f(uLvl, Math.max(2, levels));
			gl!.uniform1f(uHue, (hueRotate * Math.PI) / 180);
			gl!.uniform1f(uSat, saturate);

			gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
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
				style={{ filter: `hue-rotate(${cssHueRotate}deg)` }}
			/>
			<MobileEdgeFades className="fixed inset-0 -z-10" />
		</>
	);
}
