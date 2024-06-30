import React, { useContext, useState } from "react";
import Button from "../ui/Button";
import FormComponent from "../ui/FormComponent";
import Input from "../ui/Input";
import axios from "axios";
import { formatJWTTokenToUser } from "../../utils/util";
import { SnackBarContext } from "../../context/snackBarContext";
import SnackBar from "../ui/SnackBar";
import { UserContext } from "../../context/userContext";
const LOGIN_URL = "http://localhost:3000/api/auth/login";

export default function LoginForm(props) {
  const { login, setLogin } = props;
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const { loginUserContext } = useContext(UserContext);
  async function signIn(userData) {
    try {
      const res = await axios.post(LOGIN_URL, userData);
      const { token } = res.data;
      localStorage.setItem("userToken", token);
      loginUserContext(token);
      displaySnackBar({
        label: `Logged in successfully`,
      });
    } catch (err) {
      displaySnackBar({
        label: ` ${
          err.response.status === 401
            ? "Sorry, check your fields again"
            : "Error in create operation"
        }`,
        closeManually: true,
        type: "danger",
      });
      console.log(err);
    }
  }

  return (
    <>
      <div className=" gap-y-6 flex flex-col justify-center">
        <h2 className="text-center text-2xl font-bold">LOGIN FORM</h2>
        <div className="flex gap-1">
          <Button className={` w-1/2`} inverse={login ? true : false}>
            Log In
          </Button>
          <Button
            onClick={() => {
              setLogin(false);
            }}
            className={`w-1/2`}
            inverse={login ? false : true}
          >
            Sign Up
          </Button>
        </div>
        <FormComponent
          className={" items-center"}
          onSubmit={(event) => {
            event.preventDefault();
            signIn(loginUser);
          }}
        >
          <div>
            <Input
              value={loginUser.username}
              onChange={(eve) => {
                eve.preventDefault();
                setLoginUser((prev) => {
                  return {
                    ...prev,
                    username: eve.target.value,
                  };
                });
              }}
              id={"login-username"}
              placeholder={"Username"}
              className={" min-w-72 bg-gray-100 py-2"}
            />
          </div>
          <div>
            <Input
              value={loginUser.password}
              onChange={(eve) => {
                eve.preventDefault();
                setLoginUser((prev) => {
                  return {
                    ...prev,
                    password: eve.target.value,
                  };
                });
              }}
              type="password"
              id={"login-password"}
              placeholder={"Password"}
              className={" min-w-72 bg-gray-100 py-2"}
            />
          </div>
          <Button className={"min-w-72"}>SUBMIT</Button>
        </FormComponent>
      </div>
      {snackBar.display && <SnackBar />}
    </>
  );
}
