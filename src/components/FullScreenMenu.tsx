"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Background from "./Background";
import MobileEdgeFades from "./MobileEdgeFades";
import { cn } from "~/lib/utils";

interface FullScreenMenuProps {
  isOpen: boolean;
  links: { linkType: "external" | "local"; text: string; href: string }[];
  onClickLink: () => void;
}

export default function FullScreenMenu({ isOpen, links, onClickLink }: FullScreenMenuProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-row justify-center items-center",
        "fixed left-0 top-0 w-full h-full z-20",
        "text-black overflow-hidden"
      )}
      animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
      initial={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black" />
      <Background className="z-0" />
      <MobileEdgeFades className="absolute inset-0 z-10" />
      <nav className="group flex flex-col items-start gap-0 lg:gap-1 relative">
        {links.map((l) => (
          <Link
            key={l.text}
            href={l.href}
            target={l.linkType === "external" ? "_blank" : undefined}
            rel={l.linkType === "external" ? "noopener noreferrer" : undefined}
            onClick={onClickLink}
            className={cn(
              "w-full text-left",
              "text-4xl md:text-5xl lg:text-7xl font-bold italic",
              "transition-all duration-200",
              "group-hover:opacity-25 group-hover:blur-[2px]",
              "hover:!opacity-100 hover:!blur-none hover:translate-x-3",
              "[text-shadow:0_2px_16px_rgba(0,0,0,0.18)]"
            )}
          >
            {l.text.toUpperCase()}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
