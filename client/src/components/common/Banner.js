import React, { memo } from "react";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src="https://digital-world-2.myshopify.com/cdn/shop/files/slideshow3-home2_1920x.jpg?v=1613166679"
        alt="banner"
        className="h-[450px] w-full object-cover"
      />
    </div>
  );
};

export default memo(Banner);
