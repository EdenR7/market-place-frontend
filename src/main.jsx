import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackBarCtxProvider } from "./context/snackBarContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <SnackBarCtxProvider>
          <App />
        </SnackBarCtxProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
