import React, { memo, useState } from "react";
import { Sideways } from "../ultils/contants";

const ProductInfomation = ({ description }) => {
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 relative -bottom-[1px]">
        {Sideways?.map((el) => (
          <span
            key={el.id}
            className={`px-6 py-2 text-[15px] uppercase ${
              activedTab === el.id
                ? "bg-white"
                : "bg-[#f1f1f1] hover:bg-white transition-all"
            } cursor-pointer border border-b-0`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.title}
          </span>
        ))}
      </div>
      <div className="border p-4">
        <div className="w-full">
          {activedTab === 1 && (
            <ul className="list-item list-disc ml-5 text-sm">
              {description?.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          )}
          {Sideways.some((el) => el.id === activedTab) && (
            <div className="w-full flex flex-col gap-5">
              {Sideways.find((el) => el.id === activedTab)?.content.length >
                0 && (
                <h3 className="uppercase text-xl font-semibold">
                  {Sideways.find((el) => el.id === activedTab)?.header}
                </h3>
              )}
              <span>
                {Sideways.find((el) => el.id === activedTab)?.content}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
