import React from "react";
import { Breadcrumbs, Button, OrderItem } from "components";
import { useSelector } from "react-redux";
import noProduct from "assets/no-product.png";
import { formatMoney } from "ultils/helpers";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import withBase from "hocs/withBase";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";

const { HiArrowLongRight } = icons;

const DetailCart = ({ dispatch }) => {
  const { currentCart } = useSelector((state) => state.user);

  const updateCartProduct = async () => {
    // const response = await apis.apiUpdateCart({
    //   pid: currentCart?.product?._id,
    //   color: currentCart?.color,
    //   price: currentCart?.price,
    //   thumb: currentCart?.thumb,
    //   quantity: currentCart?.quantity,
    // });
    // if (response.success) {
    //   toast.success("Cập nhập giỏ hàng thành công!", { theme: "colored" });
    //   dispatch(getCurrent());
    // } else toast.error(response.mes, { theme: "colored" });
    console.log(currentCart);
  };

  return (
    <div className="w-main mx-auto">
      <div className="flex flex-col gap-4 mb-5">
        <h1 className="uppercase text-xl font-semibold">giỏ hàng của bạn</h1>
        <Breadcrumbs category={"giỏ hàng của bạn"} />
      </div>
      {currentCart && currentCart?.length > 0 ? (
        <div className="w-full flex flex-col gap-5">
          <table className="table border">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                <th className="w-[210px]">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {currentCart.map((el) => (
                <OrderItem
                  key={el._id}
                  cartData={el}
                  defaultQuantity={el.quantity}
                />
              ))}
            </tbody>
          </table>
          <div className="w-full flex flex-col justify-center items-end">
            <div className="flex flex-col justify-end items-end gap-4">
              <div className="flex items-center gap-5 text-xl">
                <span>Tổng tiền: </span>
                <span className="font-semibold">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => sum + Number(el.quantity) * Number(el.price),
                    0
                  )
                )} VND`}</span>
              </div>
              <span className="text-sm text-gray-500 italic">
                Phí vận chuyển, thuế và chiết khấu được tính khi thanh toán
              </span>
              <div className="flex items-center gap-2">
                <Button
                  name={"cập nhật"}
                  styles={"border-main whitespace-nowrap"}
                  handleOnClick={updateCartProduct}
                />
                <Button
                  name={"thanh toán"}
                  iconAfter={<HiArrowLongRight size={20} />}
                  styles={"border-main whitespace-nowrap"}
                />
              </div>
            </div>
          </div>
        </div>
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
          </span>
        </div>
      )}
    </div>
  );
};

export default withBase(DetailCart);
