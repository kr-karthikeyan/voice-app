import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const switchVariants = cva(
  "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default: "",
        success: "data-[state=checked]:bg-green-500",
        warning: "data-[state=checked]:bg-yellow-500",
        error: "data-[state=checked]:bg-red-500",
      },
      size: {
        default: "h-5 w-9",
        sm: "h-4 w-7",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "h-4 w-4 data-[state=checked]:translate-x-4",
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        lg: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant, size, checked, onCheckedChange, label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <motion.button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          data-state={checked ? "checked" : "unchecked"}
          className={cn(switchVariants({ variant, size }), className)}
          onClick={() => onCheckedChange?.(!checked)}
          {...props}
        >
          <motion.span
            className={cn(switchThumbVariants({ size }))}
            data-state={checked ? "checked" : "unchecked"}
            animate={{
              x: checked ? (size === "sm" ? 12 : size === "lg" ? 20 : 16) : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants }; 