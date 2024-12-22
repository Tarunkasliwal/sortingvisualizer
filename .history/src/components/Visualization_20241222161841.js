import React, { useState, useEffect } from 'react';
import Header from './Header';
import ArrayBarContainer from './ArrayBarContainer';

import  bubbleSort  from '../algorithms';
import { mergeSort } from './algorithms/mergeSort';
import { quickSort } from './algorithms/quickSort';
import { heapSort } from './algorithms/heapSort';

function Visualization() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateNewArray();
  }, []);

  // Generate a new array of random integers
  function generateNewArray() {
    if (isSorting) return;
    const newArr = [];
    for (let i = 0; i < 30; i++) {
      newArr.push(randomIntFromInterval(5, 300));
    }
    setArray(newArr);
  }

  // Sorting logic
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

  // Animate the sorting process
  function animateSorting(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      
      setTimeout(() => {
        const animation = animations[i];
        
        if (animation.type === 'compare') {
          const [barOneIdx, barTwoIdx] = animation.indices;
          arrayBars[barOneIdx].style.backgroundColor = 'red';
          arrayBars[barTwoIdx].style.backgroundColor = 'red';
          
          // Revert color after some time
          setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = 'teal';
            arrayBars[barTwoIdx].style.backgroundColor = 'teal';
          }, 100);
        } else if (animation.type === 'swap') {
          const [barOneIdx, barTwoIdx] = animation.indices;
          const [newHeight1, newHeight2] = animation.values;
          
          arrayBars[barOneIdx].style.height = `${newHeight1}px`;
          arrayBars[barTwoIdx].style.height = `${newHeight2}px`;
        } else if (animation.type === 'overwrite') {
          const { index, value } = animation;
          arrayBars[index].style.height = `${value}px`;
        }

        // When we reach the end of all animations, set isSorting to false
        if (i === animations.length - 1) {
          setTimeout(() => {
            setIsSorting(false);
          }, 200);
        }
      }, i * 50);
    }
  }

  // Utility function
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div>
      <Header
        onGenerateArray={generateNewArray}
        onSort={sort}
        onAlgorithmChange={(algo) => setAlgorithm(algo)}
        algorithm={algorithm}
      />
      <ArrayBarContainer array={array} />
    </div>
  );
}

export default Visualization;
