import React, { type JSX } from "react";
import "./base.scss";

type Theme = "light" | "dark";

type Props = {
  theme?: Theme; // default "light" – switches CSS vars via [data-theme]
  as?: keyof JSX.IntrinsicElements; // optional: render as <main>, <section>, etc.
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function ThemeProvider({
  theme = "light",
  as: Tag = "div",
  className,
  style,
  children,
}: Props) {
  return (
    <Tag data-theme={theme} className={className} style={style}>
      {children}
    </Tag>
  );
}
