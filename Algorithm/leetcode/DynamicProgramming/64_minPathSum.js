var minPathSum = function(grid){
  // 状态转移
  // dp[m-1][n-1] = Math.max(dp[m-2][n],dp[m][n-2]) + s[m-1][n-1]
  // 初始化, 
  var row = grid.length
  var col = grid[0].length
  
  var dp = new Array(col).fill(0)

  for(let i = 0; i < row;i++) dp[i] = new Array(col).fill(0)

  // 初始化
  for(var i = 0;i < row;i++){
    for(var j = 0;j < col;j++){
      if(i === 0 && j === 0) dp[0][0] = grid[0][0]
      else if(i === 0) dp[i][j] = dp[0][j-1] + grid[i][j]  
      else if(j === 0) dp[i][j] = dp[i-1][0] + grid[i][j]
      else dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]) + grid[i-1][j-1]
    }
  }
  return dp[row-1][col-1]
}