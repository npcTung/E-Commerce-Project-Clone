import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TopHeader />
      <Header />
      <Navigation />
      <main className="w-main my-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Public;
