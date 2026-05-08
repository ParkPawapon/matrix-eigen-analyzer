import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";

type DisplayHeadingProps = ComponentPropsWithoutRef<"h1"> & {
  as?: "h1" | "h2" | "h3";
};

export function DisplayHeading({ as: Component = "h1", className, ...props }: DisplayHeadingProps) {
  return (
    <Component
      className={cn("font-display text-5xl leading-none tracking-normal md:text-7xl", className)}
      {...props}
    />
  );
}
