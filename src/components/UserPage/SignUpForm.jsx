import React, { useState } from "react";
import Button from "../ui/Button";
import FormComponent from "../ui/FormComponent";
import Input from "../ui/Input";

export function SignUpForm(props) {
  const { login, setLogin } = props;
  const [signUpUser, setSignUpUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  return (
    <div className=" gap-y-4 flex flex-col justify-center">
      <h2 className="text-center text-2xl font-bold">SIGN UP FORM</h2>
      <div className="flex gap-1">
        <Button
          onClick={() => {
            setLogin(true);
          }}
          className={` w-1/2`}
          inverse={login ? true : false}
        >
          Log In
        </Button>
        <Button className={`w-1/2`} inverse={login ? false : true}>
          Sign Up
        </Button>
      </div>
      <FormComponent
        onSubmit={(event) => {
          event.preventDefault();
          console.log(signUpUser);
        }}
        className={" items-center mt-2"}
      >
        <div>
          <Input
            value={signUpUser.firstName}
            onChange={(eve) => {
              eve.preventDefault();
              setSignUpUser((prev) => {
                return {
                  ...prev,
                  firstName: eve.target.value,
                };
              });
            }}
            id={"sign-up-first-name"}
            placeholder={"First Name"}
            className={" min-w-72 bg-gray-100 py-1"}
          />
        </div>
        <div>
          <Input
            value={signUpUser.lastName}
            onChange={(eve) => {
              eve.preventDefault();
              setSignUpUser((prev) => {
                return {
                  ...prev,
                  lastName: eve.target.value,
                };
              });
            }}
            id={"sign-up-last-name"}
            placeholder={"Last Name"}
            className={" min-w-72 bg-gray-100 py-1"}
          />
        </div>
        <div>
          <Input
            value={signUpUser.emailAddress}
            onChange={(eve) => {
              eve.preventDefault();
              setSignUpUser((prev) => {
                return {
                  ...prev,
                  emailAddress: eve.target.value,
                };
              });
            }}
            id={"sign-up-email"}
            placeholder={"Email Address"}
            className={" min-w-72 bg-gray-100 py-1"}
          />
        </div>
        <div>
          <Input
            value={signUpUser.password}
            onChange={(eve) => {
              eve.preventDefault();
              setSignUpUser((prev) => {
                return {
                  ...prev,
                  password: eve.target.value,
                };
              });
            }}
            type="password"
            id={"sign-up-password"}
            placeholder={"Password"}
            className={" min-w-72 bg-gray-100 py-1"}
          />
        </div>
        <Button className={"min-w-72 "}>SUBMIT</Button>
      </FormComponent>
    </div>
  );
}
