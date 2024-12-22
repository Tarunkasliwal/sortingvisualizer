export function bubbleSort(array) {
    const animations = [];
    let arr = array.slice();
    let n = arr.length;
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        // Push current pair indices for comparison
        animations.push({ type: 'compare', indices: [j, j+1] });
        
        if (arr[j] > arr[j + 1]) {
          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
          
          // Push swap animation
          animations.push({ type: 'swap', indices: [j, j+1], values: [arr[j], arr[j+1]] });
        }
      }
      if (!swapped) break;
    }
    return animations;
  }
  