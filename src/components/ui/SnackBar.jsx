import React, { useEffect, useState } from "react";

function SnackBar({
  label,
  context,
  className,
  success,
  danger,
  alert,
  onClick,
  children,
}) {
  const [displaySnack, setDisplaySnack] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplaySnack(false);
    }, 2000);
  }, []);
  return (
    <div
      className={`${
        displaySnack ? "" : "hidden"
      } fixed bottom-2 right-2 z-50 w-1/2 max-w-72 bg-green-300 px-4 py-2 rounded-md`}
    >
      <h3 className=" mb-1 font-semibold">{label} label</h3>
      <p className=" text-sm">{context} context</p>
    </div>
  );
}

export default SnackBar;
