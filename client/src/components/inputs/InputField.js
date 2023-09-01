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
  placeholder,
  classInput,
  classDiv,
  wf,
  isShowLable,
}) => {
  return (
    <div className={`${wf && "w-full"} ${classDiv} relative`}>
      {!isShowLable && value?.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="label label-text capitalize opacity-70"
        >
          {nameKey}
        </label>
      )}
      <input
        type={type || "text"}
        className={`input ${
          invalidFields?.some((el) => el.name === nameKey) && "input-error"
        } bg-gray-100 w-full ${classInput} placeholder:text-sm`}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => {
          setInvalidFields && setInvalidFields([]);
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
