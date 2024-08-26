import React from "react";
import { IForm } from "../../../types";

const CustomInput = ({
  error,
  title,
  handleChange,
  handleBlur,
  value,
  placeholder,
  otherStyles,
  otherTextStyles,
  type,
  
}: IForm) => {
  return (
    <>
      <div
        className={`${error ? "bg-white border border-b-red-700" : "border-none"} flex flex-col gap-3 items-start ${otherStyles}`}
      >
        <h2 className="font-semibold text-md text-slate-700">{title}</h2>
        <input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`rounded-md w-full py-3 px-3 bg-slate-200 ${otherTextStyles} outline-none`}
          type={type ? type : "text"}
        />
      </div>
      {error ? (
        <p className="text-red-700 text-base text-center my-1">{error}</p>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomInput;
