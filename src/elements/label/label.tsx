import React from "react";
import styles from "./label.module.scss";

export type LabelProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Text to display inside the label */
  text: string;
};

export const Label: React.FC<LabelProps> = ({ text, ...rest }) => {
  return (
    text && (
      <span className={styles.label} {...rest}>
        {text}
      </span>
    )
  );
};
