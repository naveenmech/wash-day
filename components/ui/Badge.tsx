import type { ReactNode } from "react";
import clsx from "clsx";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs md:text-sm font-bold tracking-wide uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
