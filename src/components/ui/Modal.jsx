import React from "react";
import Button from "./Button";
import { cn } from "../../utils/util";

function Modal({ children, className, btn }) {
  return (
    <>
      <div className=" fixed bg-primary-700 top-0 left-0 bottom-0 right-0 opacity-50"></div>
      <div
        className={cn(
          "fixed top-1/4 left-1/2 bg-primary-110 min-w-80 z-50 translate-x-[-50%] font-montserrat h-400",
          className
        )}
      >
        <Button
          onClick={btn.onClick}
          className={` ${btn.btnClassName} absolute top-4 right-4`}
        >
          {btn.context ? btn.context : "Close"}
        </Button>
        {children}
      </div>
    </>
  );
}

export default Modal;
