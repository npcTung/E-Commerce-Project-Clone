import React, { memo } from "react";
import usePagination from "../hooks/usePagination";
import { PagiItem } from "./";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const pagination = usePagination(totalCount, 2);
  const [params] = useSearchParams();

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 12;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} đến ${end}`;
  };

  return (
    <div className="w-full flex justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">{`Hiển thị sản phẩm từ 1 đến ${
          process.env.REACT_APP_PRODUCT_LIMIT || 12
        } trên ${totalCount} sản phẩm`}</span>
      )}
      {+params.get("page") && (
        <span className="text-sm italic">{`Hiển thị sản phẩm từ ${range()} trên ${totalCount} sản phẩm`}</span>
      )}
      <div className="flex items-center gap-2">
        {pagination?.map((el) => (
          <PagiItem key={el} value={el} />
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
