import React from "react";
import Button from "./Button";
import { cn } from "../../utils/util";

function Modal({ children, className, btn }) {
  return (
    <>
      <div className=" fixed bg-primary-700 top-0 left-0 bottom-0 right-0 opacity-50"></div>
      <div
        className={cn(
          "fixed top-1/4 left-1/2 bg-primary-110 min-w-80 z-50 translate-x-[-50%] font-montserrat min-h-400 h-fit rounded-md",
          className
        )}
      >
        {children}
        <Button
          onClick={btn.onClick}
          className={`absolute top-2 right-2 ${btn.btnClassName}`}
        >
          {btn.context ? btn.context : "Close"}
        </Button>
      </div>
    </>
  );
}

export default Modal;
