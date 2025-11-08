import type React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  img?: string;
  onChange: (checked: boolean) => void;
};
