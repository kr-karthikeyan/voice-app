import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

const dialogVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      variant: {
        default: "",
        glass: "glass-card border-white/10",
      },
      size: {
        default: "max-w-lg",
        sm: "max-w-sm",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "",
        glass: "bg-black/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dialogHeaderVariants = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left",
  {
    variants: {
      variant: {
        default: "",
        glass: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  {
    variants: {
      variant: {
        default: "",
        glass: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dialogTitleVariants = cva(
  "text-lg font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "",
        glass: "text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dialogDescriptionVariants = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      glass: "text-white/70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, variant, size, open, onOpenChange, title, description, children, ...props }, ref) => {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(dialogOverlayVariants({ variant }))}
              onClick={() => onOpenChange?.(false)}
            />
            <motion.div
              ref={ref}
              className={cn(dialogVariants({ variant, size }), className)}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              {...props}
            >
              {(title || description) && (
                <div className={cn(dialogHeaderVariants({ variant }))}>
                  {title && (
                    <h2 className={cn(dialogTitleVariants({ variant }))}>
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className={cn(dialogDescriptionVariants({ variant }))}>
                      {description}
                    </p>
                  )}
                </div>
              )}
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

Dialog.displayName = "Dialog";

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dialogVariants> {}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
          variant === "glass" && "text-white hover:text-white/70",
          className
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        {...props}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </motion.button>
    );
  }
);

DialogClose.displayName = "DialogClose";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  >
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  >
    {children}
  </div>
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h2>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  dialogVariants,
}; 