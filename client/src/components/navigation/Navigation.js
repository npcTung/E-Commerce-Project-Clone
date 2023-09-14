import React, { memo, useState } from "react";
import { navigation } from "ultils/contants";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSlug } from "ultils/helpers";
import icons from "ultils/icons";

const { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } = icons;

const Navigation = () => {
  const { categories } = useSelector((state) => state.app);
  const [activeHover, setActiveHover] = useState(false);
  return (
    <div className="w-main mx-auto h-12 border-y text-sm flex items-center">
      {navigation.map((el) => (
        <div key={el.id} className={`${el.value === "products" && "relative"}`}>
          <div className="w-full">
            <NavLink
              to={el.path}
              className={({ isActive }) =>
                isActive
                  ? "text-main transition-all uppercase"
                  : "hover:text-main transition-all uppercase"
              }
            >
              <span
                className="flex pr-12 gap-2"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  el.value === "products" && setActiveHover(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  el.value !== "products" && setActiveHover(false);
                }}
              >
                <span>{el.value}</span>
                <span>
                  {el.value === "products" &&
                    (activeHover ? (
                      <MdOutlineKeyboardArrowDown size={20} />
                    ) : (
                      <MdOutlineKeyboardArrowRight size={20} />
                    ))}
                </span>
              </span>
            </NavLink>
          </div>
          {activeHover && el.value === "products" && (
            <div
              className="absolute z-20 p-5 bg-white rounded-sm shadow-lg w-[1000px] flex justify-between top-10 animate-slide-bottom"
              onMouseLeave={(e) => {
                e.stopPropagation();
                el.value === "products" && setActiveHover(false);
              }}
            >
              {categories?.map((el) => (
                <div key={el._id} className="w-full">
                  <NavLink
                    to={`/${createSlug(el.title)}`}
                    className={`p-2 hover:text-main transition-all font-semibold`}
                  >
                    {el.title}
                  </NavLink>
                  {el.brand.length > 0 && (
                    <div className="w-full flex flex-col justify-center items-start gap-4 px-2 py-6">
                      {el.brand.map((els, idx) => (
                        <NavLink
                          key={idx}
                          to={`/${createSlug(el.title)}/${createSlug(els)}`}
                          className={`px-2 hover:text-main`}
                        >
                          {els}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Navigation);
