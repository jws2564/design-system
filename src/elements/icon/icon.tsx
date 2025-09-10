import React from "react";
import styles from "./icon.module.scss";
import { Clear } from "./icons/clear.tsx";
import { DownArrow } from "./icons/down-arrow.tsx";
import { Check } from "./icons/check.tsx";

export type IconSize = "small" | "medium" | "large";
export type IconName = "clear" | "downArrow" | "check";

export type IconProps = {
  /** Name of the icon to display */
  name: IconName;
  /** Size of the icon */
  size?: IconSize;
  /** Title attribute for the icon */
  title?: string;
  /** CSS classes to be appended to the icon */
  className?: string;
  /** CSS style property to overrides, ie default colors*/
  style?: React.CSSProperties;
} & React.SVGProps<SVGSVGElement>;

//TODO figure out how to make changing the color on the svg path easier

//TODO possibly do some lazy loading here to help with bundle size
const icons: Record<IconName, React.FC> = {
  clear: Clear,
  downArrow: DownArrow,
  check: Check,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = "medium",
  title,
  className,
  style,
  ...svgProps
}: IconProps) => {
  const Icon = icons[name];

  if (!Icon) {
    return <></>;
  }

  const classes = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(" ");

  const labelProps =
    title && title.trim().length > 0
      ? { role: "img", "aria-label": title }
      : { "aria-hidden": true };

  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...labelProps}
      {...svgProps}
      style={style}
    >
      <Icon />
    </svg>
  );
};
