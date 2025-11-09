import type { ButtonProps } from "../types/button";

export const Button = ({
  disabled,
  children,
  secondary,
  onClick,
  ...props
}: ButtonProps) => {
  const primaryStyle = "bg-morado text-white hover:opacity-90";
  const secondaryStyle =
    "border border-morado text-morado hover:bg-morado hover:text-white";
  const disabledStyle = "bg-neutral-500 text-white cursor-default opacity-60";

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={` cursor-pointer disabled:cursor-default
        text-nowrap px-5 py-3 md:min-w-44 rounded-md transition
        ${disabled ? disabledStyle : secondary ? secondaryStyle : primaryStyle}
      `}
    >
      {children}
    </button>
  );
};
