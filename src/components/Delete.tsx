import { IoMdClose } from "react-icons/io";
import type { DeleteProps } from "../types/delete";

export const Delete = ({ id, onDelete }: DeleteProps) => {
  return (
    <button
      onClick={() => onDelete(id)}
      className="cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-[#595C5921] text-black hover:bg-gray-300 transition"
    >
      <IoMdClose size={16} />
    </button>
  );
};