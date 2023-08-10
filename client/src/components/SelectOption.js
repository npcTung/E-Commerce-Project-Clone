import React, { memo } from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 p-2 shadow-md border rounded-full flex items-center justify-center cursor-pointer bg-white hover:bg-black hover:text-white hover:border-black transition-all">
      {icon}
    </div>
  );
};

export default memo(SelectOption);
