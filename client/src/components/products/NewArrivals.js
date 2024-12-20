import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "apis";
import { CustomSlider } from "components";

const tabs = [
  {
    id: 1,
    title: "smartphone",
  },
  {
    id: 2,
    title: "tablet",
  },
  {
    id: 3,
    title: "laptop",
  },
];

const NewArrivals = () => {
  const [activedTab, setActivedTab] = useState(1);
  const [smartphone, setSmartphone] = useState(null);
  const [tablet, setTablet] = useState(null);
  const [laptop, setLaptop] = useState(null);
  const [product, setProduct] = useState(null);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ category: "Smartphone" }),
      apiGetProducts({ category: "Tablet" }),
      apiGetProducts({ category: "Laptop" }),
    ]);
    if (response[0].success) {
      setSmartphone(response[0].products);
      setProduct(response[0].products);
    }
    if (response[1].success) setTablet(response[1].products);
    if (response[2].success) setLaptop(response[2].products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProduct(smartphone);
    if (activedTab === 2) setProduct(tablet);
    if (activedTab === 3) setProduct(laptop);
  }, [activedTab, smartphone, laptop, tablet]);

  return (
    <div className="mt-6">
      <div className="border-b-2 border-main py-4 flex items-center justify-between">
        <span className="text-xl uppercase font-semibold">new arrivals</span>
        <span className="flex gap-5 capitalize">
          {tabs.map((el) => (
            <span
              key={el.id}
              className={`hover:text-main cursor-pointer transition-all ${
                activedTab === el.id ? "text-main" : "text-gray-500"
              } ${el.id === 3 ? "pr-5" : "border-r pr-5"}`}
              onClick={() => setActivedTab(el.id)}
            >
              {el.title}
            </span>
          ))}
        </span>
      </div>
      <div className="mt-5 -mx-[10px]">
        <CustomSlider product={product} activedTab={activedTab} normal={true} />
      </div>
    </div>
  );
};

export default memo(NewArrivals);
