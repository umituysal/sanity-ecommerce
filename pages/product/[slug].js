import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const src = urlFor(image && image[index]).url();
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 m-10 max-w-6xl mx-auto mt-14 gap-10  text-[#324d67]">
        <div className="mx-4 md:mx-0">
          <div className="w-full">
            <Image
              loader={() => src}
              src={src}
              width={300}
              height={300}
              layout="fixed"
              className="rounded-sm bg-[#ebebeb] w-[400px]  sm:h-[400px] hover:bg-[#f02d34] cursor-pointer transition duration-100 ease-in-out"
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-5">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                width={70}
                height={70}
                className={
                  i === index
                    ? "rounded-sm bg-[#ebebeb] cursor-pointer"
                    : "rounded-sm bg-[#ebebeb] cursor-pointer"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="mx-4 md:mx-0">
          <h1 className="mt-3">{name}</h1>
          <div className="flex items-center">
            <div className="flex mr-2">
              <AiFillStar color="#ffa000" />
              <AiFillStar color="#ffa000" />
              <AiFillStar color="#ffa000" />
              <AiFillStar color="#ffa000" />
              <AiOutlineStar />
            </div>
            <p className="">(20)</p>
          </div>
          <h4 className="mt-3 capitalize">ürün açıklaması: </h4>
          <p className="mx-0 mt-3 text-sm">{details}</p>
          <p className="text-[#f02d34] text-start my-2">Fiyatı: {price} TL</p>
          <div className="flex items-center justify-start">
            <h3 className="mr-4">Adet:</h3>
            <div className="flex justify-between w-[150px] bg-[#ebebeb] items-center p-2">
              <span className="text-black" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="text-black">{qty}</span>
              <span className="text-black" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start w-full mt-10 md:flex-row">
            <button
              type="button"
              className="px-10 py-3 mb-2 text-white bg-blue-400 rounded-md md:mb-0 md:mr-6"
              onClick={() => onAdd(product, qty)}
            >
              Sepete Ekle
            </button>
            <button
              type="button"
              className="px-10 py-3 text-white bg-red-500 rounded-md"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-40 text-center">
        <h2 className="font-sans text-xl font-medium capitalize">
          Benzer ürünler
        </h2>
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-6 my-10 sm:grid-cols-2 md:grid-cols-4">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
