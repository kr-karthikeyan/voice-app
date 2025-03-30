import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        ghost: "bg-transparent",
        glass: "glass-effect",
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

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        ghost: "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        glass: "data-[state=active]:bg-white/10 data-[state=active]:text-white",
      },
      size: {
        default: "px-3 py-1.5",
        sm: "px-2 py-1",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  items: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant, size, value, onValueChange, defaultValue, items, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(value || defaultValue || items[0]?.value);

    const handleValueChange = (newValue: string) => {
      setActiveTab(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div ref={ref} className="w-full" {...props}>
        <div className={cn(tabsListVariants({ variant, size }), className)}>
          {items.map((item, index) => (
            <motion.button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={activeTab === item.value}
              data-state={activeTab === item.value ? "active" : "inactive"}
              className={cn(tabsTriggerVariants({ variant, size }))}
              onClick={() => handleValueChange(item.value)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(tabsContentVariants({ variant }))}
        >
          {items.find((item) => item.value === activeTab)?.content}
        </motion.div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs, tabsListVariants }; 