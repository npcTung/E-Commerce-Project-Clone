import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { useSelector } from "react-redux";

const {
  BiLogoFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGoogle,
  BiLogoPinterest,
} = icons;

const TopHeader = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div className="w-full bg-main">
      <div className="py-2 w-main mx-auto text-white flex items-center justify-between">
        <span className="uppercase text-xs">
          order online or call us (+1800) 000 8808
        </span>
        <div className="flex gap-2">
          {isLoggedIn ? (
            <span className="cursor-pointer capitalize hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)] text-xs">
              account
            </span>
          ) : (
            <Link
              to={`/${path.LOGIN}`}
              className="capitalize hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)] text-xs"
            >
              sign in or create account
            </Link>
          )}
          <span className="cursor-pointer hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)]">
            <BiLogoFacebook />
          </span>
          <span className="cursor-pointer hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)]">
            <AiOutlineTwitter />
          </span>
          <span className="cursor-pointer hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)]">
            <AiOutlineInstagram />
          </span>
          <span className="cursor-pointer hover:text-black transition-all border-r pr-3 border-[rgba(255,255,255,0.3)]">
            <AiOutlineGoogle />
          </span>
          <span className="cursor-pointer hover:text-black transition-all">
            <BiLogoPinterest />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
