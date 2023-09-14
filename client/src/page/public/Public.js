import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "components";

const Public = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TopHeader />
      <Header />
      <Navigation />
      <main className="my-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Public;
