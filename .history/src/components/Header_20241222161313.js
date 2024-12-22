import React from 'react';

function Header({ onGenerateArray, onSort, onAlgorithmChange, algorithm }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
      <button onClick={onGenerateArray}>Generate New Array</button>
      
      <select value={algorithm} onChange={(e) => onAlgorithmChange(e.target.value)}>
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
      </select>
      
      <button onClick={onSort}>Sort</button>
    </div>
  );
}

export default Header;
