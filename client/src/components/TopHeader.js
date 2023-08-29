import React, { memo, useEffect } from "react";
import icons from "ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessages } from "store/user/userSlice";
import Swal from "sweetalert2";

const {
  BiLogoFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGoogle,
  BiLogoPinterest,
  TbLogout,
} = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, currentData, mes } = useSelector((state) => state.user);

  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        navigate(`/${path.LOGIN}`);
        dispatch(clearMessages());
      });
  }, [mes, navigate]);

  return (
    <div className="w-full bg-main">
      <div className="py-2 w-main mx-auto text-white flex items-center justify-between">
        <span className="uppercase text-xs">
          order online or call us (+1800) 000 8808
        </span>
        <div className="flex gap-2">
          {isLoggedIn && currentData ? (
            <span className="capitalize border-r pr-3 border-[rgba(255,255,255,0.3)] text-xs">
              Xin chào, {currentData?.firstName + " " + currentData?.lastName}
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
          <span
            className={`cursor-pointer hover:text-black transition-all ${
              isLoggedIn && "border-r pr-3 border-[rgba(255,255,255,0.3)]"
            }`}
          >
            <BiLogoPinterest />
          </span>
          {isLoggedIn && (
            <span
              className="cursor-pointer hover:text-black transition-all"
              title="Đăng xuất"
              onClick={() => dispatch(logout())}
            >
              <TbLogout />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
