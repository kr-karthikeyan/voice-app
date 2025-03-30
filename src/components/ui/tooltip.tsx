import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        glass: "glass-card text-white",
      },
      size: {
        default: "px-3 py-1.5 text-xs",
        sm: "px-2 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tooltipArrowVariants = cva(
  "absolute",
  {
    variants: {
      position: {
        top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
        bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
        left: "right-0 top-1/2 -translate-y-1/2 translate-x-full",
        right: "left-0 top-1/2 -translate-y-1/2 -translate-x-full",
      },
      variant: {
        default: "border-t-primary",
        success: "border-t-green-500",
        warning: "border-t-yellow-500",
        error: "border-t-red-500",
        info: "border-t-blue-500",
        glass: "border-t-white/10",
      },
    },
    defaultVariants: {
      position: "top",
      variant: "default",
    },
  }
);

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delay?: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      children,
      variant,
      size,
      side = "top",
      align = "center",
      sideOffset = 4,
      delay = 200,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(tooltipVariants({ variant, size }), className)}
              style={{
                top: side === "bottom" ? `${sideOffset}px` : undefined,
                bottom: side === "top" ? `${sideOffset}px` : undefined,
                left: side === "right" ? `${sideOffset}px` : undefined,
                right: side === "left" ? `${sideOffset}px` : undefined,
                transform: `translateX(${
                  align === "start"
                    ? "0%"
                    : align === "end"
                    ? "-100%"
                    : "-50%"
                })`,
              }}
            >
              {content}
              <div
                className={cn(
                  "w-0 h-0 border-4 border-transparent",
                  tooltipArrowVariants({ position: side, variant })
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants }; 