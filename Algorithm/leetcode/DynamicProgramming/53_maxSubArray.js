var maxSubArray = function(nums){
  // 如果用动态规划法的话，那就不排序
  //  [-2,1,-3,4,-1,2,1,-5,4],
  // 回归一维数组选或不选的问题
  // 定义状态： 以dp[i]代表以i结尾的最大序列和
  // 递推公式： dp[i] = Math.max(dp[i-1],s[i])
  // 初始化: dp[0] = s[i]
  var max = 0
  for(var i = 1; i < s.length;i++){
    dp[i] = Math.max(dp[i-1]+nums[i],nums[i])
    max = Math.max(dp[i],max)
  }
  return max
}