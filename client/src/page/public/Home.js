import React from "react";
import {
  Banner,
  BestSellers,
  DealDaily,
  FeaturedProduct,
  NewArrivals,
  Sidebar,
} from "../../components";

const Home = () => {
  return (
    <div className="w-main">
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 w-[75%] flex-auto">
          <Banner />
          <BestSellers />
        </div>
      </div>
      <FeaturedProduct />
      <NewArrivals />
    </div>
  );
};

export default Home;
