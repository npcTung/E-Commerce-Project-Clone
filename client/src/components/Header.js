import React, { memo } from "react";
import path from "../ultils/path";
import Logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";

const { RiPhoneFill, TbMailFilled, SlHeart, PiHandbagFill, FaUserCircle } =
  icons;

const Header = () => {
  return (
    <header className="w-main h-[110px] py-[35px] flex justify-between">
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
          <Link to={"#"}>
            <SlHeart color="#ee3131" size={21} />
          </Link>
        </div>
        <div className="flex border-r px-6">
          <span className="flex items-center justify-start gap-1 cursor-pointer hover:text-main transition-all">
            <PiHandbagFill color="#ee3131" size={30} />
            <span>0 items</span>
          </span>
        </div>
        <div className="flex px-6">
          <span className="flex items-center justify-center cursor-pointer">
            <FaUserCircle color="#ee3131" size={30} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
