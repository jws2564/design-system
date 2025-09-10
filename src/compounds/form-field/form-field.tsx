import React from "react";
import styles from "./form-field.module.scss";
import { ListCard } from "../list-card/list-card.tsx";
import type { TextInput } from "../../elements/text-input/text-input.tsx";

type TextInput = React.ReactElement<
  React.ComponentProps<typeof TextInput>,
  typeof TextInput
>;

type Menu = React.ReactElement<
  React.ComponentProps<typeof ListCard>,
  typeof ListCard
>;

type Field = TextInput | Menu;

export interface FormFieldProps {
  labelFor?: string;
  labelText: string;
  className?: string;
  field: Field;
}

export const FormField: React.FC<FormFieldProps> = ({
  labelFor,
  labelText,
  field,
  className,
}) => {
  const classes = [styles["form-field"], className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <label htmlFor={labelFor}>{labelText}</label>
      {field}
    </div>
  );
};
