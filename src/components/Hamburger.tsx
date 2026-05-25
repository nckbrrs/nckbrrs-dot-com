import { cn } from "~/lib/utils";

type HamburgerProps = { isOpen: boolean };

const W = 32;               // px — total width
const H = 22;               // px — total height
const TRANSLATE_X = 8;      // px - translate total hamburger to right when open
const BAR_H = 4;            // px — thickness of each bar
const TRANSLATE_BAR_Y = 13; // px - distance each outer bar travels to reach center

const singleBarBaseStyle = cn("block w-full origin-center", "bg-black", "transition-all duration-200", "[box-shadow:0_4px_16px_rgba(0,0,0,0.18)]");

export default function Hamburger({ isOpen }: HamburgerProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between",
        "hover:scale-105 transition-transform duration-200"
      )}
      style={{ width: W, height: H, transform: isOpen ? `translateX(${TRANSLATE_X}px)` : undefined }}
    >
      <span
        className={cn(singleBarBaseStyle, isOpen ? "rotate-45" : "")}
        style={{ height: BAR_H, transform: isOpen ? `translateY(${TRANSLATE_BAR_Y}px)` : undefined }}
      />
      <span
        className={cn(singleBarBaseStyle, isOpen ? "opacity-0" : "")}
        style={{ height: BAR_H }}
      />
      <span
        className={cn(singleBarBaseStyle, isOpen ? "-rotate-45" : "")}
        style={{ height: BAR_H, transform: isOpen ? `translateY(-${TRANSLATE_BAR_Y}px)` : undefined }}
      />
    </div>
  );
}
