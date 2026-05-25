"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function Footer() {
  const [wiggling, setWiggling] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!wiggling) {
      setWiggling(true);
      setTimeout(() => setWiggling(false), 600);
    }
  };

  return (
    <div className={cn(
      "flex flex-row justify-end items-end",
      "w-full px-6 md:px-16",
      "pb-8 sm:pb-16 md:pb-20"
    )}>
      {/* <Link
        href="mailto:hello@nickbarrs.com"
        className="flex justify-center items-center"
        onClick={handleClick}
      >
        <p className={cn("text-4xl origin-bottom-right", wiggling ? "animate-wiggle" : "")}>👋</p>
      </Link> */}
      <p className="text-4xl">&nbsp;</p>
    </div>
  );
}
