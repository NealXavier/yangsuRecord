// 非常简单，无话可说
// 分解主问题： dp[i] = dp[i-1]+dp[i-2]
var climbStairs = function(n){
  // 定义状态
  // dp[n] 代表从爬到第n阶有 dp[n]爬法
  var dp = new Array(n+1).fill(0)
  // dp[n] = dp[n-1] + dp[n-2]
  dp[1] = 1
  dp[2] = 2
  for(var i = 3; i <= n.length;i++){
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n.length]
}