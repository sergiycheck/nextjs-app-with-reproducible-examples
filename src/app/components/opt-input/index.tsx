"use client";
import React from "react";
import OtpInput from "react-otp-input";

export const OptInputExample = () => {
  const [otp, setOtp] = React.useState("");

  const ontChangeHandler = (otp: string) => {
    setOtp(otp);
    if (otp.length === 6) {
      console.log("otp", otp);
    }
  };

  return (
    <>
      <h1 className="text-6xl font-bold">OptInputExample</h1>
      <OtpInput
        inputType="number"
        value={otp}
        onChange={ontChangeHandler}
        numInputs={6}
        renderSeparator={<span className="m-2"></span>}
        renderInput={(props) => {
          const { style, ...rest } = props;
          return <input {...rest} className="input input-bordered input-info w-full max-w-xs" />;
        }}
      />
    </>
  );
};
