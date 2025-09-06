import styles from "./button.module.scss";

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({ text }: Props) => {
  return <button>{text}</button>;
};
