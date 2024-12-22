import React from 'react';

function Header({ 
  onGenerateArray, 
  onSort, 
  onAlgorithmChange, 
  algorithm,
  isSorting
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
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
    </div>
  );
}

export default Header;
