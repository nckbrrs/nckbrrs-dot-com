"use client";

import { useEffect, useState } from "react";

export function useMenuState() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    document.body.style.overflow = "";
    setTimeout(() => setIsOpen(false), 100);
  };

  const toggle = () => (isOpen ? close() : open());

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return { isOpen, open, close, toggle };
}
