import { UploadFileIcon } from "../icons/UploadFile";
import { Button } from "./Button";
import { useUploadFile } from "../hooks/useUploadFile";
import type { ImageUploaderProps } from "../types/uploadFile";

export const UploadFile = ({white, onChange }:ImageUploaderProps) => {

    const {fileInputRef, preview, handleFileInputChange} = useUploadFile({onChange})

  return (
    <div
      className="cursor-pointer w-10/12 h-1/2 flex flex-col items-center justify-center border border-dashed border-white bg-white/20 gap-4 rounded-2xl p-5"
      onClick={() => fileInputRef.current?.click()}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="object-contain w-full h-full rounded-2xl"
        />
      ) : (
        <div className={`flex flex-col items-center gap-3 ${white ? "text-mainWhite" : "text-Darkgray300"}`}>
          <UploadFileIcon whiteIcon={white}/>
          <p className="font-bold">Upload Photo</p>
          <p className="text-sm"> Drag and drop or click to upload </p>
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
      )}
    </div>
  );
};
