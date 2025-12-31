
//     0  1  2  3  4  5  6  7  8  9
const arr = [19,44,51,58,62,75,82,85,88,90]
const target = 82

console.log(binarySearch(arr, target))

function searchRecursive(arr, target, left, right) {
  // base case 1: invalid search space
  if (left > right) return -1

  const mid = Math.floor((left+right) / 2)

  // base case 2: found the elem
  if (arr[mid] == target) return mid

  // recursive case 1: search right half
  if (target > arr[mid]) {
    return searchRecursive(arr, target, mid+1, right)
  }
  // recursive case 2: search left half
  else {
    return searchRecursive(arr, target, left, mid-1)
  }
}

function binarySearch(arr, target) {
  return searchRecursive(arr, target, 0, arr.length-1)
}