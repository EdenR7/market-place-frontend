import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

function NavbBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className=" top-0 left-0 fixed z-50 w-full flex justify-between px-6 py-6 shadow-md bg-white break-400px:px-12">
      <h3 className=" text-primary-500 font-bold">MARKET PLACE</h3>
      <ul className="flex gap-4 break-600px:gap-8 items-center">
        <li className=" transition hover:text-primary-500 hover:font-semibold">
          <Link className="flex items-center gap-1" to={"/"}>
            <span>
              <IoHomeOutline
                className={
                  currentPath === "/" ? "text-primary-500 text-lg" : ""
                }
              />
            </span>
            <span
              className={`${
                currentPath === "/"
                  ? "font-semibold underline decoration-primary-500"
                  : ""
              } hidden break-600px:inline-block `}
            >
              Home
            </span>{" "}
          </Link>
        </li>
        <li className=" transition hover:text-primary-500 hover:font-semibold">
          <Link className={` flex items-center gap-1`} to={"/product"}>
            <span>
              <CiShop
                className={
                  currentPath.startsWith("/product")
                    ? "text-primary-500 text-lg"
                    : ""
                }
              />
            </span>
            <span
              className={`${
                currentPath.startsWith("/product")
                  ? "font-semibold underline decoration-primary-500"
                  : ""
              } hidden break-600px:inline-block`}
            >
              Products
            </span>{" "}
          </Link>
        </li>
        <li className=" transition hover:text-primary-500 hover:font-semibold">
          <Link className={` flex items-center gap-1`} to={"/user"}>
            <span>
              {" "}
              <FaUser
                className={`${
                  currentPath.startsWith("/user")
                    ? "text-primary-500"
                    : " text-sm"
                } `}
              />
            </span>
            <span
              className={`${
                currentPath.startsWith("/user")
                  ? "font-semibold underline decoration-primary-500"
                  : ""
              } hidden break-600px:inline-block`}
            >
              Products
            </span>{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbBar;
