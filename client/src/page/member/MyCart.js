import React from "react";
import { useSelector } from "react-redux";
import { CartProduct } from "components";
import noProduct from "assets/no-product.png";
import { Link } from "react-router-dom";
import path from "ultils/path";

const MyCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
          <span className="uppercase">Thông tin giỏ hàng của bạn</span>
        </h1>
      </div>
      <div className="w-full p-5">
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
    </div>
  );
};

export default MyCart;
