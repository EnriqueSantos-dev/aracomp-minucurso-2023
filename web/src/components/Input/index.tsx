import React from "react";

import styles from "./styles.module.css";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input {...props} ref={ref} className={styles.input} />;
  }
);

Input.displayName = "Input";
