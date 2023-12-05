import React from "react";

import styles from "./styles.module.css";

interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    return <label {...props} ref={ref} className={styles.label}></label>;
  }
);

Label.displayName = "Label";
