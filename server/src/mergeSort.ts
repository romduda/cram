function merge(leftArr: Array<number | undefined>, rightArr: Array<number | undefined>): Array<number | undefined> {
  let sortedArr: Array<number | undefined> = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] && rightArr[0] && leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr[0]);
      leftArr = leftArr.slice(1)
    } else {
      sortedArr.push(rightArr[0]);
      rightArr = rightArr.slice(1)
      }
    }
  while (leftArr.length) {
    sortedArr.push(leftArr.shift());
  }
  while (rightArr.length) {
    sortedArr.push(rightArr.shift());
  }
  return sortedArr;
}
export default function mergesort(arr: Array<number | undefined>): Array<number | undefined> {
  if (arr.length < 2) {
    return arr; }
  else {
    var midpoint = Math.floor(arr.length / 2);
    var leftArr   = arr.slice(0, midpoint);
    var rightArr  = arr.slice(midpoint, arr.length);
    return merge(mergesort(leftArr), mergesort(rightArr));
  }
}
