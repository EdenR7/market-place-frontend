import React from "react";
import { cn } from "../../utils/util";

function FormComponent({ children, className, userForm, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit ? onSubmit : undefined}
      className={cn(
        " flex flex-col max-w-400 gap-4",
        userForm &&
          "border-1 border-primary-200 border-solid text-primary-110 bg-primary-500 py-2 px-4 hover:bg-primary-110 hover:text-primary-700",
        className
      )}
    >
      {children}
    </form>
  );
}

export default FormComponent;
