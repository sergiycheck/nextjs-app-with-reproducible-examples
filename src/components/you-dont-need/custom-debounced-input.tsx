"use client";
import React from "react";
import { Input } from "../shared/input";
import debounce from "lodash.debounce";

// function debounce(func: Function, wait: number, immediate = false) {
//   let timeout: ReturnType<typeof setTimeout> | null;
//   return function (...args: any[]) {
//     // @ts-ignore
//     let context = this as any;

//     timeout && clearTimeout(timeout);

//     if (immediate && !timeout) {
//       func.apply(context, args);
//     }

//     timeout = setTimeout(function () {
//       timeout = null;
//       if (!immediate) {
//         func.apply(context, args);
//       }
//     }, wait);
//   };
// }

export const CustomDebouncedInput = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  const debouncedInputChangeHandler = React.useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setDebouncedInputValue(e.target.value);
      }, 500),
    []
  );

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedInputChangeHandler(e);
  };

  return (
    <div className="mt-2">
      <Input value={inputValue} onChange={inputChangeHandler} />
      <h3 className="text-lg mt-2">Debounce output: {debouncedInputValue}</h3>
    </div>
  );
};
