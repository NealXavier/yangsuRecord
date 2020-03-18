var maximalSquare = function(matrix){
  if(!matrix || !matrix[0] || matrix.length === 0 || matrix[0].length === 0) return 0
  var row = matrix.length,  // 行
      col = matrix[0].length //列
  // 定状态 dp[i][j] 代表以martrix[i][j]为右下角时的最大边长
  // 初始化 dp
  var dp = []
  dp.push(new Array(col).fill(0))
  for(var i = 0;i< row-1;i++) dp.push(new Array(col).fill(0))
  // 让成为 row * col 的dp矩阵 
  var res = 0
  for(var i = 0;i< row;i++){
    for(var j = 0; j < col;j++){
       // 初始化状态
       // 将贴边的都设置为和 0 都设置为martrix本身
       if(!i || !j || matrix[i][j] === '0'){
          dp[i][j] = matrix[i][j] -'0'
       }else{ // 执行到这一步代表 martrix[i][j] === '1'

          // 为什么会得到dp[i][j] = Math.min(dp[i-1][j-1],dp[i][j-1],dp[i-1][j-1]) + 1

          // 分别代表"左上","上面",“左面”,
          // 通过分析其实是会得到 dp[i][j]的值是通过它的"左上","上面",“左面”,这三个方向是否为1决定的
          // 并且就是dp最小的那一个, 而且还要 + 1
          dp[i][j] = Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]) + 1
          // res = Math.max(dp[i][j],res)  // 如果写在这个位置 ,测试用例为 [["1"]]会不通过,等于直接跳过了 
       }
       res = Math.max(dp[i][j],res)     // 统计一定要写在这个位置, 不然会有测试用例为 [["1"]]
    } 
  }
  return res*res 
}

// 总结: 说实话这道题看起来还是比较抽象的,重要还是对状态的定义还有状态转移方程的得出，
// 难度主要是在于看出当前 current(i,j) 的 边长大小是会很 "左上","左边","上边"这三个方向共同决定的
// 具体矩阵是怎么画出来的可以参考: http://zxi.mytechroad.com/blog/dynamic-programming/leetcode-221-maximal-square/
// 这上面是会阐述是怎么得出来的.

//  还有关于一点关于状态转移方程的定义应该是(m+1)(n+1)还是 m, n ,
//  毕竟转移方程: Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]) + 1, 是涉及前面的值的,
//  基于前面的题,灵敏的嗅觉，肯定是会排除数组越界的问题
//  
//  以这道题来讲, 如果我写的是 m * n
//  所以我遍历的时候 if(!i || !j || matrix[i][j] === '0') 都是为了先将"贴边"(i === 0|| j ===0)先初始化,
//  这样设置的话的好处是在于: 数组和dp数组是同步的,脑子不会混乱

// 但是如果我写成 (m+1)*(n+1) 时我会这么写,
var dp = new Array(m+1)(n+1)
var res = 0
for(var i = 1;i<=m;i++){
  for(var j = 1;j<=n;j++){
    if(matrix[i-1][j-1] === '1'){
      dp[i][j] = Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]) + 1
      res = Math.max(dp[i][j],res)
    }
  }
}
return res

// 直接写成这样也能通过
// 这么写的好处是在于: 可以不用针对"贴边"元素进行初始化,以防出现索引越界的问题,目的明确只对martrix[i][j] == '1'的情况进行处理
// 麻烦的地方在于不好理解,脑子容易乱。这都是：dp和matrix的索引不同导致
