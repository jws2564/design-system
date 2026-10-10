import React, { type ReactNode, useEffect, useRef, useState } from "react";
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
  const portalAnchorRef = useRef<HTMLSpanElement>(null);
  const [mountingElement, setMountingElement] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const rootElement =
      portalAnchorRef.current?.closest<HTMLElement>("[data-theme]") ??
      document.body;
    setMountingElement(typeof document !== "undefined" ? rootElement : null);
  }, []);

  if (!mountingElement || !isOpen)
    return <span ref={portalAnchorRef} hidden />;

  const titleId = title ? `${id}-${title}` : undefined;

  const dialog = (
    <dialog
      id={id}
      className={styles["modal-dialog"]}
      open={isOpen}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <header>
        {title && <h2 id={titleId}>{title}</h2>}
        {showCloseButton && (
          <button
            className={styles["close-button"]}
            aria-label="Close"
            onClick={closeCallback}
            type="button"
          >
            <Icon size="large" name="clear" aria-hidden="true" />
          </button>
        )}
      </header>
      <div className={styles.body}>{children}</div>
      {(footerPrimaryButton || footerSecondaryButton) && (
        <footer>
          {footerSecondaryButton}
          {footerPrimaryButton}
        </footer>
      )}
    </dialog>
  );

  return (
    <>
      <span ref={portalAnchorRef} hidden />
      {ReactDOM.createPortal(dialog, mountingElement)}
    </>
  );
};
