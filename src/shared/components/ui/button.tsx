import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClassName =
  "inline-flex items-center justify-center border-2 font-bold uppercase tracking-[0.06em] transition-colors disabled:pointer-events-none disabled:opacity-35";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "border-primary bg-primary text-background hover:border-accent hover:bg-accent",
  secondary: "border-primary bg-transparent text-primary hover:bg-primary hover:text-background",
  ghost: "border-transparent bg-transparent text-primary hover:text-accent",
};

const sizeClassNames: Record<ButtonSize, string> = {
  small: "px-4 py-1.5 text-xs",
  medium: "px-6 py-2.5 text-sm",
  large: "px-8 py-3.5 text-base",
};

export function Button({
  className,
  size = "medium",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClassName, variantClassNames[variant], sizeClassNames[size], className)}
      type={type}
      {...props}
    />
  );
}
