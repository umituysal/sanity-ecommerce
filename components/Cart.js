import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="w-full md:w-[100vw] bg-[rgba(0,0,0,0.5)] fixed right-0 top-0 z-[100] transition-all ease-in-out duration-1000"
      ref={cartRef}
    >
      <div className="w-full h-[100vh] md:w-[600px] bg-white float-right pt-[40px] px-3 relative">
        <button
          type="button"
          className="flex items-center gap-1 ml-3 text-lg font-medium bg-transparent border-none cursor-pointer"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-3">Sepetiniz</span>
          <span className="ml-3 text-[#f02d34]">({totalQuantities} adet)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="flex flex-col items-center m-10">
            <AiOutlineShopping size={150} />
            <h3 className="text-xl font-semibold">
              Sepetinizde ürün bulunmamaktadır
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Alışverişe devam edin!
              </button>
            </Link>
          </div>
        )}

        <div className="mt-4 overflow-auto max-h-[70vh] pt-5 px-3">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="flex items-center gap-8 p-5" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="w-[100px] h-[100px] rounded-2xl bg-[#ebebeb]"
                />
                <div className="flex justify-between text-[#324d67]">
                  <div className="flex flex-col">
                    <h5 className="text-md">{item.name?.substring(0, 56)}</h5>
                    <h4 className="my-2 text-lg">{item.price} TL</h4>
                    <div className="flex">
                      <div className="flex justify-between w-[150px] bg-[#ebebeb] items-center p-2">
                        <span
                          className="text-black"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="text-black"> {item.quantity}</span>
                        <span
                          className="text-black"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-15">
                    <button
                      type="button"
                      className="text-2xl text-[#f02d34] cursor-pointer bg-transparent border-none"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute w-full px-16 bottom-20 right-1">
            <div className="flex justify-between">
              <h3 className="text-md">Ara Toplam:</h3>
              <h3>{totalPrice} TL</h3>
            </div>
            <div className="mt-6">
              <button type="button" className="bg-[#f02d34] text-white py-2 px-6 rounded-lg" onClick={handleCheckout}>
                Stripe ile Öde
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
