import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <header className="container mx-auto text-gray-600 body-font">
      <div className="flex items-center justify-between p-5 ">
        <Link
          href={"/"}
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
        >
          <span className="ml-3 text-xl cursor-pointer">Ecommerce</span>
        </Link>

        <button
          type="button"
          className="flex text-[24px]"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="text-xs">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
    </header>
  );
};

export default Navbar;
