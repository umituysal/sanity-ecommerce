import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import Image from "next/image";

const HeroBanner = ({
  heroBanner: { image, smallText, midText, buttonText },
}) => {
  const src = urlFor(image && image).url();
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col items-center max-w-6xl px-5 py-24 mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 capitalize sm:text-4xl">
            {midText}
          </h1>
          <p className="mb-8 leading-relaxed">{smallText}</p>
          <button className="w-48 h-12 text-white bg-blue-700 rounded-lg">
            {buttonText}
          </button>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src={src}
            unoptimized={true}
            loader={() => src}
            width={672}
            height={378}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
