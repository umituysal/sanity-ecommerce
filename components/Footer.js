import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
        <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
          <span className="ml-3 text-xl">Ecommerce</span>
        </a>s
        <span className="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
          <a className="text-gray-500"></a>
          <a className="ml-3 text-gray-500"></a>
          <a className="ml-3 text-gray-500"></a>
          <a className="ml-3 text-gray-500"></a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
