import type { CheckboxProps } from "../../types/button";

export const Checkbox = ({
  id,
  label,
  checked,
  img,
  onChange,
}: CheckboxProps) => {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!checked)}
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full transition 
        ${checked ? "bg-amarillo text-Darkgray500 scale-120 " : "bg-LightGray100 text-Darkgray500"}`}
    >
      {img && <img src={img} alt={label} className="w-5 h-5" />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};