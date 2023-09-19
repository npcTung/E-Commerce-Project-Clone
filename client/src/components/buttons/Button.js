import React, { memo } from "react";

const Button = ({
  name,
  handleOnClick,
  styles,
  iconAfter,
  iconBefore,
  wf,
  type = "button",
}) => {
  return (
    <div className="w-full">
      <button
        type={type}
        className={`uppercase btn bg-main btn-error text-white ${styles} ${
          wf && "w-full"
        }`}
        onClick={() => {
          handleOnClick && handleOnClick();
        }}
      >
        <span className="flex items-center">
          {iconBefore && <span>{iconBefore}</span>}
          <span>{name}</span>
          {iconAfter && <span>{iconAfter}</span>}
        </span>
      </button>
    </div>
  );
};

export default memo(Button);
