import React from "react";
import { Link } from "react-router-dom";

function NavbBar() {
  return (
    <div>
      <nav className="flex justify-between px-12 py-6 shadow-md ">
        <h3 className=" text-primary-500 font-bold">MARKET PLACE</h3>
        <ul className="flex gap-8">
          <li className=" transition hover:text-primary-500 hover:font-semibold">
            <Link to={"/"}>
              <span>Home</span> <span></span>
            </Link>
          </li>
          <li className=" transition hover:text-primary-500 hover:font-semibold">
            <Link to={"/product"}>
              <span>Products</span> <span></span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbBar;
