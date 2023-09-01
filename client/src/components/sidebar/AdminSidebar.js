import React, { Fragment, memo, useState } from "react";
import Logo from "assets/logo.png";
import { adminSidebar } from "ultils/contants";
import { NavLink } from "react-router-dom";
import icons from "ultils/icons";
import { useCallback } from "react";

const { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } = icons;

const Active =
  "flex items-center gap-2 border-b w-full bg-blue-600 text-white hover:bg-blue-600 hover:text-white transition-all";
const notActive =
  "flex items-center gap-2 border-b w-full hover:bg-blue-600 hover:text-white transition-all";

const AdminSidebar = () => {
  const [activeClick, setActiveClick] = useState(false);
  // ACTIVE FILTER
  const changeActiveFilter = useCallback(() => {
    if (activeClick === true) setActiveClick(false);
    else setActiveClick(true);
  }, [activeClick]);
  return (
    <div className="w-[327px] float-none fixed top-0 bottom-0">
      <div className="h-full">
        <div className="w-full flex flex-col items-center justify-center gap-2 p-6 border-b">
          <img src={Logo} alt="Logo" className="w-[200px] object-contain" />
          <small className="capitalize">
            không gian làm việc của quản trị viên
          </small>
        </div>
        <div className="flex flex-col w-full items-start justify-center">
          {adminSidebar.map((el) => (
            <Fragment key={el.id}>
              {el.type === "SINGLE" && (
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    isActive ? `py-2 px-4 ${Active}` : `py-2 px-4 ${notActive}`
                  }
                >
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </NavLink>
              )}
              {el.type === "PAREMT" && (
                <div className="w-full">
                  <div
                    className={`py-2 px-4 ${notActive} flex justify-between cursor-pointer`}
                    onClick={changeActiveFilter}
                  >
                    <span className="flex gap-2 items-center">
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </span>
                    {activeClick ? (
                      <MdOutlineKeyboardArrowRight size={20} />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={20} />
                    )}
                  </div>
                  {activeClick && (
                    <div className="w-full flex flex-col">
                      {el.submenu.map((el, index) => (
                        <NavLink
                          key={index}
                          to={el.path}
                          className={({ isActive }) =>
                            isActive
                              ? `py-2 px-6 ${Active}`
                              : `py-2 px-6 ${notActive}`
                          }
                        >
                          <span>{el.subIcon}</span>
                          <span>{el.text}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
