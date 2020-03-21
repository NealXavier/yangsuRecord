// 本题第一时间还是会想到 dfs,
// 事实上也是这么做的
// dfs 三部曲
// 1. 递归条件   dfsHelper((n-i*i)+1)
// 2. base case  n === 0 
// 3.剪枝     没有
// 但是如果是单纯的递归,不是本题想要的. 这题考察的实际上是dp,但是dp的递推公式
// 看起来就很没有说服力,正常情况下应该想不到。
// 因此通过记忆化+递归的方式来解决。  
// 记忆化主要是用 map的key->value 的方式用来记录已经遍历过的结果用来节省时间
// 也就是 solve2 的做法:
var numSquares = function(n){
  return dfsHelper(n)
}
var dfsHelper = function(n){
  if(n === 0) return 0 
  var count = Infinity
  for(var i = 1;i*i < n;i++){
    count = Math.min(count,dfsHelper(n-i*i)+1)
  }
  return count
}

// solve2:记忆化递归
var numSquares = function(n){
  var visited = new Map()
  return dfsHelper(n,visited)
}
var dfsHelper = function(n,map){
  if(visited.has(n)) return visited.get(n)
  if(n === 0) return 0 
  var count = Infinity    // count = Infinity 的位置应该在哪
  for(var i = 1;i*i <= n;i++){
    // count = Infinity 如果写在这里是找不到的
    count = Math.min(count,dfsHelper(n-i*i,visited)+1)
  }
  visited.set(n,count)
  return count
}

// 其实这道题用bfs的速度说不定会更快,毕竟纵深太长，
// 思路是来自与: 
// 这道题我没想过也能转化为
// bfs 
var numSquares = function(n){
  // 每次的元素不能重复
  var visited = new Set()
  var queue = [n]
  var level = 0

  // 1. 要有队列, 不满足时return -1
  // 2. set 不重复元素
  // 3. 找出 base case
  // 4. for(var i = 0;i<queue.length;i++){
  //     for(var j = ... )
  // }  这是基本套用公式
  // 
  while(queue.length !== 0){
    level++
    var size = queue.length
    for(var i = 0;i < size;i++){
      var cur = queue.shift()
      for(var j = 1; j*j <= cur;j++){
        var next = cur - j*j
        // base case

        if(next === 0) return level

        if(!visited.has(next)){
            queue.push(next)
            visited.add(next)
        }
      }
    }
  }
  return -1
}

// 这个是通过记忆化+递归的方式, 颠倒过来得到dp的状态转移为 :
// dp[i] = Math.min(dp[i-j*j]+1,dp[i])
var numSquares = function(n){
  var dp = new Array(n+1).fill(Infinity)
  dp[0] = 0
  for(var i = 1;i <= n;i++){
    for(var j = 1;j*j<= i;j++){
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n]
}