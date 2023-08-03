"use client";

import * as React from "react";
import * as Sentry from "@sentry/nextjs";

const SentryTestComponent = () => {
  const [arrOfItems, setArrOfItems] = React.useState<number[]>([]);
  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          throw new Error("sentry test");
        }}
      >
        throw an error
      </button>
      <div className="flex flex-row gap-2">
        {arrOfItems.map((item) => (
          <div
            key={item}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {item}
          </div>
        ))}
      </div>
      <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setArrOfItems((prev) => [...prev, prev.length + 1]);
        }}
      >
        add item to arr
      </button>
    </>
  );
};

export default Sentry.withProfiler(SentryTestComponent);
