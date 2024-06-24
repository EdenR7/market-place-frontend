import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavbBar() {
  const location = useLocation();
  console.log(location);
  const currentPath = location.pathname;

  return (
    <div>
      <nav className="flex justify-between px-12 py-6 shadow-md ">
        <h3 className=" text-primary-500 font-bold">MARKET PLACE</h3>
        <ul className="flex gap-8">
          <li className=" transition hover:text-primary-500 hover:font-semibold">
            <Link to={"/"}>
              <span
                className={
                  currentPath === "/"
                    ? "font-semibold underline decoration-primary-500"
                    : ""
                }
              >
                Home
              </span>{" "}
              <span></span>
            </Link>
          </li>
          <li className=" transition hover:text-primary-500 hover:font-semibold">
            <Link to={"/product"}>
              <span
                className={
                  currentPath.startsWith("/product")
                    ? "font-semibold underline decoration-primary-500"
                    : ""
                }
              >
                Products
              </span>{" "}
              <span></span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbBar;
