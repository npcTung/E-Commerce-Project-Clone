import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSlug } from "ultils/helpers";
import icons from "ultils/icons";

const { MdOutlineKeyboardArrowRight } = icons;

const HotCollection = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="mt-6">
      <div className="border-b-2 border-main py-4 flex items-center justify-between">
        <span className="text-xl uppercase font-semibold">hot collections</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
        {categories
          ?.filter((el) => el.brand.length > 0)
          ?.map((el) => (
            <div key={el._id} className="flex w-[32%] border p-4 gap-2">
              <img
                src={el.image}
                alt={el.title}
                className="w-1/2 h-[150px] object-contain"
              />
              <div className="flex flex-col gap-3">
                <span className="uppercase font-medium">{el.title}</span>
                <ul className="flex flex-col gap-1">
                  {el.brand?.map((item, index) => (
                    <li key={index} className="flex text-gray-500 text-[15px]">
                      <MdOutlineKeyboardArrowRight />
                      <Link
                        to={`/${createSlug(el.title)}/${createSlug(item)}`}
                        className="hover:text-main transition-all"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(HotCollection);
