import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ open, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70  flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-mainWhite rounded-4xl shadow-xl p-14 min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Button secondary onClick={onClose}>
          Close
        </Button>

        <div className="mt-8">{children}</div>
      </div>
    </div>,
    document.body
  );
};
