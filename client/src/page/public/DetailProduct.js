import React from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { pid, title } = useParams();
  console.log({ pid, title });
  return <div className="w-main mx-auto">DetailProduct</div>;
};

export default DetailProduct;
