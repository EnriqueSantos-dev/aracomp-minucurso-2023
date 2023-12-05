import React from "react";

import styles from "./styles.module.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", isLoading = false, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        data-variant={variant}
        aria-disabled={isLoading}
        className={styles.button}
      />
    );
  }
);

Button.displayName = "Button";
