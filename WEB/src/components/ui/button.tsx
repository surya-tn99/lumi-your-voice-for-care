import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Elder-friendly variants
        voice: "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated active:scale-95",
        emergency: "bg-emergency text-emergency-foreground shadow-elevated hover:brightness-110 active:scale-95",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
        soft: "bg-primary-soft text-primary hover:bg-primary/10",
        "soft-secondary": "bg-secondary-soft text-secondary hover:bg-secondary/10",
      },
      size: {
        default: "h-14 px-6 py-3",
        sm: "h-11 rounded-lg px-4 text-sm",
        lg: "h-16 rounded-2xl px-8 text-lg",
        xl: "h-20 rounded-2xl px-10 text-xl",
        icon: "h-14 w-14",
        "icon-lg": "h-20 w-20",
        "icon-xl": "h-28 w-28 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
