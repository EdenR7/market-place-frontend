import React from "react";
import { cn } from "../../utils/util";

function Button({ children, className, inverse, onClick }) {
  return (
    <button
      className={cn(
        " transition border border-primary-700 py-1 px-4 text-primary-700 font-semibold hover:bg-primary-500 hover:text-primary-110 rounded-md",
        className,
        inverse &&
          "border-1 border-primary-200 border-solid text-primary-110 bg-primary-500 py-2 px-4 hover:bg-primary-110 hover:text-primary-700"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
