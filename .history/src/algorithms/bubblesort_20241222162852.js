export default function bubbleSort(array) {
    const animations = [];
    let arr = array.slice();
    let n = arr.length;
    let swapped;
  
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        animations.push({ type: 'compare', indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          // Swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          animations.push({
            type: 'swap',
            indices: [j, j + 1],
            values: [arr[j], arr[j + 1]],
          });
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    return animations;
  }
  