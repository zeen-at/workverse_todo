"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface IQuery {
  initialQuery: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ initialQuery, handleChange }: IQuery) => {
  return (
    <div className="w-full px-4 md:py-3 bg-blue-50 rounded-xl justify-between items-center flex-row">
      <input
        className="hidden md:block outline-none bg-blue-50 "
        value={initialQuery}
        placeholder="Find your task"
        onChange={handleChange}
      />
      <input
        className="md:hidden outline-none bg-blue-50 "
        value={initialQuery}
        onChange={handleChange}
      />
      <button
      className="text-slate-500 font-bold
       items-center"
      >
        <CiSearch />
      </button>
    </div>
  );
};

export default SearchInput;
