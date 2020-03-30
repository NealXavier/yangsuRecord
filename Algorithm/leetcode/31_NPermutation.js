var nextPermutation = function(arr){
  // [1,2,7,4,3,1]
  /**
   * 1. 从后往前数, 1,3,4,7,2, 在 2 那里开始变小, 所以找到交换的那个数(base)    [1,2(base),7,4,3,1]
   * 2. 从后往前找,找出第一个比base大的数,交换                                [1,3(base),7,4,2,1]
   * 3. 交换之后 base 之后 reverse 一下                                      [1,3,1,2,4,7]
   */
  // corner case
  if(arr === null || arr.length === 0 ) return ;
  var len = arr.length
  var i  = len - 2 , j = len - 1;
  while(i >=0 && arr[i] >= arr[i+1] ) i--
  // 找到base
  if(i>=0){
    while(j >=0 && arr[i] >= arr[j]) j-- 
    swap(arr,i,j) 
    while(i<j){
      swap(arr,i,j) 
      i++
      j--
    } 
  }else{
    arr.reverse() 
  }
  return arr
}

function swap(arr,small,big){
  var tmp
  tmp = arr[small]
  arr[small] = arr[big]
  arr[big] = tmp
}