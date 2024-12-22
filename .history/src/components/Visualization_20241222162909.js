import React, { useState, useEffect } from 'react';
import Header from './Header';
import ArrayBarContainer from './ArrayBarContainer';

// Import default exports from each algorithm
import bubbleSort from '../algorithms/bubbleSort.js';
import {mergeSort} from '../algorithms/mergeSort';
import {quickSort} from '../algorithms/quickSort';
import {heapSort} from '../algorithms/heapSort';

function Visualization() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);

  // Generate an initial array on mount
  useEffect(() => {
    generateNewArray();
  }, []);

  // Generate a new random array
  function generateNewArray() {
    if (isSorting) return; // Guard: do not allow new array during sorting

    const newArr = [];
    for (let i = 0; i < 30; i++) {
      newArr.push(randomIntFromInterval(5, 300));
    }
    setArray(newArr);
  }

  function sort() {
    if (isSorting) return; // Guard: do not sort if already sorting
    setIsSorting(true);

    let animations = [];
    switch (algorithm) {
      case 'bubble':
        animations = bubbleSort(array);
        break;
      case 'merge':
        animations = mergeSort(array);
        break;
      case 'quick':
        animations = quickSort(array);
        break;
      case 'heap':
        animations = heapSort(array);
        break;
      default:
        break;
    }
    animateSorting(animations);
  }

  // Animate the sorting steps
  function animateSorting(animations) {
    const arrayBars = document.getElementsByClassName('array-bar');
    if (!arrayBars.length) return; // Guard: no bars?

    // We'll go through each animation, scheduling with setTimeout
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      setTimeout(() => {
        if (animation.type === 'compare') {
          // Destructure indices
          const [barOneIdx, barTwoIdx] = animation.indices;

          // Guard checks to ensure these bars exist
          if (
            !arrayBars[barOneIdx] || 
            !arrayBars[barTwoIdx]
          ) {
            return;
          }

          // Highlight bars
          arrayBars[barOneIdx].style.backgroundColor = 'red';
          arrayBars[barTwoIdx].style.backgroundColor = 'red';

          // Revert color after a short delay
          setTimeout(() => {
            if (arrayBars[barOneIdx]) {
              arrayBars[barOneIdx].style.backgroundColor = 'teal';
            }
            if (arrayBars[barTwoIdx]) {
              arrayBars[barTwoIdx].style.backgroundColor = 'teal';
            }
          }, 100);
        } 
        else if (animation.type === 'swap') {
          const [barOneIdx, barTwoIdx] = animation.indices;
          const [newHeight1, newHeight2] = animation.values;

          // Guard checks
          if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) {
            return;
          }

          arrayBars[barOneIdx].style.height = `${newHeight1}px`;
          arrayBars[barTwoIdx].style.height = `${newHeight2}px`;
        } 
        else if (animation.type === 'overwrite') {
          // Merge sort uses "overwrite"
          const { index, value } = animation;

          if (!arrayBars[index]) {
            return;
          }

          arrayBars[index].style.height = `${value}px`;
        }

        // If we’re on the last animation, re-enable buttons
        if (i === animations.length - 1) {
          setTimeout(() => {
            setIsSorting(false);
          }, 200);
        }
      }, i * 40);
    }
  }

  // Utility
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div>
      <Header
        onGenerateArray={generateNewArray}
        onSort={sort}
        onAlgorithmChange={setAlgorithm}
        algorithm={algorithm}
        isSorting={isSorting}
      />
      <ArrayBarContainer array={array} />
    </div>
  );
}

export default Visualization;
