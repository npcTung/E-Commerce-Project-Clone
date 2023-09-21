import React from "react";
import { useSelector } from "react-redux";
import Payment from "assets/payment.gif";
import { CheckOutOption, PayPal } from "components";

const Checkout = () => {
  const { currentCart } = useSelector((state) => state.user);
  return (
    <div className="w-main mx-auto grid grid-cols-10 gap-6">
      <div className="w-full flex items-center justify-center col-span-4"></div>
      <div className="fixed w-[473px] h-full">
        <img
          src={Payment}
          alt="Payment"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="col-span-6 flex flex-col items-center gap-6">
        <div className="h-[115px]"></div>
        <div className="fixed bg-white z-10 w-[722px]">
          <h1 className="flex justify-between items-center text-xl font-semibold border-b border-gray-300 px-[30px] py-[39px]">
            <span className="uppercase">kiểm tra đơn đặt hàng của bạn</span>
          </h1>
        </div>
        <div className="w-full flex flex-col gap-6">
          <CheckOutOption cartData={currentCart} />
          <div>input address</div>
          <div className="w-full">
            <PayPal amount={120} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
