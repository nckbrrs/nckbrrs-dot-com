"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Hamburger } from "@/components/hamburger";
import { Logo } from "@/components/logo";
import { links } from "@/content/links";

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <header className="flex h-20 items-end px-6 sm:h-24 md:h-28 md:px-16">
        <div className="flex w-full items-center justify-between">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <DialogTrigger
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-60 transition-transform duration-200 hover:scale-105"
          >
            <Hamburger open={open} />
          </DialogTrigger>
        </div>
      </header>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 flex h-dvh w-dvw max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none bg-background/70 p-0 ring-0 backdrop-blur-2xl sm:max-w-none data-open:zoom-in-100 data-closed:zoom-out-100"
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <nav className="group flex flex-col items-center gap-1">
          {links.map((link, i) => (
            // The outer span owns the hover and the entrance and never moves; the link
            // inside floats (each started at a different point in the cycle), so the
            // hit area stays put while the text drifts.
            <span
              key={link.href}
              style={{ animationDelay: `${i * 40}ms` }}
              className="group/link block animate-in fill-mode-backwards fade-in slide-in-from-bottom-4 ease-out [animation-duration:400ms]"
            >
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${-i * 1.1}s` }}
                className="block animate-float px-6 py-2 text-4xl font-semibold tracking-tight transition-[opacity,filter,scale] duration-[60ms] ease-out will-change-[opacity,filter] group-hover:opacity-30 group-hover:blur-[2px] group-hover/link:scale-105 group-hover/link:opacity-100! group-hover/link:blur-none! md:text-5xl lg:text-6xl"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
