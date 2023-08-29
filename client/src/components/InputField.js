import React, { memo } from "react";
import icons from "ultils/icons";

const { BiSolidInfoCircle } = icons;

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  handleEnter,
  eventOnBlur,
}) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={nameKey}
        className="label label-text capitalize opacity-70"
      >
        {nameKey}
      </label>
      <input
        type={type || "text"}
        className={`input ${
          invalidFields?.some((el) => el.name === nameKey) && "input-error"
        } bg-gray-100 placeholder:capitalize w-full`}
        placeholder={nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => {
          setInvalidFields([]);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleEnter && handleEnter()}
        onBlur={() => eventOnBlur && eventOnBlur()}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <span
          className="cursor-default absolute bottom-4 text-lg text-main right-[2px]"
          title={invalidFields?.find((el) => el.name === nameKey)?.mes}
        >
          <BiSolidInfoCircle />
        </span>
      )}
    </div>
  );
};

export default memo(InputField);
