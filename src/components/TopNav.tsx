"use client";

import { useEffect, useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import Hamburger from "./Hamburger";
import { cn } from "~/lib/utils";

const links: { linkType: "external" | "local"; text: string; href: string }[] = [
  { linkType: "external", text: "instagram", href: "https://www.instagram.com/nckbrrs" },
  { linkType: "external", text: "youtube", href: "https://www.youtube.com/@nckbrrs" },
  { linkType: "external", text: "github", href: "https://www.github.com/nckbrrs" },
  { linkType: "external", text: "linkedin", href: "https://www.linkedin.com/in/nckbrrs" },
  { linkType: "external", text: "contact", href: "mailto:hello@nickbarrs.com" },
];

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => (isOpen ? close() : open());

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <FullScreenMenu isOpen={isOpen} links={links} onClickLink={() => setTimeout(close, 20)} />
      <div className={cn(
        "flex flex-row justify-between items-end",
        "w-full h-20 sm:h-24 md:h-28",
        "px-6 md:px-16"
      )}>
        <div />
        <button
          onClick={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="cursor-pointer z-20"
        >
          <Hamburger isOpen={isOpen} />
        </button>
      </div>
    </>
  );
}
