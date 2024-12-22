export default function mergeSort(array) {
    const animations = [];
    const auxArray = array.slice();
  
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations) {
    if (startIdx >= endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, midIdx, mainArray, animations);
    mergeSortHelper(auxArray, midIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, midIdx, endIdx, auxArray, animations);
  }
  
  function doMerge(mainArray, startIdx, midIdx, endIdx, auxArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = midIdx + 1;
  
    while (i <= midIdx && j <= endIdx) {
      // Compare
      animations.push({ type: 'compare', indices: [i, j] });
      if (auxArray[i] <= auxArray[j]) {
        // Overwrite
        animations.push({
          type: 'overwrite',
          index: k,
          value: auxArray[i],
        });
        mainArray[k++] = auxArray[i++];
      } else {
        animations.push({
          type: 'overwrite',
          index: k,
          value: auxArray[j],
        });
        mainArray[k++] = auxArray[j++];
      }
    }
  
    // Copy remaining left side
    while (i <= midIdx) {
      animations.push({ type: 'compare', indices: [i, i] });
      animations.push({ type: 'overwrite', index: k, value: auxArray[i] });
      mainArray[k++] = auxArray[i++];
    }
  
    // Copy remaining right side
    while (j <= endIdx) {
      animations.push({ type: 'compare', indices: [j, j] });
      animations.push({ type: 'overwrite', index: k, value: auxArray[j] });
      mainArray[k++] = auxArray[j++];
    }
  }
  