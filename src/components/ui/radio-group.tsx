import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const radioGroupVariants = cva(
  "grid gap-2",
  {
    variants: {
      orientation: {
        horizontal: "grid-flow-col",
        vertical: "grid-flow-row",
      },
      size: {
        default: "gap-2",
        sm: "gap-1",
        lg: "gap-3",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      size: "default",
    },
  }
);

const radioGroupItemVariants = cva(
  "peer h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

const radioGroupIndicatorVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      size: {
        default: "h-2.5 w-2.5",
        sm: "h-2 w-2",
        lg: "h-3 w-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  // defaultValue?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation, size, value, onValueChange, defaultValue, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(radioGroupVariants({ orientation, size }), className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: value === child.props.value,
              onCheckedChange: () => onValueChange?.(child.props.value),
              ...child.props,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof radioGroupItemVariants> {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, variant, size, checked, onCheckedChange, label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <motion.button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={checked}
          data-state={checked ? "checked" : "unchecked"}
          className={cn(radioGroupItemVariants({ variant, size }), className)}
          onClick={() => onCheckedChange?.(true)}
          {...props}
        >
          <motion.div
            className={cn(radioGroupIndicatorVariants({ size }))}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-full w-full rounded-full bg-white" />
          </motion.div>
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

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem }; 