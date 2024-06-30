import React, { useContext, useState } from "react";
import FormComponent from "../components/ui/FormComponent";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useToggle from "../hooks/useToggle";
import LoginForm from "../components/UserPage/LoginForm";
import { SignUpForm } from "../components/UserPage/SignUpForm";
import { UserContext } from "../context/userContext";

export function UserNotLogged(params) {
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

function UserPage() {
  const { user } = useContext(UserContext);

  return <UserNotLogged />;
}

export default UserPage;
