import React, { memo, useState } from "react";
import LogoImage from "assets/logo-image.png";
import LableRed from "assets/lable-red.png";
import LableBlue from "assets/lable-blue.png";
import { Link, createSearchParams } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import { renderStarFromNumber } from "ultils/helpers";
import { Cart, SelectOption, ShowProduct } from "components";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import * as apis from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "ultils/path";

const { FaEye, BsFillCartPlusFill, HiHeart, BsCartCheckFill } = icons;

const Product = ({
  productData,
  isNew,
  newArrival,
  normal,
  masonry,
  dispatch,
  navigate,
  location,
}) => {
  const { currentData } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  const handleClickOption = async (e, value) => {
    e.stopPropagation();
    if (value === "PRODUCT_SHORT")
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <ShowProduct productData={productData} />,
        })
      );
    if (value === "YEU_THICH") console.log("YEU_THICH");
    if (value === "ADD_TO_CART") {
      if (!currentData)
        Swal.fire({
          text: "Đăng nhập trước khi thực hiện thao tác này",
          title: "Almost...",
          icon: "info",
          cancelButtonText: "Không",
          cancelButtonColor: "#ee3131",
          showCancelButton: true,
          confirmButtonText: "Đăng nhập",
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      else {
        const response = await apis.apiUpdateCart({
          pid: productData._id,
          color: productData.color,
          price: productData.price,
          thumb: productData.thumb,
        });
        if (response.success) {
          toast.success("Thêm vào giỏ hành thành công", { theme: "colored" });
          dispatch(getCurrent());
          dispatch(showModal({ isShowModal: true, modalChildren: <Cart /> }));
        } else toast.error(response.mes, { theme: "colored" });
      }
    }
  };

  return (
    <div className="w-full px-[10px]">
      <div
        className={`w-full ${
          !masonry && "border p-4"
        } flex flex-col items-center`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-0 flex justify-center left-0 right-0 gap-3 animate-slide-top">
              <div
                title="Yêu thích"
                onClick={(e) => handleClickOption(e, "YEU_THICH")}
              >
                <SelectOption icon={<HiHeart />} />
              </div>
              {currentData?.cart?.some(
                (el) => el.product._id === productData._id
              ) ? (
                <div title="Đã thêm vào giỏ hàng">
                  <SelectOption icon={<BsCartCheckFill />} addCart />
                </div>
              ) : (
                <div
                  title="Thêm vào giỏ hàng"
                  onClick={(e) => handleClickOption(e, "ADD_TO_CART")}
                >
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </div>
              )}
              <div
                onClick={(e) => handleClickOption(e, "PRODUCT_SHORT")}
                title="Xem nhanh sản phẩm"
              >
                <SelectOption icon={<FaEye />} />
              </div>
            </div>
          )}
          <Link
            to={`/${productData.category.toLowerCase()}/${productData._id}/${
              productData.slug
            }`}
          >
            <img
              src={productData.thumb || LogoImage}
              alt={productData.title}
              className={`w-full ${
                newArrival ? "h-[350px]" : "h-[243px]"
              } object-contain`}
            />
          </Link>
          {!normal && (
            <img
              src={isNew ? LableRed : LableBlue}
              alt={isNew ? "Labale New" : "Lable Old"}
              className="absolute -left-[24px] -top-[18px] w-[100px] h-[35px] object-cover"
            />
          )}
          <span className="absolute -left-2 -top-2 text-white uppercase font-medium text-xs">
            {isNew ? "new" : "trending"}
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-4 justify-start w-full">
          <Link
            to={`/${productData.category.toLowerCase()}/${productData._id}/${
              productData.slug
            }`}
            className="line-clamp-1 capitalize hover:text-main transition-all"
          >
            {productData.title.toLowerCase()}
          </Link>
          <span className="flex text-yellow-500 gap-1">
            {renderStarFromNumber(productData.totalRatings)}
          </span>
          <span>{formatMoney(productData.price)} VND</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
