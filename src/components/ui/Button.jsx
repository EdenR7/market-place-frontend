import React from "react";
import { cn } from "../../utils/util";

function Button({
  children,
  className,
  inverse,
  disabled,
  strip,
  onClick,
  danger,
}) {
  return (
    <button
      onClick={onClick && !disabled ? onClick : undefined}
      className={cn(
        " transition border border-primary-700 py-1 px-4 text-primary-700 font-semibold hover:bg-primary-500 hover:text-primary-110 rounded-md",

        inverse &&
          "border-1 border-primary-200 border-solid text-primary-110 bg-primary-500 py-2 px-4 hover:bg-primary-110 hover:text-primary-700",
        strip && "border-0 hover:bg-inherit hover:text-inherit px-0 py-0",
        danger &&
          " bg-red-400 text-primary-110 hover:bg-red-600 border-primary-110 hover:animate-pulse",
        disabled &&
          "cursor-auto hover:bg-inherit hover:text-primary-200 text-primary-200 border-primary-200 ",
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
