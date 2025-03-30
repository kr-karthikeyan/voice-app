import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Check } from "lucide-react";
import * as React from "react";

const dropdownMenuVariants = cva(
  "absolute right-0 mt-2 w-48 rounded-lg shadow-lg border",
  {
    variants: {
      variant: {
        default: "bg-gray-800 border-gray-700",
        glass: "bg-gray-800/50 backdrop-blur-sm border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dropdownMenuItemVariants = cva(
  "w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors",
  {
    variants: {
      variant: {
        default: "text-gray-300 hover:bg-gray-700/50",
        glass: "text-white hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface DropdownMenuProps extends VariantProps<typeof dropdownMenuVariants> {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  variant,
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(dropdownMenuVariants({ variant }), className)}
          >
            {items.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(dropdownMenuItemVariants({ variant }))}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { type DropdownMenuItem }; 