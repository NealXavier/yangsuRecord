
// 这种解法是我自己写的解法:
// 定义状态： max_profit[n]   代表第n天时股票能获取的最大利润
// 老生常谈的状态转移: 也就是第n天我到底卖还是不卖能赚的更多取当中更大的值 , max_profit[n] = Math.max(max_profit[n-1],prices-min_th[i])
// 而min_th 这个辅助数组只是为了同步截至第n天最低的股价 
// 初始化: min_th[0] = 0 , max_th[0] = 0
var maxProfit =function(prices){
  if(!prices || prices.length ===0) return 0
  // 定义状态:
  var min_th = new Array(prices.length).fill(-1)
  var max_profit = new Array(prices.length).fill(0)
  min_th[0] = prices[0]
  for(var i = 1; i < prices.length;i++){
    min_th[i] = Math.min(min_th[i-1],prices[i])
    max_profit[i] = Math.max(max_profit[i-1],prices[i]-min_th[i])  // 卖还是不卖
  }
  return max_profit[prices.length-1]
}

// 接下来的这种方法,在leetocde上面看到的, 更加有适普性和全局性,但是我这种方法会会更容易想到

var maxProfit = function(prices){
  var len = prices.length
  var dp = new Array(2).fill(0)
  for(let i =0; i <len;i++) dp[i] = new Array(2).fill(0)
  // 定义状态：
  // 此时dp[n][0] , 代表的是截至第n天已经卖光股票时的最大收益,
  // dp[n][1] ,    代表的是截至第n天已经持有股票的最大收益

  // 状态转移方程 : (第n天没有持股票)dp[n][0] = Math.max(dp[n-1][0],dp[n-1][1]+prices[i])  ,dp[n-1][0] 代表"昨天就卖光了,今天无操作", 
  //                                                                                  dp[n-1][1]+prices "今天才卖光"
  //               (第n天还持股票) dp[n][1] = Math.max(dp[n-1][1],dp[n-1][0]-prices[i]) , dp[n-1][1]代表"昨天就持有,今天无操作",
 //                                                                               dp[n-1][0]-prices 代表今天才卖出                                                                                 
      
  // 初始化状态
  // dp[-1][0] = 0 ，还没开市, profit = 0 
  // dp[-1][1] = -Infinity ,还没开市,不可能持有股票

  dp[0][0] = Math.max(dp[-1][0],dp[-1][1]+prices[0])
  dp[0][1] = Math.max(dp[-1][1],dp[-1][0]-prices[0])
  for(var i = 0; i < len;i++){
    if(i === 0){
      dp[0][0] = 0
      dp[0][1] = -prices[0]
    } 
  }
}