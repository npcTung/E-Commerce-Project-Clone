import React, { memo, useState, useEffect } from "react";
import { apiGetProducts } from "apis";
import { ProductCard } from "components";

const FeaturedProduct = () => {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [isShowOverlay, setIsShowOverlay] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      sort: "-totalRatings",
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
      <div className="w-full grid grid-cols-4 grid-rows-2 gap-4 py-4">
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Featured 1");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt="Featured 1"
            className="w-full h-full object-cover"
          />
          {isShowOverlay === "Featured 1" && (
            <>
              <span className="absolute inset-0 bg-overlay20 animate-scale-up-tl"></span>
              <span className="absolute inset-0 bg-overlay10 animate-scale-up-br"></span>
            </>
          )}
        </div>
        <div
          className="col-span-1 row-span-1 relative cursor-pointer"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Featured 2");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="Featured 2"
            className="w-full h-full object-cover"
          />
          {isShowOverlay === "Featured 2" && (
            <>
              <span className="absolute inset-0 bg-overlay20 animate-scale-up-tl"></span>
              <span className="absolute inset-0 bg-overlay10 animate-scale-up-br"></span>
            </>
          )}
        </div>
        <div
          className="col-span-1 row-span-2 relative cursor-pointer"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Featured 4");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt="Featured 4"
            className="w-full h-full object-cover"
          />
          {isShowOverlay === "Featured 4" && (
            <>
              <span className="absolute inset-0 bg-overlay20 animate-scale-up-tl"></span>
              <span className="absolute inset-0 bg-overlay10 animate-scale-up-br"></span>
            </>
          )}
        </div>
        <div
          className="col-span-1 row-span-1 relative cursor-pointer"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowOverlay("Featured 3");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShowOverlay(null);
          }}
        >
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="Featured 3"
            className="w-full h-full object-cover"
          />
          {isShowOverlay === "Featured 3" && (
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

export default memo(FeaturedProduct);
