import React, { useState, useEffect } from 'react';

const CircularProgressBar = ({ maxValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < maxValue ? prevProgress + 1 : 0));
    }, 100);

    return () => clearInterval(interval);
  }, [maxValue]);

  const percentage = (progress / maxValue) * 100;

  return (
    <div className="relative w-40 h-40">
      <div className="absolute w-full h-full clip-rect(0, 40px, 40px, 20px) rounded-full">
        <div
          className="box-border w-full h-full clip-rect(0, 20px, 40px, 0) rounded-full bg-blue-500"
          style={{ transform: `rotate(${percentage * 3.6}deg)` }}
        />
      </div>
      <div className="flex items-center justify-center text-center">
        <div className="text-2xl font-bold text-black">{progress}</div>
        <div className="text-gray-500">Products Ordered</div>
      </div>
    </div>
  );
};

export default CircularProgressBar;