import React, { memo, useState } from "react";
import LogoImage from "assets/logo-image.png";
import LableRed from "assets/lable-red.png";
import LableBlue from "assets/lable-blue.png";
import { Link } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import { renderStarFromNumber } from "ultils/helpers";
import { SelectOption, ShowProduct } from "components";
import icons from "ultils/icons";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const { FaEye, PiListFill, HiHeart } = icons;

const Product = ({
  productData,
  isNew,
  newArrival,
  normal,
  masonry,
  navigate,
  dispatch,
}) => {
  const [isShowOption, setIsShowOption] = useState(false);
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
              <span title="Yêu thích">
                <SelectOption icon={<HiHeart />} />
              </span>
              <Link
                to={`/${productData.category.toLowerCase()}/${
                  productData._id
                }/${productData.slug}`}
                title="Chi tiết sản phẩm"
              >
                <SelectOption icon={<PiListFill />} />
              </Link>
              <div
                onClick={() =>
                  dispatch(
                    showModal({
                      isShowModal: true,
                      modalChildren: <ShowProduct productData={productData} />,
                    })
                  )
                }
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
