import type { Metadata } from "next";
import Image from "next/image";
import { formatEntryDate, journal } from "@/content/journal";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-24 md:px-16">
      <h1 className="ml-leg -translate-x-[0.0675em] text-6xl font-bold tracking-tighter lg:text-8xl">journal</h1>
      <div className="mt-12 ml-leg grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {journal.map((entry) => (
          <figure key={entry.id} className="flex flex-col gap-3">
            <time
              dateTime={entry.date}
              className="text-xs tracking-[0.2em] text-muted-foreground uppercase tabular-nums"
            >
              {formatEntryDate(entry.date)}
            </time>
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              width={entry.image.width}
              height={entry.image.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-4/5 w-full object-cover"
            />
            <figcaption className="text-base font-medium tracking-tight">
              {entry.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
