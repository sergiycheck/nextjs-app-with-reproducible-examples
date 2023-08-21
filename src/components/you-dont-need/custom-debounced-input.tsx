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

  const debouncedInputChangeHandler = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("debouncedInputChangeHandler", e.target.value);
      setInputValue(e.target.value);
    }, 500),
    []
  );

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedInputChangeHandler(e);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-6xl font-bold">custom debounced input</h2>
      <Input value={inputValue} onChange={inputChangeHandler} />
    </div>
  );
};
