import { createContext, useState } from "react";

export const SnackBarContext = createContext({
  snackBar: {
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    danger: false,
  },
  setSnackBar: () => {},
  displaySnackBar: () => {},
  closeSnackBar: () => {},
});

export function SnackBarCtxProvider({ children }) {
  const [snackBar, setSnackBar] = useState({
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    danger: false,
  });

  function displaySnackBar(props) {
    const { label, context, closeManually, className, danger } = props;
    setSnackBar((prev) => ({
      ...prev,
      display: true,
      label: label || prev.label,
      context: context || prev.context,
      closeManually: closeManually || prev.closeManually,
      className: className || prev.className,
      danger: danger || prev.danger,
    }));
  }

  function closeSnackBar() {
    setSnackBar((prev) => {
      return { ...prev, display: false, danger: false, closeManually: false };
    });
  }

  return (
    <SnackBarContext.Provider
      value={{ snackBar, setSnackBar, displaySnackBar, closeSnackBar }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}
