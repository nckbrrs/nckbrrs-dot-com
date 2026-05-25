"use client";

import { useEffect, useRef } from "react";
import { BG_COLOR } from "~/lib/colors";

const TILE = 1000;      // noise tile size — smaller = coarser grain
const FPS = 4;          // flicker rate — 12 = filmic, 24 = subtle, 6 = aggressive
const STRENGTH = 50;    // max brightness offset per pixel (±); raise for more grain
const JITTER = 0.2;     // 0–1; how much random noise to mix in alongside the dither pattern

const hex = BG_COLOR.replace("#", "");
const BG = [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16),
] as const;

// Bayer 8x8 ordered dither matrix, normalized to [-0.5, 0.5]
const BAYER_8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => v / 63 - 0.5);

export default function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = TILE;
    canvas.height = TILE;

    let timer: ReturnType<typeof setTimeout>;

    function draw() {
      const ox = Math.floor(Math.random() * 8);
      const oy = Math.floor(Math.random() * 8);

      const data = ctx.createImageData(TILE, TILE);
      for (let y = 0; y < TILE; y++) {
        for (let x = 0; x < TILE; x++) {
          const bayer = BAYER_8[((y + oy) % 8) * 8 + ((x + ox) % 8)];
          const random = (Math.random() - 0.5) * JITTER;
          const noise = ((bayer * (1 - JITTER) + random) * STRENGTH * 2) | 0;
          const i = (y * TILE + x) * 4;
          data.data[i]     = BG[0] + noise;
          data.data[i + 1] = BG[1] + noise;
          data.data[i + 2] = BG[2] + noise;
          data.data[i + 3] = 255;
        }
      }
      ctx.putImageData(data, 0, 0);
      timer = setTimeout(draw, 1000 / FPS);
    }

    draw();
    return () => clearTimeout(timer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
