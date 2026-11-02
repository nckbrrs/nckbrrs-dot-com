/**
 * The journal manifest. One entry per photo, newest first.
 *
 * `image.src` is any URL `next/image` is allowed to load (see
 * `images.remotePatterns` in next.config.ts). Point it at S3, Vercel Blob,
 * or a file in /public; nothing else in the codebase cares where photos live.
 * Remote images need `width` and `height` so the layout never shifts.
 */
export type JournalEntry = {
  id: string;
  date: string; // ISO date, e.g. "2026-10-04"
  caption: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

const placeholder = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

export const journal: JournalEntry[] = [
  {
    id: "2026-10-04-dumbo",
    date: "2026-10-04",
    caption: "Saturday. Fog sat on the bridge until almost noon.",
    image: { src: placeholder("dumbo", 1600, 1200), width: 1600, height: 1200, alt: "Fog over the Manhattan Bridge" },
  },
  {
    id: "2026-10-01-cortado",
    date: "2026-10-01",
    caption: "Third cortado of the week from the place on Bedford. No regrets.",
    image: { src: placeholder("cortado", 1200, 1500), width: 1200, height: 1500, alt: "A cortado on a marble counter" },
  },
  {
    id: "2026-09-28-garden",
    date: "2026-09-28",
    caption: "MSG, section 212. We lost. Still worth it.",
    image: { src: placeholder("garden", 1600, 1067), width: 1600, height: 1067, alt: "The view from the upper bowl at Madison Square Garden" },
  },
  {
    id: "2026-09-25-lego",
    date: "2026-09-25",
    caption: "Finished the typewriter. 2,079 pieces, two evenings.",
    image: { src: placeholder("lego", 1400, 1400), width: 1400, height: 1400, alt: "A finished Lego typewriter on a desk" },
  },
  {
    id: "2026-09-21-croissant",
    date: "2026-09-21",
    caption: "Lamination you could read a newspaper through.",
    image: { src: placeholder("croissant", 1500, 1200), width: 1500, height: 1200, alt: "A croissant cut in half showing its layers" },
  },
  {
    id: "2026-09-18-subway",
    date: "2026-09-18",
    caption: "Q train, 11:40pm. Everyone asleep except the saxophone.",
    image: { src: placeholder("subway", 1200, 1600), width: 1200, height: 1600, alt: "An almost empty subway car at night" },
  },
  {
    id: "2026-09-14-show",
    date: "2026-09-14",
    caption: "Brooklyn Steel. Ears still ringing, as intended.",
    image: { src: placeholder("show", 1600, 1200), width: 1600, height: 1200, alt: "Stage lights at a concert" },
  },
  {
    id: "2026-09-10-roof",
    date: "2026-09-10",
    caption: "First evening cool enough for the roof.",
    image: { src: placeholder("roof", 1400, 1050), width: 1400, height: 1050, alt: "A rooftop at dusk with the skyline behind" },
  },
  {
    id: "2026-09-06-keys",
    date: "2026-09-06",
    caption: "Learning the bridge of a song I should have learned years ago.",
    image: { src: placeholder("keys", 1200, 1500), width: 1200, height: 1500, alt: "Hands on a piano keyboard" },
  },
];

export const latestEntries = (count: number) => journal.slice(0, count);

export const formatEntryDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
