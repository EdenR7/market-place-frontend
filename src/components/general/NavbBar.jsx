import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";

function NavbBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className=" top-0 left-0 fixed z-50 w-full flex justify-between px-12 py-6 shadow-md bg-white">
      <h3 className=" text-primary-500 font-bold">MARKET PLACE</h3>
      <ul className="flex gap-8">
        <li className=" transition hover:text-primary-500 hover:font-semibold">
          <Link className="flex items-center gap-1" to={"/"}>
            <span>
              <IoHomeOutline />
            </span>
            <span
              className={
                currentPath === "/"
                  ? "font-semibold underline decoration-primary-500"
                  : ""
              }
            >
              Home
            </span>{" "}
          </Link>
        </li>
        <li className=" transition hover:text-primary-500 hover:font-semibold">
          <Link className="flex items-center gap-1" to={"/product"}>
            <span>
              <CiShop />
            </span>
            <span
              className={
                currentPath.startsWith("/product")
                  ? "font-semibold underline decoration-primary-500"
                  : ""
              }
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
