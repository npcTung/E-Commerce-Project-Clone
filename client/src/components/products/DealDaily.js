import React, { useState, useEffect, memo } from "react";
import icons from "ultils/icons";
import LogoImage from "assets/logo-image.png";
import { Link, useNavigate } from "react-router-dom";
import { apiGetProducts } from "apis";
import { renderStarFromNumber, formatMoney, seconsToHms } from "ultils/helpers";
import { CountDown } from "components";
import moment from "moment";

const { BsStarFill, PiListFill } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const navigate = useNavigate();

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 7),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.products[0]);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = seconsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    fetchDealDaily();
  }, [expireTime]);

  useEffect(() => {
    const idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [hour, minute, second, expireTime]);

  return (
    <div className="border flex-auto w-full p-5">
      <div className="flex items-center justify-between">
        <BsStarFill size={23} color="#ee3131" />
        <span className="uppercase font-600 text-xl">daily deals</span>
        <span></span>
      </div>
      <div className="w-full p-4 mt-6">
        <Link
          to={`/${dealDaily?.category}/${dealDaily?._id}/${dealDaily?.slug}`}
          className="w-full"
        >
          <img
            src={dealDaily?.thumb || LogoImage}
            alt={dealDaily?.title}
            className="object-contain"
          />
        </Link>
        <div className="flex flex-col gap-4 items-center justify-center py-5">
          <Link
            to={`/${dealDaily?.category}/${dealDaily?._id}/${dealDaily?.slug}`}
            className="line-clamp-1 hover:text-main capitalize transition-all"
          >
            {dealDaily?.title.toLowerCase()}
          </Link>
          <span className="flex text-yellow-500 gap-2">
            {renderStarFromNumber(dealDaily?.totalRatings, 20)}
          </span>
          <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex gap-2 justify-center items-center w-full">
          <CountDown number={hour} unit={"hours"} />
          <CountDown number={minute} unit={"minutes"} />
          <CountDown number={second} unit={"seconds"} />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-main font-medium hover:bg-[#1c1d1d] transition-all text-white uppercase p-2 w-full justify-center"
          title="Select Option"
          onClick={() =>
            navigate(
              `/${dealDaily?.category}/${dealDaily?._id}/${dealDaily?.slug}`
            )
          }
        >
          <PiListFill />
          <span>options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
