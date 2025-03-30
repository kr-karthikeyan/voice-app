import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check } from "lucide-react";
import * as React from "react";

const selectVariants = cva(
  "relative inline-flex w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent",
        glass: "glass-effect border-transparent",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const selectContentVariants = cva(
  "absolute z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent",
        glass: "glass-card border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        glass: "text-white hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const selectItemIndicatorVariants = cva(
  "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        glass: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  items: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ variant, size, value, onValueChange, placeholder, items, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const selectedItem = items.find((item) => item.value === value);

    return (
      <div
        ref={ref}
        className="relative"
        onKeyDown={handleKeyDown}
        {...props}
      >
        <button
          type="button"
          className={cn(selectVariants({ variant, size }))}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {selectedItem?.label || placeholder || "Select an option"}
          </span>
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(selectContentVariants({ variant }))}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(selectItemVariants({ variant }))}
                  onClick={() => {
                    onValueChange?.(item.value);
                    setIsOpen(false);
                  }}
                  data-disabled={item.disabled}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.value === value && (
                    <span className={cn(selectItemIndicatorVariants({ variant }))}>
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants }; 