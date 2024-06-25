import React, { useEffect, useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";

function SnackBar({
  label,
  context,
  closeManually,
  className,
  success,
  danger,
  alert,
  onClick,
  children,
}) {
  const labelColor = ""
  const contextColor = ""
  const [displaySnack, setDisplaySnack] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (!closeManually) {
        setDisplaySnack(false);
      }
    }, 2000);
  }, []);
  return (
    <div
      className={`${
        displaySnack ? "" : "hidden"
      } fixed bottom-2 right-2 z-50 w-1/2 max-w-72 bg-green-300 px-4 py-3 rounded-md ${
        danger && "bg-red-300"
      }`}
    >
      <h3 className=" mb-1 font-semibold mt-1">{label}</h3>
      <p className=" text-sm">{context}</p>
      {closeManually? (<Button className={" absolute top-1 right-2"} strip onClick={()=>{setDisplaySnack(false)}}><IoMdClose /></Button>):null}
    </div>
  );
}

export default SnackBar;
