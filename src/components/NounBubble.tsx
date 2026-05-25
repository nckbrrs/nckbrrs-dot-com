"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bgColors = [
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

const nouns = [
  "human",
  "software eng.",
  "creative",
  "musician",
  "pastry lover",
  "photographer",
  "friend",
  "vocalist",
  "coffee snob",
  "concert addict",
  "gamer",
  "husband",
  "enneagram 9",
  "lego builder",
  "knicks fan",
  "human",
];

const INTERVAL  = 2.5;   // seconds per word
const EASE      = "anticipate";
const PADDING_X = 24;    // px — horizontal padding inside the bubble on each side
const FONT_SM   = 32;    // px — font size below lg breakpoint
const FONT_LG   = 36;    // px — font size at lg breakpoint and above
const BREAKPOINT_LG = 1024; // px

function getFontSize(): number {
  return window.innerWidth >= BREAKPOINT_LG ? FONT_LG : FONT_SM;
}

function measureWords(nouns: string[], fontSize: number): number[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return nouns.map(() => 150);
  ctx.font = `bold ${fontSize}px "Helvetica Neue", Arial, sans-serif`;
  return nouns.map((n) => Math.ceil(ctx.measureText(n).width));
}

export default function NounBubble() {
  const [widths, setWidths] = useState<number[]>([]);
  const [fontSize, setFontSize] = useState(FONT_SM);

  useEffect(() => {
    const measure = () => {
      const fs = getFontSize();
      setFontSize(fs);
      setWidths(measureWords(nouns, fs));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [nouns]);

  const ready = widths.length === nouns.length;

  const bubbleWidths = widths.map((w) => w + PADDING_X * 2);
  const slotW = Math.max(...bubbleWidths) + PADDING_X;
  const translateXs = widths.map((_, i) =>
    bubbleWidths[i]! / 2 - i * slotW - slotW / 2
  );

  if (!ready) return null;

  return (
    <motion.div
      className="flex flex-row justify-center items-center z-10 h-14 overflow-hidden rounded-full relative"
      initial={{ backgroundColor: bgColors[0], width: bubbleWidths[0] }}
      animate={{ background: bgColors, width: bubbleWidths }}
      transition={{
        background: { repeat: Infinity, duration: (bgColors.length - 1) * INTERVAL, ease: EASE, delay: 1 },
        default: { repeat: Infinity, duration: (nouns.length - 1) * INTERVAL, ease: EASE, delay: 1 },
      }}
    >
      <motion.div
        className="flex flex-row flex-nowrap h-10 absolute left-0"
        initial={{ x: translateXs[0] }}
        animate={{ x: translateXs }}
        transition={{ repeat: Infinity, duration: (nouns.length - 1) * INTERVAL, ease: EASE, delay: 1 }}
      >
        {nouns.map((n, i) => (
          <p
            key={`${i}-${n}`}
            className="font-bold text-bone text-nowrap text-center drop-shadow-sm"
            style={{ width: slotW, fontSize }}
          >
            {n}
          </p>
        ))}
      </motion.div>
    </motion.div>
  );
}
