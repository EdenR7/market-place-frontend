import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import { SnackBarContext } from "../../context/snackBarContext";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";

function SnackBar({
  label,
  context,
  closeManually,
  className,
  danger,
  alert,
  onClick,
  children,
}) {
  const { snackBar, setSnackBar, displaySnackBar, closeSnackBar } =
    useContext(SnackBarContext);
  // console.log(snackBar.danger);
  useEffect(() => {
    setTimeout(() => {
      if (!snackBar.closeManually) {
        closeSnackBar();
      }
    }, 2000);
  }, []);

  return (
    <div
      className={`${
        snackBar.display ? "" : "hidden"
      } fixed bottom-2 right-2 z-50 w-1/2 max-w-72 bg-green-300 px-4 py-3 rounded-md ${
        snackBar.danger && "bg-red-300"
      }`}
    >
      <div className=" flex items-center gap-2 mt-2 mb-1">
        {snackBar.danger ? (
          <MdErrorOutline className=" text-xl w-10 text-red-600" />
        ) : (
          <CiCircleCheck className=" text-xl w-12 text-green-600" />
        )}

        <h3 className=" text-sm font-semibold">{snackBar.label}</h3>
      </div>

      {snackBar.closeManually ? (
        <Button
          className={" absolute top-2 right-2"}
          strip
          onClick={() => {
            closeSnackBar();
          }}
        >
          <IoMdClose />
        </Button>
      ) : null}
    </div>
  );
}

export default SnackBar;
