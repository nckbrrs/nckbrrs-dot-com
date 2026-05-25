import { cn } from "~/lib/utils";

export default function NotFound() {
  return (
    <div className={cn(
      "flex flex-col flex-1 justify-center",
      "px-6 md:px-16",
      "text-black"
    )}>
      <p className={cn(
        "-translate-x-2",
        "font-bold",
        "text-[8rem] lg:text-[12rem]",
        "[text-shadow:0_2px_16px_rgba(0,0,0,0.18)]"
      )}>
        404
      </p>
    </div>
  );
}
