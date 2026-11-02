export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const links: NavLink[] = [
  { label: "twitter", href: "https://x.com/nckbrrs", external: true },
  { label: "instagram", href: "https://www.instagram.com/nckbrrs", external: true },
  { label: "youtube", href: "https://www.youtube.com/@nckbrrs", external: true },
  { label: "github", href: "https://www.github.com/nckbrrs", external: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/nckbrrs", external: true },
  { label: "contact", href: "mailto:hello@nickbarrs.com", external: true },
];
