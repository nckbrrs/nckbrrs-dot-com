# nickbarrs.com

Personal site. Next.js (App Router), Tailwind v4, shadcn (Base UI), deployed on Vercel.

```bash
bun install
bun dev
```

## Layout

```
src/
  app/            routes: /, /journal, 404
  components/     site components; components/ui is shadcn-generated
  content/        the data: nav links, nouns, journal entries
  lib/            utilities
```

## Adding a journal entry

Add an object to the top of `src/content/journal.ts`. Photos can live anywhere
`next/image` is allowed to fetch from (`images.remotePatterns` in `next.config.ts`),
so moving from the placeholder host to S3 or Vercel Blob is a URL change.
