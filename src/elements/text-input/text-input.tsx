import React from "react";
import { Icon } from "../icon/icon.tsx";
import styles from "./text-input.module.scss";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children"
> & {
  /** Shows/Hides the clear button */
  showClearButton?: boolean;
  /** Callback to clear the input value */
  onClearCallback?: () => void;
};

export const TextInput: React.FC<TextInputProps> = ({
  showClearButton = false,
  onClearCallback,
  ...inputAttributes
}) => {
  const hasClearButton = showClearButton && !!onClearCallback;
  const classes = [
    styles["text-input-wrapper"],
    hasClearButton && styles["has-clear-button"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <input {...inputAttributes} type="text" />
      {hasClearButton && (
        <button
          type="button"
          aria-label="Clear text"
          onClick={onClearCallback}
        >
          <Icon name="clear" size="large" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
