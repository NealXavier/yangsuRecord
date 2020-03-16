var maxProduct = function(nums){
  if(!nums || nums.length === 0) return 0
  var max = nums[0]
  var dp = new Array(nums.length).fill(0)
  dp[i] = nums
  for(var i = 1;i<nums.length;i++){
    dp[i] = Math.max(dp[i-1]*nums[i],nums[i])
    max = Math.max(dp[i],max)
  }
  return max
}


// 直接用暴力法解决
var maxProduct = function(nums){
  if(!nums || nums.length === 0) return 0
  var max = nums[0]
  for(var j = 0; j< nums.length;j++){
    var res = 1
    for(var i = j;i<nums.length;i++){
      res*=nums[i]
      // 分别求出每次求出以i开头的乘积最大
      max = Math.max(res,max)
    }
  }
  return max
}

// 思路和leetcode53 最小连续子串和类似
// 这道题狡猾的地方在于, 如果是 [-1,3,-2,2] 
// 如果沿用 dp[i] = Math.max(dp[i-1]*nums[i],nums[i])
// 在 i = 1 时 dp[1] = 3
// 但在 i = 2 时 dp[2] = 3 
// 但是实际情况应该等于 6 
// 所以应该在登记多一个 dp_min[i] = 代表 以 i 结尾的最小连续乘积用来预防 nums[i]是负数 ,从而会有负负得正导致扑街的结果 
var maxProduct = function(nums){
  if(!nums || nums.length === 0) return 0
  var len = nums.length
  var dp_max = new Array(len).fill(0)
  var dp_min = new Array(len).fill(0)
  var max = nums[0]
  dp_max[0] = nums[0]
  dp_min[0] = nums[0]
  for(var i = 1;i <len;i++){
    dp_min[i] = Math.min(dp_max[i-1]*nums[i],dp_min[i-1]*nums[i],nums[i])
    dp_max[i] = Math.max(dp_max[i-1]*nums[i],dp_min[i-1]*nums[i],nums[i])
    max = Math.max(dp_max[i],max)
  }
  return max
}