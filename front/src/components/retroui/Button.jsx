import { cva } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";

/** Versão mínima do Button do RetroUI (retroui.dev): só as variantes usadas neste projeto. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded border-2 border-border px-4 py-1.5 font-bold shadow-[3px_3px_0_0_var(--color-border)] transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--color-border)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const Button = React.forwardRef(
  ({ children, variant = "primary", className = "", asChild = false, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={forwardedRef} className={cn(buttonVariants({ variant }), className)} {...props}>
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
