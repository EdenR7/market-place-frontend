import React, { useContext, useState } from "react";
import FormComponent from "../components/ui/FormComponent";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useToggle from "../hooks/useToggle";
import LoginForm from "../components/UserPage/LoginForm";
import { SignUpForm } from "../components/UserPage/SignUpForm";
import { UserContext } from "../context/userContext";
import { SnackBarContext } from "../context/snackBarContext";
import SnackBar from "../components/ui/SnackBar";

export function UserNotLogged(props) {
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

export function UserProfile(props) {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <div className=" mt-32">
      <h2 className=" text-3xl text-center"> Hello {user?.username} !</h2>
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
}

function UserPage() {
  const { user, logoutUser } = useContext(UserContext);
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);

  return (
    <>
      {user ? <UserProfile /> : <UserNotLogged />}
      {snackBar.display && <SnackBar />}
    </>
  );
}

export default UserPage;
