import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[75%] h-[60px] flex flex-col items-center justify-center mb-4 bg-red-100 rounded-sm">
      <span className="font-medium">{number}</span>
      <span className="text-xs capitalize text-gray-500">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
