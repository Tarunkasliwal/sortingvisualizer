export default function heapSort(array) {
    const animations = [];
    let arr = array.slice();
    let n = arr.length;
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, animations);
    }
  
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Swap root with end
      animations.push({
        type: 'swap',
        indices: [0, i],
        values: [arr[i], arr[0]],
      });
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0, animations);
    }
  
    return animations;
  }
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    // Compare left child
    if (left < n) {
      animations.push({ type: 'compare', indices: [left, largest] });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    // Compare right child
    if (right < n) {
      animations.push({ type: 'compare', indices: [right, largest] });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
  
    if (largest !== i) {
      animations.push({
        type: 'swap',
        indices: [i, largest],
        values: [arr[largest], arr[i]],
      });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest, animations);
    }
  }
  