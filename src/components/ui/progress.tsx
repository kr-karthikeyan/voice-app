import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-gray-800/50",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1",
        lg: "h-3",
      },
      variant: {
        default: "",
        glass: "bg-white/10 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        glass: "bg-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
}

function Progress({
  className,
  value,
  max = 100,
  size,
  variant,
  ...props
}: ProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn(progressVariants({ size, variant }), className)}
      {...props}
    >
      <motion.div
        className={cn(progressIndicatorVariants({ variant }))}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </div>
  );
}

export { Progress, progressVariants }; 