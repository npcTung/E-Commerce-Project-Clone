import React from "react";
import { Banner, BestSellers, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex gap-4">
      <div className="flex flex-col gap-5 w-[25%] flex-auto">
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className="flex flex-col gap-5 w-[75%] flex-auto">
        <Banner />
        <BestSellers />
      </div>
    </div>
  );
};

export default Home;
