import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "apis";
import { CustomSlider } from "..";
import { getNewProduct } from "store/products/asyncActions";
import { useSelector } from "react-redux";
import withBase from "hocs/withBase";

const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arivals" },
];

const BestSellers = ({ dispatch }) => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [product, setProduct] = useState(null);
  const [isShowOverlay, setIsShowOverlay] = useState(null);
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
  }, [dispatch]);
  useEffect(() => {
    if (activedTab === 1) setProduct(bestSellers);
    if (activedTab === 2) setProduct(newProduct);
  }, [activedTab, bestSellers, newProduct]);

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
        <CustomSlider product={product} activedTab={activedTab} />
      </div>
      <div className="mt-5 grid grid-cols-2 grid-rows-1 gap-5 cursor-pointer relative">
        <div
          className="col-span-1 row-span-1"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Banner1");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt="Banner1"
            className="w-full h-full object-contain"
          />
          {isShowOverlay === "Banner1" && (
            <>
              <span className="absolute inset-0 bg-overlay20 animate-scale-up-tl"></span>
              <span className="absolute inset-0 bg-overlay10 animate-scale-up-br"></span>
            </>
          )}
        </div>
        <div
          className="col-span-1 row-span-1 cursor-pointer relative"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Banner2");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
            alt="Banner2"
            className="w-full h-full object-contain"
          />
          {isShowOverlay === "Banner2" && (
            <>
              <span className="absolute inset-0 bg-overlay20 animate-scale-up-tl"></span>
              <span className="absolute inset-0 bg-overlay10 animate-scale-up-br"></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(BestSellers));
