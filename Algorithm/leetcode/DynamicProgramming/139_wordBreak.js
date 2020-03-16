// var wordBreak = function(word,dict){
//   var len = word.length
//   // 定义状态:
//   // 以 dp[i] 代表以 word[0,...,i] 以i结尾的word可否拆空格完全对应上dict上的数字
//   var dp = new Array(len+1).fill(false)
//   // 初始化 
//   dp[0] = true
//   var uniDict = new Set(dict)
//   for(var j = 1; j< len+1;j++){
//     for(var i = 0; i< j;i++){
//       if(dp[i] && uniDict.has(word.substring(i,j+1))){
//         dp[j] = true
//         break
//       }
//     }
//   }
//   return dp[n]
// }

var wordBreak = function(word,dict){
  var len = word.length
  // 定义状态:
  // 以 dp[i] 代表以 word[0,...,i-1] 长度为i的word的子串切割时是否满足字典,
  // 所以结果返回 dp[word.length]， 
  // 但为什么dp[word.length-1]不可以呢，其实是为了适应dp[0] = true 这个初始化而设计的,如果dp[0] 不是等于""就做不到 dp[0] = true
  // 所以只好把这个状态 i 改成代表长度
  //  0 1 2 3 4 5 6 7 8
  //  ''l e e t c o d e
  var dp = new Array(len+1).fill(false) // 
  // 初始化 , dp[0] = true , 网上说 dp[0] = true 说""空字符串是 字典的一部分我至今也搞不懂
  dp[0] = true
  
  var uniDict = new Set(dict)
  for(var j = 1; j< len+1;j++){
    for(var i = 0; i< j;i++){
      // 只是这里不好的地方是存在很多重复步数
      // 所以还有一种方法是不重复的：solve2
      if(dp[i] && uniDict.has(word.substring(i,j))){
        dp[j] = true
        break
      }
    }
  }
  return dp[len]
}

// 这种看起来像是更加省心的方式
var wordBreak = function(word,dict){
  var dp = new Array(word.length+1).fill(false)
  dp[0] = true // 虽然我还是不知道为什么, 只好先记起来
  for(var low = 0; low< word.length;low++){
     for(var str of dict){
       if(!dp[low]) continue
       for(var item of dict){
         var high = low + item.length
         if(high <=word.length && word.substring(low,high) == item){
           dp[high] = true
         }
       }
     }
  }
  return dp[word.length]
}

// 但是这道题本身应该最好理解的方式应该是记忆式递归, 
// 参考视频: https://www.bilibili.com/video/av73514455?from=search&seid=17308265562162998637
// 讲了为什么需要记忆化
var wordBreak = function(word,dict){
  var cache = {}
  var d = new Set(dict)
  return isValid(word,d,cache)
}

var  isValid = function(word,dict,cache){
  var flag = false
  if(word == ""){
    return true
  }
  for(var i = 0; i < word.length;i++){
    if(dict.has(word.substring(0,i+1))){
      flag = flag || isValid(word.substring(i+1),dict,cache)
      if(!flag) cache[s.substring(i+1)] = true  // 避免反复运算，如果不加缓存会导致超时
    }
  }
  return flag
}



// 抛开题目本身, 倒是领悟出好多东西，例如遍历的方式,以下图为例
// "h e l l o"
//  0 1 2 3 4

for(var j= 0; j < len;j++){
  for(var i = j+1; i < len;i++){
    dp[i][j] = s[i][j]
  }
}

//遍历顺序是这样的:
// j = 0 ; i = 1,2,3,4,也就是["he","hel","hell","hello"]
// j = 1;  i = 2,3,4   也就是["el","ell","ello"]
// j = 2;  i = 3,4     也就是["ll","llo"]
// j = 3;  i = 4       也就是["lo"]


// 而另外一种遍历
for(var j = 1; j < len;j++){
  for(var i = 0; i< j;j++){
    dp[i][j] = s[i][j]
  }
}

// j = 1 , i = 0  也就是 ["he"]
// j = 2 , i = 0,1 也就是 ["hel","el"]
// j = 3 , i = 0,1,2 也就是 ["hell","ell","ll"]
// j = 4 , i = 0,1,2,3 也就是 ["hello","ello","llo","lo"]

// 这两种遍历都是10种, 但是执行的轨迹不同。
// 之所以会提起这个,还是因为发现。在遍历过程自己连执行轨迹都没想明白



var arr = [1,2,3,4,5]
arr.reduce((accumulator,currentValue,currentIndex,arr)=>{
    return accumulator+currentValue
})