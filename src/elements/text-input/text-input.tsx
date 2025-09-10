import React, { useId } from "react";
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
  const reactId = useId();
  const inputId = inputAttributes.id ?? `input-${reactId}`;
  const hasClearButton = showClearButton && !!onClearCallback;
  const classes = [
    styles["text-input-wrapper"],
    hasClearButton && styles["has-clear-button"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <input {...inputAttributes} type="text" id={inputId} />
      {hasClearButton && (
        <button type="button" onClick={onClearCallback}>
          <Icon
            name="clear"
            aria-hidden
            style={{ pointerEvents: "none" }}
            size="large"
          />
        </button>
      )}
    </div>
  );
};
