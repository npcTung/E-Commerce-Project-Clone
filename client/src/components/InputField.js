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
        className="input bg-gray-100 placeholder:capitalize w-full"
        placeholder={nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default memo(InputField);
