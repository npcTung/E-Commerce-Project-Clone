import React from "react";
import LogoImage from "../assets/logo-image.png";
import { Link } from "react-router-dom";

const Product = ({ productData }) => {
  return (
    <div className="w-1/3">
      <Link to={productData.slug}>
        <img
          src={productData.images[0] || LogoImage}
          className="w-full h-[243px] object-cover"
        />
      </Link>
      <div className="flex flex-col">
        <Link to={productData.slug}>{productData.title}</Link>
        <span>{productData.price}</span>
      </div>
    </div>
  );
};

export default Product;
