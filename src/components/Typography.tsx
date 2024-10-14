import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold md:text-5xl",
      h2: "text-3xl font-bold text-xl md:text-3xl",
      h3: "text-2xl font-bold md:text-3xl",
      h4: "text-xl font-semibold md:text-2xl",
      h5: "text-lg font-semibold md:text-xl",
      h6: "text-base font-semibold md:text-lg",
      p: "text-base",
      small: "text-sm",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
    color: "primary",
    align: "left",
  },
});

type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, "color">, TypographyVariants {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function Typography({ as: Component = "p", children, className, variant, weight, color, align, ...props }: TypographyProps) {
  return (
    <Component className={typographyVariants({ variant, weight, color, align, className })} {...props}>
      {children}
    </Component>
  );
}
