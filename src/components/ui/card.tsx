import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-input",
        ghost: "border-transparent",
        glass: "glass-card border-transparent",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      hover: {
        default: "",
        lift: "hover:shadow-lg transition-shadow duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "default",
    },
  }
);

const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6", {
  variants: {
    variant: {
      default: "",
      ghost: "pt-0",
      glass: "pt-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const cardTitleVariants = cva(
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "text-foreground",
        ghost: "text-foreground",
        glass: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const cardDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      ghost: "",
      glass: "text-white/70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const cardContentVariants = cva("p-6 pt-0", {
  variants: {
    variant: {
      default: "",
      ghost: "pt-0",
      glass: "pt-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const cardFooterVariants = cva(
  "flex items-center p-6 pt-0",
  {
    variants: {
      variant: {
        default: "",
        ghost: "pt-0",
        glass: "pt-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, size, hover }), className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardHeaderVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ variant }), className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof cardTitleVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ variant }), className)}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof cardDescriptionVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants({ variant }), className)}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardContentVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(cardContentVariants({ variant }), className)}
      {...props}
    />
  );
});

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ variant }), className)}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
