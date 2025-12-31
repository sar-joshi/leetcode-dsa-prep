
//     0  1  2  3  4  5  6  7  8  9
const arr = [19,44,51,58,62,75,82,85,88,90]
const target = 82

console.log(binarySearch(arr, target))

function binarySearch(arr, target) {

  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left+right) / 2)

    if (target == arr[mid]) return mid // base case

    if (target > arr[mid]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}