var uniquePaths = function(m,n){
  // 定义状态: dp[i][j]   代表 走 (i,j) 的路径, 那么状态转移方程就确定了 dp[i][j] = dp[i-1][j] + dp[i][j-1]
  // 这道题比较可惜的是: 初始化时分析错了, 
  // 我的初始化是这样的 dp[0][1] = 1,dp[1][0] =1 忽略了其他情况
  var dp = new Array(n).fill(0)
  for(let i = 0; i < m;i++) dp[i] = new Array(n).fill(0)
  
  for(var i = 0; i < m;i++){
    for(var j = 0; j < n;j++){
      // 初始化  
      if(i ===0 || j===0) dp[i][j] = 1
      else dp[i][j] = dp[i-1][j] + dp[i][j-1]
    }
  }
  return dp[m-1][n-1]
}