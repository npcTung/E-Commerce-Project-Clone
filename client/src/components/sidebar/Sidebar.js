import React, { memo } from "react";
import { Link } from "react-router-dom";
import icons from "ultils/icons";
import { createSlug } from "ultils/helpers";
import { useSelector } from "react-redux";

const { FaList } = icons;

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="flex flex-col justify-center border">
      <span className="flex items-center gap-2 uppercase p-3 bg-main text-white">
        <FaList />
        <span className="font-semibold">all collections</span>
      </span>
      {categories?.map((el) => (
        <Link
          key={el._id}
          to={createSlug(el.title)}
          className="capitalize p-3 flex items-center gap-2 item"
        >
          <span className="hover:text-main transition-all w-full flex gap-1">
            <span>{el.title}</span>
            {el.brand.length > 0 && <span>{`(${el.brand.length})`}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default memo(Sidebar);
