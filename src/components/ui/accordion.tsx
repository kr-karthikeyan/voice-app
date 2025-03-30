import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const accordionVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        glass: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionItemVariants = cva(
  "border-b",
  {
    variants: {
      variant: {
        default: "border-input",
        ghost: "border-transparent",
        glass: "border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
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

const accordionContentVariants = cva(
  "overflow-hidden text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground",
        ghost: "text-foreground",
        glass: "text-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: Array<{
    value: string;
    title: string;
    content: React.ReactNode;
  }>;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  type?: "single" | "multiple";
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, items, value, onValueChange, defaultValue, type = "single", ...props }, ref) => {
    const [activeItems, setActiveItems] = React.useState<string[]>(
      type === "single"
        ? [value || defaultValue || ""]
        : (value || defaultValue || "").split(",")
    );

    const handleValueChange = (newValue: string) => {
      if (type === "single") {
        setActiveItems([newValue]);
        onValueChange?.(newValue);
      } else {
        setActiveItems((prev) => {
          const newItems = prev.includes(newValue)
            ? prev.filter((item) => item !== newValue)
            : [...prev, newValue];
          onValueChange?.(newItems.join(","));
          return newItems;
        });
      }
    };

    return (
      <div ref={ref} className={cn(accordionVariants({ variant }), className)} {...props}>
        {items.map((item, index) => (
          <div
            key={item.value}
            className={cn(accordionItemVariants({ variant }))}
          >
            <motion.button
              type="button"
              className={cn(accordionTriggerVariants({ variant }))}
              onClick={() => handleValueChange(item.value)}
              data-state={activeItems.includes(item.value) ? "open" : "closed"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.title}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </motion.button>

            <AnimatePresence>
              {activeItems.includes(item.value) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(accordionContentVariants({ variant }))}
                >
                  <div className="pb-4">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export { Accordion, accordionVariants }; 