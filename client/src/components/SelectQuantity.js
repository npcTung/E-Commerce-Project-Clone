import React, { memo } from "react";

const SelectQuantity = ({
  quantity,
  handaleQuantity,
  handaleChargeQuantity,
}) => {
  return (
    <div className="flex items-center w-full">
      <span
        className="border-r border-black bg-gray-100 p-2 cursor-pointer"
        onClick={() => handaleChargeQuantity("minus")}
      >
        -
      </span>
      <input
        type="text"
        name="quantity"
        value={quantity}
        onChange={(e) => handaleQuantity(e.target.value)}
        className="bg-gray-100 p-2 w-[50px] text-center outline-none"
      />
      <span
        className="border-l border-black bg-gray-100 p-2 cursor-pointer"
        onClick={() => handaleChargeQuantity("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
