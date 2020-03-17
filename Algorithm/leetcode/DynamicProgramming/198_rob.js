var rob = function(nums) {
  // 本题如果用dp是很容易的,
  // 定义状态: dp[n] 代表在经过第n-1个房间时可以获得的最多的钱
  var dp = new Array(nums.length).fill(0)
  // 初始化
  dp[0] = nums[0]
  dp[1] = Math.max(nums[1],nums[0])
  for(var i = 2;i<nums.length;i++){
    // 转移方程: 拿不拿第n-1个房间的钱,如果不拿:dp[i-1],如果拿 dp[i-2]+nums[i]
    dp[i] = Math.max(dp[i-2]+nums[i],dp[i-1])
  }
  return dp[nums.length-1]
}