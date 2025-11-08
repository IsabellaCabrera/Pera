import type { InputHTMLAttributes } from "react";

export type InputProps  = InputHTMLAttributes<HTMLInputElement>  & {
  label?: string;
  type: string;
  name: string;
  placeholder: string;
};
