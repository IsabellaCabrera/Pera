import { useRef, useState } from "react";
import type { ImageUploaderProps } from "../types/uploadFile";



export const useUploadFile = ({ onChange }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };
  return {
    fileInputRef,
    preview,
    handleFileInputChange,
  };
};
