import React from "react";
import Button from "./Button";

function Modal({ children, buttonContext }) {
  return (
    <>
      <div className=" fixed bg-primary-700 top-0 left-0 bottom-0 right-0 opacity-50"></div>
      <div className=" fixed top-1/3 left-1/2 bg-primary-110 min-w-80 w-1/2 translate-x-[-50%] p-10">
        <Button className=" absolute top-4 right-4">
          {buttonContext ? buttonContext : "Close"}
        </Button>
        {children}
      </div>
    </>
  );
}

export default Modal;
