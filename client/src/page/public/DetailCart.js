import React from "react";
import { Breadcrumbs, CartProduct } from "components";
import { useSelector } from "react-redux";
import noProduct from "assets/no-product.png";
import { Link } from "react-router-dom";
import path from "ultils/path";

const DetailCart = () => {
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="w-main mx-auto">
      <div className="flex flex-col gap-4 mb-5">
        <h1 className="uppercase text-xl font-semibold">giỏ hàng của bạn</h1>
        <Breadcrumbs category={"giỏ hàng của bạn"} />
      </div>
      {currentCart && currentCart?.length > 0 ? (
        <CartProduct cartData={currentCart} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3 className="capitalize text-xl font-medium py-5 border-b border-black">
            giỏ hàng của bạn
          </h3>
          <img
            src={noProduct}
            alt="No product"
            className="w-[300px] h-full object-contain"
          />
          <span className="text-gray-500">
            Xem sản phẩm{" "}
            <Link
              to={`/${path.PRODUCTS}`}
              className="hover:text-main transition-all"
            >
              ở đây
            </Link>
            .
          </span>{" "}
        </div>
      )}
    </div>
  );
};

export default DetailCart;
