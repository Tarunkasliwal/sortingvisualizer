import React from 'react';

function ArrayBarContainer({ array }) {
  return (
    <div className="flex items-end justify-center gap-1 mx-auto max-w-5xl border p-4 bg-white">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="array-bar bg-teal-500 w-2"
          style={{ height: `${value}px` }}
        ></div>
      ))}
    </div>
  );
}

export default ArrayBarContainer;
