import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis";
import Product from "./Product";
import Slider from "react-slick";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arivals" },
];

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0].success) setBestSellers(response[0].products);
    if (response[1].success) setNewProducts(response[1].products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="py-4 flex gap-4 text-xl border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`uppercase font-semibold cursor-pointer ${
              activedTab === el.id ? "text-black" : "text-gray-400"
            } ${el.id === 1 ? "pr-7 border-r" : "pl-4"}`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-10">
        <Slider {...settings}>
          {bestSellers?.map((el) => (
            <Product key={el._id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellers;
