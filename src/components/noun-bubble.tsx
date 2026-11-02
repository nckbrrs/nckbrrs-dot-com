"use client";

import { useEffect, useState } from "react";
import { anticipate, motion } from "motion/react";
import { nouns } from "@/content/nouns";

const INTERVAL_S = 2.5; // seconds each noun is shown
const EASE = "anticipate";
const PADDING_X = 24; // px inside the bubble on each side
const FONT_XS = 26; // px below the xs breakpoint (very narrow phones)
const FONT_SM = 32; // px below the lg breakpoint
const FONT_LG = 36; // px at lg and above
const BREAKPOINT_XS = 368; // px
const BREAKPOINT_LG = 1024; // px

const colors = [
  "#f97316", // orange-500
  "#22d3ee", // cyan-400
  "#ef4444", // red-500
  "#22c55e", // green-500
  "#6b7280", // gray-500
  "#eab308", // yellow-500
  "#3b82f6", // blue-500
  "#14b8a6", // teal-500
  "#a855f7", // purple-500
  "#ef4444", // red-500
];

// The strip ends on the word it started with so the loop is seamless.
const words = [...nouns, nouns[0]];

// One color per word, so color and word share a keyframe (and a loop length), however
// many nouns there are. The last matches the first to close the loop.
const wordColors = words.map((_, i) => colors[i === words.length - 1 ? 0 : i % colors.length]);

// The word's ease dips backwards before it slides, which would push a color past its
// ends; clamped, the color holds through the dip and then changes with the slide.
// Given once per word: a single function would stretch across the whole loop.
const colorEase = (p: number) => Math.min(1, Math.max(0, anticipate(p)));
const colorEases = words.slice(1).map(() => colorEase);

type Layout = { fontSize: number; widths: number[] };

function measureLayout(): Layout {
  const fontSize = window.innerWidth >= BREAKPOINT_LG ? FONT_LG : window.innerWidth >= BREAKPOINT_XS ? FONT_SM : FONT_XS;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return { fontSize, widths: words.map(() => 150) };
  ctx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  return { fontSize, widths: words.map((word) => Math.ceil(ctx.measureText(word).width)) };
}

/**
 * A colored pill that slides through the nouns on a loop, resizing to fit each
 * word. Widths are measured up front so the whole cycle is one keyframe animation.
 */
export function NounBubble() {
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const update = () => setLayout(measureLayout());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!layout) return null;

  const { fontSize, widths } = layout;
  const bubbleWidths = widths.map((w) => w + PADDING_X * 2);
  const slotWidth = Math.max(...bubbleWidths) + PADDING_X;
  // Shift the strip so word i sits centered in the bubble.
  const offsets = bubbleWidths.map((w, i) => w / 2 - i * slotWidth - slotWidth / 2);
  const loop = { repeat: Infinity, ease: EASE, delay: 1 } as const;
  const pillHeight = fontSize === FONT_XS ? 46 : 56;

  return (
    <motion.span
      className="relative mx-3 inline-flex items-center justify-center overflow-hidden rounded-full"
      style={{ height: pillHeight }}
      initial={{ backgroundColor: wordColors[0], width: bubbleWidths[0] }}
      animate={{ backgroundColor: wordColors, width: bubbleWidths }}
      transition={{
        backgroundColor: { ...loop, ease: colorEases, duration: (words.length - 1) * INTERVAL_S },
        width: { ...loop, duration: (words.length - 1) * INTERVAL_S },
      }}
    >
      <motion.span
        className="absolute left-0 flex flex-nowrap"
        style={{ height: pillHeight - 16 }}
        initial={{ x: offsets[0] }}
        animate={{ x: offsets }}
        transition={{ ...loop, duration: (words.length - 1) * INTERVAL_S }}
      >
        {words.map((word, i) => (
          <span
            key={`${i}-${word}`}
            className="text-center font-bold text-nowrap text-background drop-shadow-sm"
            style={{ width: slotWidth, fontSize, lineHeight: `${pillHeight - 16}px` }}
          >
            {word}
          </span>
        ))}
      </motion.span>
    </motion.span>
  );
}
