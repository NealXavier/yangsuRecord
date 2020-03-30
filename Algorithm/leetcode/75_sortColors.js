var sortColors = function(nums) {
  // [2,0,2,1,1,0]
  return quickSort(nums,0,nums.length- 1)
};

var quickSort = function(nums,left,right){
  if(left >=right) return;
  var pivot = participation(nums,left,right)
  quickSort(nums,left,pivot)
  quickSort(nums,pivot+1,right)
  return nums
}

var participation = function(nums,L,R){
  var i = L,j = R;
  var pivot = nums[L]
  while(i<j){
    while(i<j && nums[j]>=pivot)j--
    nums[i] = nums[j]
    while(i<j && nums[i]<=pivot)i++
    nums[j] = nums[i]
  }
  nums[i] = pivot
  return i
}