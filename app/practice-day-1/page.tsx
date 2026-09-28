"use client";

import { useEffect, useState } from "react";

const page = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, [count]);

  useEffect(() => {
    console.log("component mounted!");
  }, []);

  const handlePlusOne = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-300">
      <div className="w-75 h-37.5 flex flex-col bg-white rounded-[10px] mt-10">
        <button
          onClick={handlePlusOne}
          className="w-15 h-7.5 rounded-[20px] cursor-pointer bg-green-400 hover:bg-green-800 text-white"
        >
          PLUS ONE
        </button>

        <p className="text-black font-medium text-2xl">
          current count is: {count}
        </p>
      </div>
    </div>
  );
};

export default page;
