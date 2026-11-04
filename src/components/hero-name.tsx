import { cn } from "@/lib/utils";

function Word({ text, className, startIndex }: { text: string; className?: string; startIndex: number }) {
  return (
    <span className={cn("inline-flex", className)}>
      {text.split("").map((letter, i) => (
        <span
          key={i}
          style={{ animationDelay: `${(startIndex + i) * 50}ms` }}
          // The negative tracking shrinks each box below its glyph (the k by ~0.03em); the
          // padding gives the ink room so Safari doesn't clip it mid-animation, and the
          // negative margin takes it back out of the layout.
          className="-mr-[0.05em] inline-block animate-in pr-[0.05em] fill-mode-backwards fade-in slide-in-from-bottom-8 zoom-in-75 [animation-duration:600ms] [animation-timing-function:cubic-bezier(.34,1.56,.64,1)]"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

/** The name, one letter at a time, springing in on load. */
export function HeroName({
  className = "text-[6.25rem] leading-[5.5rem] xs:text-[8rem] xs:leading-[7rem] lg:text-[12rem] lg:leading-[10rem]",
  breakClassName = "lg:hidden",
}: {
  /** Size and leading. */
  className?: string;
  /** When the line break between the words shows. */
  breakClassName?: string;
}) {
  return (
    <h1
      className={cn(
        "ml-leg -translate-x-[0.055em] animate-float cursor-default font-bold tracking-tighter whitespace-nowrap select-none lg:ml-0 lg:translate-x-0",
        className,
      )}
    >
      <Word text="nick" startIndex={0} />{" "}
      <br className={breakClassName} />
      <Word text="barrs" startIndex={4} className="tracking-tight" />
    </h1>
  );
}
