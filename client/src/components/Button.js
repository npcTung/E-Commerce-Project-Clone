import React, { memo } from "react";

const Button = ({ name, handleOnClick, style, iconAfter, iconBefore, wf }) => {
  return (
    <div className="w-full">
      <button
        type="button"
        className={`${
          style
            ? style
            : `uppercase btn bg-main btn-error text-white ${
                wf ? "w-full" : "w-fit"
              }`
        }`}
        onClick={() => {
          handleOnClick && handleOnClick();
        }}
      >
        {iconBefore && <span>{iconBefore}</span>}
        <span>{name}</span>
        {iconAfter && <span>{iconAfter}</span>}
      </button>
    </div>
  );
};

export default memo(Button);
