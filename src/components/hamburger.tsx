import { cn } from "@/lib/utils";

// Two bars from Nick's logo (300×216.86, bars 66.86 thick with a 24 radius),
// scaled to an 18px-tall box. Open, each bar thins, moves to the middle and turns 45° into an X.
const bar = "block w-full origin-center bg-current transition-all duration-200";

export function Hamburger({ open }: { open: boolean }) {
  const thickness = open ? "h-1 rounded-[1.44px]" : "h-[5.55px] rounded-[1.99px]";
  return (
    <span className="flex h-[18px] w-[24.9px] flex-col justify-between" aria-hidden>
      <span className={cn(bar, thickness, open && "translate-y-[7px] rotate-45")} />
      <span className={cn(bar, thickness, open && "-translate-y-[7px] -rotate-45")} />
    </span>
  );
}
