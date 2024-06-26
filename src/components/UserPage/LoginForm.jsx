import React, { useState } from "react";
import Button from "../ui/Button";
import FormComponent from "../ui/FormComponent";
import Input from "../ui/Input";

export default function LoginForm(props) {
  const { login, setLogin } = props;
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  return (
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
          console.log(loginUser);
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
  );
}
