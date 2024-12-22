import React from 'react';

const ArrayBarContainer = ({ 
  array = [25, 50, 75, 100, 125, 150, 175, 200], // Default values
  baseColor = "bg-blue-500",
  hoverColor = "bg-blue-600",
  minHeight = 20,
  maxHeight = 300,
}) => {
  // Normalize the array values to fit within the specified height range
  const normalizeValue = (value) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    return ((value - min) / (max - min)) * (maxHeight - minHeight) + minHeight;
  };

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-end justify-center gap-2 h-80 bg-white p-4 rounded-md">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="group relative flex-1"
          >
            <div
              className={`${baseColor} hover:${hoverColor} transition-all duration-300 rounded-t-md cursor-pointer relative`}
              style={{
                height: `${normalizeValue(value)}px`,
              }}
            >
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap transition-opacity duration-200">
                Value: {value}
              </div>
            </div>
            {/* Bar label */}
            <div className="text-center text-sm text-gray-600 mt-2">
              {idx + 1}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Array Index
      </div>
    </div>
  );
};

export default ArrayBarContainer;