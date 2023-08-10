import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "../apis";
import { Product } from "./";
import Slider from "react-slick";
import { getNewProduct } from "../store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arivals" },
];

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { newProduct } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSellers(response.products);
      setProduct(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProduct());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProduct(bestSellers);
    if (activedTab === 2) setProduct(newProduct);
  }, [activedTab]);

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
      <div className="mt-5 -mx-[10px]">
        <Slider {...settings}>
          {product?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className="flex justify-between mt-5 gap-5">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="Banner1"
          className="flex-1 object-cover cursor-pointer"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="Banner2"
          className="flex-1 object-cover cursor-pointer"
        />
      </div>
    </div>
  );
};

export default memo(BestSellers);
