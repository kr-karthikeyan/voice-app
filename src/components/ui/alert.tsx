import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import * as React from "react";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "bg-green-500/10 border-green-500/20 text-green-500",
        warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
        error: "bg-red-500/10 border-red-500/20 text-red-500",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        glass: "glass-card border-white/10 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertTitleVariants = cva("mb-1 font-medium leading-none tracking-tight");

const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed");

const icons = {
  default: AlertCircle,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
  glass: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, description, icon, children, ...props }, ref) => {
    const Icon = icons[variant || "default"];

    return (
      <motion.div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {icon || <Icon className="h-4 w-4" />}
        {title && <div className={cn(alertTitleVariants())}>{title}</div>}
        {description && (
          <div className={cn(alertDescriptionVariants())}>{description}</div>
        )}
        {children}
      </motion.div>
    );
  }
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  >
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants }; 