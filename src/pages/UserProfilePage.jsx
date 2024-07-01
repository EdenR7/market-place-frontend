import React, { useContext, useState } from "react";
import Button from "../components/ui/Button";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../context/snackBarContext";
import SnackBar from "../components/ui/SnackBar";

const USER_URL = "http://localhost:3000/api/user/";

function UserProfilePage(props) {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { snackBar } = useContext(SnackBarContext);

  function handleLogOut() {
    logoutUser();
    navigate("/user/setup");
  }

  return (
    <>
      <div className=" mt-32">
        <h2 className=" text-3xl text-center"> Hello {user?.username} !</h2>
      </div>

      {snackBar.display && <SnackBar />}
    </>
  );
}

export default UserProfilePage;
