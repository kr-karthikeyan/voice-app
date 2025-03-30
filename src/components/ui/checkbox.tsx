import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import * as React from "react";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default: "",
        success: "data-[state=checked]:bg-green-500",
        warning: "data-[state=checked]:bg-yellow-500",
        error: "data-[state=checked]:bg-red-500",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const checkboxIconVariants = cva(
  "h-4 w-4 text-white",
  {
    variants: {
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface CheckboxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, variant, size, checked, onCheckedChange, label, indeterminate, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <motion.button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(checkboxVariants({ variant, size }), className)}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <motion.div
          className={cn(checkboxIconVariants({ size }))}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {checked && <Check className="h-full w-full" />}
        </motion.div>
      </motion.button>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants }; 