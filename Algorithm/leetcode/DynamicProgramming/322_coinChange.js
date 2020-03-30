var coinChange = function(coins,amount){
  var dp = new Array(amount+1).fill(amount+1)
  dp[0] = 0
  for(var i = 1; i <=amount;i++){
    for(coin of coins){
      if(i - coin>=0 && dp[i-coin]<=amount){
        dp[i] = Math.min(dp[i],dp[i - coin]+1)
      }
    }
  }
  if(dp[amount] === amount+1){
    dp[amount] = -1
  }
  return dp[amount]
}

var coinChange = function(coins,amount){
  var dp = new Array(coins.length+1).fill(0)
  for(let i = 0;i <= coins.length;i++){
    dp[i] = new Array(amount+1).fill(amount+1)
  }

  // 第一列初始化
  for(let i=0;i<=coins.length;i++) dp[i][0] = 0

  for(let i = 1;i<=coins.length;i++){
    for(let j = 1;j <= amount;j++){
      if(j - coins[i-1] >=0){
        dp[i][j] = Math.min(dp[i-1][j],dp[i][j-coins[i-1]]+1)
        // console.log("dp["+ i +"]["+j+"]="+dp[i][j])
      }else{
          dp[i][j] = dp[i-1][j]
      }
    }
  }
  // 根本凑不出来
  if(dp[coins.length][amount]>=amount+1) return -1
  return dp[coins.length][amount]
}



var coinChange = function(coins,amount){
  // 1,2,5
  var dp = new Array(amount+1).fill(amount+1)
  dp[0] = 0
  for(coin of coins){
    for(var i = 0;i<=amount;i++){
      if(i >= coin){
        dp[i] = Math.min(dp[i],dp[i-coin]+1)
      } 
     }
  }
  if(dp[amount] === amount+1) return -1
  return dp[amount]
}


// bfs : 
var coinChange = function(coins,amount){
  if(amount ===0) return 0   // base case : 当target为 0 时，肯定为 0 
  var level = 0
  var queue = [amount]
  var visited = new Set()
  while(queue.length !== 0){
    level++
    var size = queue.length
    for(let i = 0;i<size;i++){
      var target = queue.shift()
      for(coin of coins){
        var tail = target - coin 
        if(tail === 0) return level
        if(tail > 0 &&  !visited.has(tail)){
          queue.push(tail)
          visited.add(tail)
        }
      }
    }
  }
  return -1
}



// dfs + greedy + pruning
// https://zxi.mytechroad.com/blog/dynamic-programming/leetcode-322-coin-change/
// 图示在这以上
// 1.1描述一下这个遍历过程
// 先用贪心角度, 将 coins 从大到小排序, 把大的值放在前面比较
// base case 出口 : 1. amount === 0 代表已经能找到了, 将获取的值保存在res上
//                  2. coins.length === cidx, cidx代表层数，层数也和coins的数量对应起来,这个代表所以coins的已经遍历完了
// 1.2递归条件:
// amount,count,cidx , cidx 代表纵深, amount代表当前的币值, count 代表数量
// 需要记录的状态: count , cidx ,amount 这三个值, 
// 值得注意的是: 将change 写成内部类是一个挺无奈的对策, 全局需要用到 res, 但是递归又不需要它,如果写成外部函数,
// 每次Math.min(count,res)保存下来的值都会被冲掉,这是不希望看到的。但是这会影响到程序的可读性。
// 1.3 剪枝: 在 count + i > res 已经没有计算下去的必要了
// 1.4 Math.floor(amount/coin) 将数字整数化
var coinChange = function(coins,amount){
  var res = Infinity
  coins.sort((a,b)=>b-a)
  change(amount,0,0)
  return res === Infinity?-1:res

  // 内部调用函数类
  function change(amount,count,cidx){
    // base case
    if(amount === 0){
      res = Math.min(count,res)
      return 
    }
    if(coins.length === cidx) return
  
    let coin = coins[cidx]
  
    for(let i = Math.floor(amount/coin);i>=0;i--){
      if(count+i > res) break // 剪枝
      change(amount-(i*coin),count+i,cidx+1)
    }
  }
}




