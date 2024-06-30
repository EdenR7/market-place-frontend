import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

function Footer() {
  return (
    <footer className=" bg-yellow-50 mt-2 py-6 flex flex-col items-center gap-4">
      <div className=" flex gap-4 text-lg">
        <FaFacebook className="cursor-pointer" />
        <FaGithub className="cursor-pointer" />
        <FaLinkedin className="cursor-pointer" />
        <FaXTwitter className="cursor-pointer" />
        <FaPhone className="cursor-pointer" />
      </div>
      <div className=" space-x-2 font-semibold">
        <a className=" cursor-pointer" href="#">
          Home
        </a>
        <a className=" cursor-pointer" href="#">
          About
        </a>
        <a className=" cursor-pointer hover:animate-spin" href="#">
          Contact Us
        </a>
        {/* <a href="#"></a>
        <a href="#"></a> */}
      </div>
      <div className=" flex gap-2 items-center">
        <p>Eden Roth</p>
        <a href="#">
          <BiLogoGmail />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
