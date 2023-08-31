import React, { memo, useState, useEffect } from "react";
import { apiGetProducts } from "apis";
import { ProductCard } from "components";

const FeaturedProduct = () => {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      page: Math.round(Math.random() * 7),
    });
    if (response.success) setFeaturedProduct(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full mt-2">
      <div className="border-b-2 border-main py-4">
        <span className="text-xl uppercase font-semibold">
          featured product
        </span>
      </div>
      <div className="w-full mt-6 flex flex-wrap items-center justify-between gap-4">
        {featuredProduct?.map((el) => (
          <ProductCard key={el._id} productData={el} />
        ))}
      </div>
      <div className="w-full h-[655px] mt-5 flex justify-between gap-5">
        <div className="w-1/2 h-full">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt="Featured 1"
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex-auto flex gap-5">
          <div className="w-1/2 h-full flex flex-col gap-5">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
              alt="Featured 2"
              className="w-full h-1/2 object-cover cursor-pointer"
            />
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
              alt="Featured 3"
              className="w-full h-1/2 object-cover cursor-pointer"
            />
          </div>
          <div className="w-1/2 h-full">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
              alt="Featured 4"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FeaturedProduct);
