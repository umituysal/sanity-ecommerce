import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import Image from "next/image";

const FooterBanner = ({
  footerBanner: { smallText, midText, buttonText, image },
}) => {
  const src = urlFor(image && image).url();
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col items-center max-w-6xl px-5 py-24 mx-auto md:flex-row">
        <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
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
        <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
            {midText}
          </h1>
          <p className="mb-8 leading-relaxed">{smallText}</p>
          <div className="flex justify-center">
            <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
