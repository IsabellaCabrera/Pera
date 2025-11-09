import { AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import type { AddProps } from "../types/add";

export const Add = ({ number }: AddProps) => {
  return (
    <div className="flex items-center justify-between w-20 h-8 border border-gray-300 rounded-full py-1.5 px-2.5">
      <button className="hover:scale-110 transition">
        <RiSubtractFill size={16} />
      </button>
      <span className="text-sm font-medium">{number}</span>
      <button className="hover:scale-110 transition">
        <AiOutlinePlus size={16} />
      </button>
    </div>
  );
};
