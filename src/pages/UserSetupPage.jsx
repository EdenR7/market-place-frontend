import React, { useContext, useState } from "react";
import useToggle from "../hooks/useToggle";
import LoginForm from "../components/UserPage/LoginForm";
import { SignUpForm } from "../components/UserPage/SignUpForm";

function UserSetupPage(props) {
  const [login, setLogin] = useToggle(true);

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className=" mt-24 py-12 border border-primary-500  min-w-400 flex justify-center min-h-400 rounded-md">
        {login ? (
          <LoginForm login={login} setLogin={setLogin} />
        ) : (
          <SignUpForm login={login} setLogin={setLogin} />
        )}
      </div>
    </div>
  );
}

export default UserSetupPage;
