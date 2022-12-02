import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";
import Image from "next/image";

const Product = ({ product: { image, name, slug, price } }) => {
  const src = urlFor(image && image[0]).url();
  return (
    <section className="flex justify-center p-6 shadow-xl rounded-xl">
      <Link href={`/product/${slug.current}`}>
        <div>
          <Image
            loader={() => src}
            src={src}
            unoptimized={true}
            alt="User profile picture"
            width={300}
            height={300}
          />
          <div className="mt-4 ">
            <h2 className="mb-2 font-medium text-gray-700 text-md">
              {name.substr(0, 56)}
            </h2>
            <p className="mt-1">{price.toFixed(2)} TL</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Product;
