import React, { memo, useCallback, useEffect, useState } from "react";
import noImage from "assets/logo-image.png";
import { createSlug, formatMoney } from "ultils/helpers";
import { Link } from "react-router-dom";
import { SelectQuantity } from "components";
import withBase from "hocs/withBase";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { updateCart } from "store/user/userSlice";

const OrderItem = ({ cartData, dispatch, defaultQuantity = 1, location }) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  // QUANTITY
  const handaleQuantity = useCallback(
    (number) => {
      if (Number(number) >= 1) setQuantity(number);
    },
    [quantity]
  );
  // CHARGE QUANTITY
  const handaleChargeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      else if (flag === "minus") setQuantity((prev) => +prev - 1);
      else if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  // REMOVE CART
  const handleDeleteCart = async (pid, color) => {
    const response = await apis.apiRemoveCart(pid, color);
    if (response.success) dispatch(getCurrent());
    else toast.error(response.mes, { theme: "colored" });
  };

  useEffect(() => {
    dispatch(
      updateCart({
        pid: cartData?.product?._id,
        quantity,
        color: cartData?.color,
      })
    );
  }, [quantity]);

  return (
    <tr>
      <td>
        <div className="w-[100px] h-auto">
          <img
            src={cartData?.thumb || noImage}
            alt={cartData?.product?.title}
            className="w-full h-full object-contain p-[2px]"
          />
        </div>
      </td>
      <td className="flex flex-col gap-1 capitalize">
        <Link
          to={`/${createSlug(cartData?.product?.category)}/${
            cartData?.product?._id
          }/${cartData?.product?.slug}`}
          target={location.pathname.split("/")[1] === "member" ? "_blank" : ""}
          className="text-lg line-clamp-1 hover:text-main transition-all"
        >
          {cartData?.product?.title?.toLowerCase()}
        </Link>
        <span className="text-gray-500">{cartData?.color?.toLowerCase()}</span>
        <span
          onClick={() =>
            handleDeleteCart(cartData?.product?._id, cartData?.color)
          }
          className="cursor-pointer hover:text-main transition-all w-fit"
        >
          Xóa
        </span>
      </td>
      <td>
        <div>
          <SelectQuantity
            quantity={quantity}
            handaleQuantity={handaleQuantity}
            handaleChargeQuantity={handaleChargeQuantity}
            quantityProduct={cartData?.product?.quantity}
          />
        </div>
      </td>
      <td>
        <span>{`${formatMoney(cartData?.price)} VND`}</span>
      </td>
      <td className="w-[210px]">
        <span>{`${formatMoney(quantity * Number(cartData?.price))} VND`}</span>
      </td>
    </tr>
  );
};

export default withBase(memo(OrderItem));
