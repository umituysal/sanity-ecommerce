import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold capitalize">Popüler ürünler</h2>
      </div>
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-6 my-10 sm:grid-cols-2 md:grid-cols-4">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
