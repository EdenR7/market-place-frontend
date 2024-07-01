import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Button from "../ui/Button";

function UserNavBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogOut() {
    logoutUser();
    navigate("/user/setup");
  }

  return (
    <>
      {/* <nav className="top-20 left-0 sticky w-fit flex justify-between px-6 py-6 shadow-md bg-white break-600px: flex-col break-600px:h-fit"> */}
      <nav className=" top-[72px] sticky bg-primary-200 shadow-md px-6 break-400px:px-12 py-4">
        <ul className="flex justify-between gap-4 break-600px:gap-8 items-start">
          {/* <ul className="flex flex-col gap-4 break-600px:gap-8 items-start"> */}
          <li>
            <Link className=" font-semibold" to="/user/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className=" font-semibold" to="/user/profile/products">
              Products
            </Link>
          </li>
          <li>
            <Button
              strip
              onClick={handleLogOut}
              className="text-red-400 hover:text-red-700"
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default UserNavBar;
