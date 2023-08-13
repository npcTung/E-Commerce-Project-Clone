import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const {
  TbMailFilled,
  MdLocationOn,
  RiPhoneFill,
  AiOutlineGoogle,
  BiLogoFacebook,
  AiOutlineTwitter,
  BiLogoPinterest,
} = icons;

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-main text-white py-3">
        <div className="w-main mx-auto py-3 flex justify-between">
          <div className="flex flex-col w-1/2">
            <span className="uppercase text-xl">sign to newsletter</span>
            <span className="text-xs opacity-70">
              Subscribe now and receive weekly newsletter
            </span>
          </div>
          <div className="flex items-center gap-2 flex-auto bg-[rgba(255,255,255,0.2)] rounded-full px-5">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent py-2 text-white outline-none placeholder:text-white placeholder:opacity-70 w-full"
            />
            <TbMailFilled size={23} />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white py-10">
        <div className="w-main mx-auto py-10 flex">
          <div className="flex-2 flex flex-col gap-5">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              about us
            </span>
            <ul className="text-sm flex flex-col gap-2">
              <li className="flex items-center gap-1">
                <MdLocationOn />
                <span>
                  <span className="pr-2">Address:</span>
                  <span className="opacity-70">
                    474 Ontario St Toronto, ON M4X 1M7 Canada
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-1">
                <RiPhoneFill />
                <span>
                  <span className="pr-2">Phone:</span>
                  <span className="opacity-70">(+1234)56789xxx</span>
                </span>
              </li>
              <li className="flex items-center gap-1">
                <TbMailFilled />
                <span>
                  <span className="pr-2">Mail:</span>
                  <span className="opacity-70">tadathemes@gmail.com</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="cursor-pointer p-3 bg-[rgba(255,255,255,0.1)] rounded-md">
                  <BiLogoFacebook />
                </span>
                <span className="cursor-pointer p-3 bg-[rgba(255,255,255,0.1)] rounded-md">
                  <AiOutlineTwitter />
                </span>
                <span className="cursor-pointer p-3 bg-[rgba(255,255,255,0.1)] rounded-md">
                  <BiLogoPinterest />
                </span>
                <span className="cursor-pointer p-3 bg-[rgba(255,255,255,0.1)] rounded-md">
                  <AiOutlineGoogle />
                </span>
                <span className="cursor-pointer p-[10px] bg-[rgba(255,255,255,0.1)] rounded-md font-bold">
                  in
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              information
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Typography</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Gallery</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Store Location</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Today's Deals</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              who we are
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Help</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Free Shipping</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>FAQs</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Return & Exchange</Link>
              </li>
              <li className="opacity-70 hover:opacity-100 transition-all">
                <Link to={path.HOME}>Testimonials</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              #digitalworldstore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
