export default function quickSort(array) {
    const animations = [];
    let arr = array.slice();
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(arr, left, right, animations) {
    if (left < right) {
      const pivotIndex = partition(arr, left, right, animations);
      quickSortHelper(arr, left, pivotIndex - 1, animations);
      quickSortHelper(arr, pivotIndex + 1, right, animations);
    }
  }
  
  function partition(arr, left, right, animations) {
    let pivot = arr[right];
    let i = left - 1;
  
    for (let j = left; j < right; j++) {
      // Compare
      animations.push({ type: 'compare', indices: [j, right] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // Swap
        animations.push({
          type: 'swap',
          indices: [i, j],
          values: [arr[i], arr[j]],
        });
      }
    }
  
    // Final pivot swap
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    animations.push({
      type: 'swap',
      indices: [i + 1, right],
      values: [arr[i + 1], arr[right]],
    });
  
    return i + 1;
  }
  