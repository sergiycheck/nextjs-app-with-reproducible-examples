"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className="input input-bordered input-info w-full max-w-xs" ref={ref} {...props} />;
});
Input.displayName = "Input";
