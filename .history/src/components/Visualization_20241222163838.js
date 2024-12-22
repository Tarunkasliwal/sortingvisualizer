import React, { useState, useEffect } from 'react';
import Header from './Header';
import ArrayBarContainer from './ArrayBarContainer';

import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';
import heapSort from '../algorithms/heapSort';

function Visualization() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);

  // Speed in milliseconds for the animation delay
  const [animationSpeed, setAnimationSpeed] = useState(100);

  useEffect(() => {
    generateNewArray();
  }, []);

  function generateNewArray() {
    if (isSorting) return; // Don't allow changing array mid-sort

    const newArr = [];
    for (let i = 0; i < 30; i++) {
      newArr.push(randomIntFromInterval(5, 300));
    }
    setArray(newArr);
  }

  function sort() {
    if (isSorting) return;
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

  function animateSorting(animations) {
    const arrayBars = document.getElementsByClassName('array-bar');
    if (!arrayBars.length) return;

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      // Each step is delayed by i * animationSpeed
      setTimeout(() => {
        if (animation.type === 'compare') {
          const [barOneIdx, barTwoIdx] = animation.indices;

          // Guard checks
          if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) return;

          // Highlight them in red
          arrayBars[barOneIdx].style.backgroundColor = 'red';
          arrayBars[barTwoIdx].style.backgroundColor = 'red';

          // Revert after a short delay
          setTimeout(() => {
            if (arrayBars[barOneIdx]) {
              arrayBars[barOneIdx].style.backgroundColor = 'teal';
            }
            if (arrayBars[barTwoIdx]) {
              arrayBars[barTwoIdx].style.backgroundColor = 'teal';
            }
          }, animationSpeed / 2); 
        } 
        else if (animation.type === 'swap') {
          const [barOneIdx, barTwoIdx] = animation.indices;
          const [newHeight1, newHeight2] = animation.values;

          if (!arrayBars[barOneIdx] || !arrayBars[barTwoIdx]) return;

          // (Optional) highlight in a different color
          arrayBars[barOneIdx].style.backgroundColor = 'blue';
          arrayBars[barTwoIdx].style.backgroundColor = 'blue';

          // Swap their heights
          arrayBars[barOneIdx].style.height = `${newHeight1}px`;
          arrayBars[barTwoIdx].style.height = `${newHeight2}px`;

          // Revert color
          setTimeout(() => {
            if (arrayBars[barOneIdx]) {
              arrayBars[barOneIdx].style.backgroundColor = 'teal';
            }
            if (arrayBars[barTwoIdx]) {
              arrayBars[barTwoIdx].style.backgroundColor = 'teal';
            }
          }, animationSpeed / 2);
        }
        else if (animation.type === 'overwrite') {
          // Typically used by merge sort
          const { index, value } = animation;
          if (!arrayBars[index]) return;

          // Highlight
          arrayBars[index].style.backgroundColor = 'orange';

          // Overwrite height
          arrayBars[index].style.height = `${value}px`;

          // Revert color
          setTimeout(() => {
            if (arrayBars[index]) {
              arrayBars[index].style.backgroundColor = 'teal';
            }
          }, animationSpeed / 2);
        }

        // If we're at the last animation, re-enable the buttons
        if (i === animations.length - 1) {
          setTimeout(() => {
            setIsSorting(false);
          }, animationSpeed);
        }
      }, i * animationSpeed);
    }
  }

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
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <ArrayBarContainer array={array} />
    </div>
  );
}

export default Visualization;
