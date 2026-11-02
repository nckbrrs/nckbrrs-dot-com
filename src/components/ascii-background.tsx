"use client";

import { useEffect, useRef } from "react";

// A faint ASCII dither behind the page: a 4×4 Bayer matrix picks a character
// from a light-to-dark ramp for each cell of a 28px grid. Rows drift sideways
// in alternating directions, characters near the cursor lean away from it, and
// a click sends a ring outward that nudges each glyph as it passes.
// Drawn on a canvas so each glyph can move on its own.
const CELL = 28;
const RAMP = [".", ":", "-", "+", "*", "#", "@"];
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const SLIDE_PX_PER_S = (CELL * 4) / 40; // one tile width every 40 s
const AVOID_RADIUS = 150; // px, how far the cursor's influence reaches
const AVOID_PUSH = 14; // px, how far a glyph right under the cursor moves
const EASE = 0.15; // how quickly the effect follows the pointer
const RIPPLE_SPEED = 900; // px per second the ring travels
const RIPPLE_WIDTH = 110; // px, thickness of the ring's influence
const RIPPLE_PUSH = 10; // px, how far a glyph moves as the ring passes
const RIPPLE_LIFE_MS = 1800; // how long a ring lasts before it's dropped

type Ripple = { x: number; y: number; start: number };

const glyphAt = (col: number, row: number) =>
  RAMP[Math.floor((BAYER_4[((row % 4) + 4) % 4][((col % 4) + 4) % 4] / 16) * RAMP.length)];

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    const ripples: Ripple[] = [];
    let cols = 0;
    let rows = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '500 11px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#212121";
      cols = Math.ceil(innerWidth / CELL) + 2;
      rows = Math.ceil(innerHeight / CELL) + 1;
    };

    const draw = (now: number) => {
      eased.x += (pointer.x - eased.x) * EASE;
      eased.y += (pointer.y - eased.y) * EASE;
      const travel = ((now / 1000) * SLIDE_PX_PER_S) % (CELL * 4);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      // Each ring: how far it has traveled and how much strength it has left.
      const rings = ripples.map((r) => {
        const age = (now - r.start) / 1000;
        return { ...r, radius: age * RIPPLE_SPEED, strength: 1 - (now - r.start) / RIPPLE_LIFE_MS };
      });

      for (let row = 0; row < rows; row++) {
        const direction = row % 2 ? -1 : 1;
        const shift = direction * travel;
        // Shift the whole row by whole cells plus a remainder, so the Bayer
        // column stays attached to each glyph as the row slides.
        const cellShift = Math.floor(shift / CELL);
        const remainder = shift - cellShift * CELL;
        const y = row * CELL + CELL / 2;

        for (let i = -1; i < cols; i++) {
          const x = i * CELL + CELL / 2 + remainder;
          const dx = x - eased.x;
          const dy = y - eased.y;
          const d = Math.hypot(dx, dy);
          let px = x;
          let py = y;
          if (d < AVOID_RADIUS && d > 0) {
            const push = AVOID_PUSH * (1 - d / AVOID_RADIUS) ** 2;
            px += (dx / d) * push;
            py += (dy / d) * push;
          }
          for (const ring of rings) {
            const rx = x - ring.x;
            const ry = y - ring.y;
            const rd = Math.hypot(rx, ry);
            const fromRing = Math.abs(rd - ring.radius);
            if (fromRing < RIPPLE_WIDTH && rd > 0) {
              // A smooth bump that peaks on the ring and fades with the ring's age.
              const bump = Math.cos((fromRing / RIPPLE_WIDTH) * (Math.PI / 2)) ** 2;
              const push = RIPPLE_PUSH * bump * ring.strength;
              px += (rx / rd) * push;
              py += (ry / rd) * push;
            }
          }
          ctx.fillText(glyphAt(i - cellShift, row), px, py);
        }
      }
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].start > RIPPLE_LIFE_MS) ripples.splice(i, 1);
      frame = requestAnimationFrame(draw);
    };

    const click = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
    };
    const move = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const leave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    frame = requestAnimationFrame(draw);
    addEventListener("resize", resize);
    addEventListener("pointermove", move);
    addEventListener("pointerdown", click);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", click);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full animate-breathe motion-reduce:animate-none motion-reduce:opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,transparent_var(--hole),black_calc(var(--hole)+60%))]"
    />
  );
}
