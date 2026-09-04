import NounBubble from "~/components/NounBubble";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center w-full overflow-y-auto">
      <div className={cn(
        "flex flex-col w-full items-start",
        "px-6 md:px-16",
        "text-black"
      )}>
        <div className="flex flex-row pb-3 lg:pb-4">
          <p className={cn(
            "-translate-x-2 font-bold",
            "tracking-tighter",
            "text-[8rem] lg:text-[12rem]",
            "[line-height:7rem] lg:[line-height:10rem]",
            "w-1/2 md:w-full"
          )}>
            nick <span className="tracking-tight">barrs</span>
          </p>
        </div>
        <div className={cn(
          "flex flex-col items-start lg:items-center",
          "lg:flex-row",
          "tracking-tight",
          "text-3xl lg:text-4xl",
          "max-w-xs lg:max-w-full"
        )}>
          <div className="flex flex-row w-fit items-center">
            <p className="font-medium whitespace-nowrap">is a</p>
            <div className="scale-100 mx-3">
              <NounBubble />
            </div>
          </div>
          <p className={cn(
            "font-medium",
            "leading-[3rem] lg:leading-[4rem]",
            "lg:whitespace-nowrap"
          )}>
            living and working in New York City.
          </p>
        </div>
      </div>
    </div>
  );
}
