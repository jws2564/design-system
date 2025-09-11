import React from "react";
import styles from "./button.module.scss";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "medium",
  className,
  ...rest
}: ButtonProps) => {
  const classes = [className, styles[variant], styles[size]]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {text}
    </button>
  );
};
