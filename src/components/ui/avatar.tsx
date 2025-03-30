import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
        "2xl": "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const avatarImageVariants = cva(
  "aspect-square h-full w-full",
  {
    variants: {
      status: {
        online: "border-2 border-green-500",
        offline: "border-2 border-gray-500",
        speaking: "border-2 border-blue-500 animate-pulse",
      },
    },
    defaultVariants: {
      status: "offline",
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
        "2xl": "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const statusIndicatorVariants = cva(
  "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
  {
    variants: {
      status: {
        online: "bg-green-500",
        offline: "bg-gray-500",
        speaking: "bg-blue-500 animate-pulse",
      },
    },
    defaultVariants: {
      status: "offline",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "speaking";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, status, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {src ? (
          <motion.img
            src={src}
            alt={alt}
            className={cn(avatarImageVariants({ status }))}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        ) : fallback ? (
          <motion.div
            className={cn(avatarFallbackVariants({ size }))}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {fallback}
          </motion.div>
        ) : null}
        <motion.div
          className={cn(statusIndicatorVariants({ status }))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      </motion.div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants }; 