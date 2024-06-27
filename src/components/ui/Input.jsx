import React from "react";
import { cn } from "../../utils/util";

function Input({
  value,
  type,
  children,
  id,
  placeholder,
  req,
  className,
  formInput,
  onChange,
}) {
  return (
    <input
      required
      id={id ? id : undefined}
      placeholder={placeholder ? placeholder : undefined}
      type={type ? type : "text"}
      className={cn(
        "border px-2 py-1 rounded-sm shadow-sm bg-inherit",
        formInput &&
          "border-1 border-primary-200 border-solid text-primary-110 bg-primary-500 py-2 px-4 hover:bg-primary-110 hover:text-primary-700",
        className
      )}
      onChange={onChange ? onChange : undefined}
      value={value}
    />
  );
}

export default Input;
