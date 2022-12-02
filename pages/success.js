import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="bg-white min-h-[60vh]">
      <div className="w-full m-auto mt-[160px] bg-[#dcdcdc] p-[50px] rounded-2xl flex justify-center items-center flex-col">
        <p className="text-4xl text-green-800">
          <BsBagCheckFill />
        </p>
        <h2 className="mt-4 text-3xl font-black text-center capitalize text-[#324d67]">
          Siparişiniz için teşekkür ederiz!
        </h2>
        <p className="text-[16px] font-semibold text-center">
          Makbuz için e-posta gelen kutunuzu kontrol edin.
        </p>
        <p className="text-[16px] font-semibold text-center m-4">
          Herhangi bir sorunuz varsa, lütfen e-posta gönderin
          <a className="ml-2" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="">
            Alışverişe devam ediniz!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
