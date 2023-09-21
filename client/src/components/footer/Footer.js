import React, { memo, useState } from "react";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { socialNetwork, information, whoWeAre } from "ultils/contants";

const { TbMailFilled, MdLocationOn, RiPhoneFill } = icons;

const Footer = () => {
  const [email, setEmail] = useState("");
  const handledEmail = () => {
    if (email)
      Swal.fire("Successfully", "Email sent Successfully", "success").then(
        setEmail("")
      );
    else Swal.fire("Oops!", "Email sent Failed", "error").then(setEmail(""));
  };
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
              value={email}
              className="bg-transparent py-2 text-white outline-none placeholder:text-white placeholder:opacity-70 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span onClick={handledEmail} className="cursor-pointer">
              <TbMailFilled size={23} />
            </span>
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
                {socialNetwork.map((el) => (
                  <Link
                    to={el.path}
                    key={el.id}
                    title={el.title}
                    className="cursor-pointer p-3 bg-overlay10 rounded-md"
                  >
                    {el.icon}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              information
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              {information.map((el) => (
                <li
                  key={el.id}
                  className="opacity-70 hover:opacity-100 transition-all"
                >
                  <Link to={el.path}>{el.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <span className="border-l-4 border-main px-3 uppercase text-lg">
              who we are
            </span>
            <ul className="flex flex-col gap-2 text-sm">
              {whoWeAre.map((el) => (
                <li
                  key={el.id}
                  className="opacity-70 hover:opacity-100 transition-all"
                >
                  <Link to={el.path}>{el.text}</Link>
                </li>
              ))}
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
