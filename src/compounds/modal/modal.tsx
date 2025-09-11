import React, { type ReactNode } from "react";
import { Icon } from "../../elements/icon/icon.tsx";
import ReactDOM from "react-dom";
import { Button } from "../../elements/button/button.tsx";
import styles from "./modal.module.scss";

type ButtonType = React.ReactElement<
  React.ComponentProps<typeof Button>,
  typeof Button
>;

export interface ModalProps {
  showCloseButton?: boolean;
  id: string;
  title?: string;
  children: ReactNode;
  footerPrimaryButton?: ButtonType;
  footerSecondaryButton?: ButtonType;
  isOpen: boolean;
  closeCallback?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  showCloseButton,
  id,
  title,
  footerPrimaryButton,
  footerSecondaryButton,
  children,
  isOpen,
  closeCallback,
}) => {
  const rootElement = document.getElementById("theme-root") ?? document.body;
  const mountingElement = typeof document !== "undefined" ? rootElement : null;

  if (!mountingElement || !isOpen) {
    return <></>;
  }

  const titleId = title ? `${id}-${title}` : undefined;

  const dialog = (
    <dialog
      id={id}
      className={styles["modal-dialog"]}
      open={isOpen}
      aria-labelledby={title ? titleId : undefined}
    >
      <header>
        {title && <h2 id={titleId}>{title}</h2>}
        {showCloseButton && (
          <Icon
            size={"large"}
            className={styles["close-button"]}
            aria-label="Close"
            onClick={closeCallback}
            type="button"
            name="clear"
          />
        )}
      </header>
      <main>{children}</main>
      {(footerPrimaryButton || footerSecondaryButton) && (
        <footer>
          {footerSecondaryButton}
          {footerPrimaryButton}
        </footer>
      )}
    </dialog>
  );

  return ReactDOM.createPortal(dialog, mountingElement);
};
