import React, { createContext, useEffect, useRef, useState } from "react";
import { formatJWTTokenToUser } from "../utils/util";
import axios from "axios";
const USER_URL = "http://localhost:3000/api/user/";

export const UserContext = createContext({
  user: {
    userId: "",
    username: "",
    firstName: "",
    lastName: "",
    products: [],
  },
  setUser: () => {},
  loginUserContext: () => {},
  logoutUser: () => {},
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const userToken = useRef(localStorage.getItem("userToken"));

  async function getUserById(id) {
    try {
      const res = await axios.get(USER_URL + id);
      setUser(res.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  useEffect(() => {
    if (userToken.current !== null) {
      const { userId } = formatJWTTokenToUser(userToken.current);
      getUserById(userId);
    }
  }, []);

  function loginUserContext(token) {
    const { userId } = formatJWTTokenToUser(token);
    // console.log(userId);
    getUserById(userId);
    // local storage
  }
  function logoutUser() {
    setUser(null);
    localStorage.removeItem("userToken");
    // local storage
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, loginUserContext, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
