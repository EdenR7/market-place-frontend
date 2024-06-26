import React, { useState } from "react";
import FormComponent from "../components/ui/FormComponent";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useToggle from "../hooks/useToggle";
import LoginForm from "../components/UserPage/LoginForm";
import { SignUpForm } from "../components/UserPage/SignUpForm";

function UserPage() {
  const [login, setLogin] = useToggle(true);

  return (
    <div className=" mt-24 py-4 border border-primary-500 max-w-lg mx-auto flex justify-center min-h-400">
      {login ? (
        <LoginForm login={login} setLogin={setLogin} />
      ) : (
        <SignUpForm login={login} setLogin={setLogin} />
      )}
    </div>
  );
}

export default UserPage;
