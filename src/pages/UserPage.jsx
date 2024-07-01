import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { SnackBarContext } from "../context/snackBarContext";
import SnackBar from "../components/ui/SnackBar";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const { user } = useContext(UserContext);
  const { snackBar } = useContext(SnackBarContext);
  const navigate = useNavigate();
  useEffect(() => {
    user ? navigate("profile") : navigate("setup");
  }, []);
  
  return (
    <>
    {snackBar.display && <SnackBar />}
    </>
  );
}

export default UserPage;
