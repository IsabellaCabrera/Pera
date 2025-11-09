interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="group peer bg-gray rounded-full duration-300 w-16 h-8 after:duration-300 after:bg-white peer-checked:bg-amarillo after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"></div>
    </label>
  );
};