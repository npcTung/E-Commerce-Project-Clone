import React, { memo, useState } from "react";
import path from "ultils/path";
import Logo from "assets/logo.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";

const {
  RiPhoneFill,
  TbMailFilled,
  SlHeart,
  PiHandbagFill,
  FaUserCircle,
  IoMdClose,
} = icons;

const Header = () => {
  const [isShowAccount, setIsShowAccount] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  return (
    <header className="w-main mx-auto h-[110px] py-[35px] flex justify-between">
      {isShowAccount && (
        <div
          className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-20"
          onClick={() => setIsShowAccount(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-5 flex flex-col gap-3 rounded-md"
          >
            <span className="flex items-center justify-center relative">
              <span className="text-main">
                <FaUserCircle size={35} />
              </span>
              <span
                className="absolute -top-5 -right-5 cursor-pointer"
                onClick={() => setIsShowAccount(false)}
              >
                <IoMdClose size={30} />
              </span>
            </span>
            <span className="flex justify-center">
              <span className="px-1">Tài khoản</span>{" "}
              <Link
                to={`/${path.MEMBER}/${path.PERSONAL}`}
                className="hover:text-main transition-all"
              >
                {currentData?.firstName + " " + currentData?.lastName}
              </Link>
            </span>
            <span className="flex gap-4 justify-center">
              <Link
                to={`/${path.MEMBER}/${path.PERSONAL}`}
                className="hover:text-main transition-all"
              >
                Tài khoản của tôi
              </Link>
              <span>/</span>
              <Link to={"#"} className="hover:text-main transition-all">
                Sản phẩm yêu thích
              </Link>
              {+currentData?.role === 2002 && (
                <>
                  <span>/</span>
                  <Link
                    to={`/${path.ADMIN}/${path.DASH_BOARD}`}
                    className="hover:text-main transition-all"
                  >
                    Quản trị viên
                  </Link>
                </>
              )}
              <span>/</span>
              <span
                onClick={() => dispatch(logout())}
                className="hover:text-main transition-all cursor-pointer"
              >
                Đăng xuất
              </span>
            </span>
          </div>
        </div>
      )}
      <a href={`/${path.HOME}`}>
        <img src={Logo || ""} alt="Logo" className="w-[234px] object-contain" />
      </a>
      <div className="flex text-sm">
        <div className="flex flex-col border-r px-6">
          <span className="flex items-center justify-start gap-1">
            <RiPhoneFill color="#ee3131" />
            <span className="font-medium">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col border-r px-6">
          <span className="flex items-center justify-start gap-1">
            <TbMailFilled color="#ee3131" />
            <span className="font-medium">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span className="text-center">Online Support 24/7</span>
        </div>
        <div className="flex border-r px-6 items-center">
          <Link to={"#"} title="Sản phẩm yêu thích">
            <SlHeart color="#ee3131" size={21} />
          </Link>
        </div>
        <div className={`flex px-6 ${isLoggedIn && "border-r"}`}>
          <span
            className="flex items-center justify-start gap-1 cursor-pointer hover:text-main transition-all"
            title="Giỏ hàng"
          >
            <PiHandbagFill color="#ee3131" size={30} />
            <span>0 items</span>
          </span>
        </div>
        {isLoggedIn && (
          <div className="flex px-6">
            <span
              className="flex items-center justify-center cursor-pointer"
              title="Profile"
              onClick={() => setIsShowAccount(true)}
            >
              <FaUserCircle color="#ee3131" size={30} />
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
