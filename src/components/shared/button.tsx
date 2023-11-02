"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      className="max-h-[50px] text-white bg-gray-800 hover:bg-gray-900 
  focus:outline-none focus:ring-4 focus:ring-gray-300
  font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 
  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
