import React, { memo } from "react";

const SelectOption = ({ icon, addCart }) => {
  return (
    <div
      className={`w-10 h-10 p-2 shadow-md border rounded-full flex items-center justify-center ${
        addCart
          ? "bg-white text-green-500"
          : "cursor-pointer bg-white hover:bg-overlay60 hover:text-white transition-all"
      }`}
    >
      {icon}
    </div>
  );
};

export default memo(SelectOption);
