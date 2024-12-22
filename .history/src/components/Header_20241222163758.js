import React from 'react';

function Header({
  onGenerateArray,
  onSort,
  onAlgorithmChange,
  algorithm,
  isSorting,
  animationSpeed,
  setAnimationSpeed,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
      {/* Generate button */}
      <button
        onClick={onGenerateArray}
        disabled={isSorting}
        className={`px-4 py-2 rounded ${
          isSorting
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition`}
      >
        Generate New Array
      </button>

      {/* Algorithm dropdown */}
      <select
        value={algorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        disabled={isSorting}
        className="px-3 py-2 border border-gray-300 rounded"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
      </select>

      {/* Sort button */}
      <button
        onClick={onSort}
        disabled={isSorting}
        className={`px-4 py-2 rounded ${
          isSorting
            ? 'bg-green-300 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        } text-white transition`}
      >
        Sort
      </button>

      {/* Speed slider */}
      <div className="flex items-center space-x-2">
        <label className="font-semibold">Speed:</label>
        <input
          type="range"
          min="10"
          max="300"
          step="10"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          disabled={isSorting}
          className="cursor-pointer"
        />
        <span>{animationSpeed} ms</span>
      </div>
    </div>
  );
}

export default Header;
