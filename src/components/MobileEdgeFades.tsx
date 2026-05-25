import { cn } from "~/lib/utils";

interface MobileEdgeFadesProps {
  className?: string;
}

const VERTICAL_FULL =
  "[background:linear-gradient(to_bottom,var(--bg-fade)_0%,transparent_18%,transparent_82%,var(--bg-fade)_100%)]";
const VERTICAL_TOP =
  "[background:linear-gradient(to_bottom,var(--bg-fade)_0%,transparent_18%)]";
const HORIZONTAL =
  "[background:linear-gradient(to_right,var(--bg-fade)_0%,transparent_6%,transparent_94%,var(--bg-fade)_100%)]";

export default function MobileEdgeFades({ className }: MobileEdgeFadesProps) {
  return (
    <>
      <div className={cn("pointer-events-none sm:hidden", VERTICAL_FULL, className)} />
      <div className={cn("pointer-events-none hidden sm:block lg:hidden", VERTICAL_TOP, className)} />
      <div className={cn("pointer-events-none hidden sm:block lg:hidden", HORIZONTAL, className)} />
    </>
  );
}
