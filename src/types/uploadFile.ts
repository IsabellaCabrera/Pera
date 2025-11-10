export interface ImageUploaderProps {
  white?: boolean;
  onChange: (file: File | null) => void;
}