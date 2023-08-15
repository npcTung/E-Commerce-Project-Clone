import React, { memo } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full">
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
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main px-2 text-[10px] italic">
          {invalidFields?.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
