import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatMoney, renderStarFromNumber } from "../ultils/helpers";
import LogoImage from "../assets/logo-image.png";

const ProductCard = ({ productData }) => {
  return (
    <div
      className="border flex w-[32.4%] h-[142px] py-4 gap-2"
      key={productData?._id}
    >
      <Link
        to={`/${productData?.category.toLowerCase()}/${productData._id}/${
          productData.slug
        }`}
        className="p-2"
      >
        <img
          src={productData?.thumb || LogoImage}
          alt={productData?.title}
          className="w-[104px] h-[109px] object-contain"
        />
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <Link
          to={`/${productData?.category.toLowerCase()}/${productData._id}/${
            productData.slug
          }`}
          className="hover:text-main transition-all capitalize w-full line-clamp-1"
        >
          {productData?.title.toLowerCase()}
        </Link>
        <span className="flex gap-2 text-yellow-500">
          {renderStarFromNumber(productData?.totalRatings)}
        </span>
        <span>{`${formatMoney(productData?.price)} VND`}</span>
      </div>
    </div>
  );
};

export default memo(ProductCard);
