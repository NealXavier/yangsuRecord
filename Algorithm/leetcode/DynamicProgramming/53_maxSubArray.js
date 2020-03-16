var maxSubArray = function(nums){
  // 如果用动态规划法的话，那就不排序
  //  [-2,1,-3,4,-1,2,1,-5,4],
  // 回归一维数组选或不选的问题
  // 定义状态： 以dp[i]代表以i结尾的最大序列和
  // 递推公式： dp[i] = Math.max(dp[i-1],s[i])
  // 初始化: dp[0] = s[i]
  // 定状态: dp[i] 结尾的最大连续子串
  var max = nums[0]
  dp[0]  = nums[0]  // 初始化其实很容易想到 ,　以首字母结尾最大的子串肯定是它本身
  for(var i = 1; i < nums.length;i++){
    // 其实就是选和不选的问题
    // 如果 dp[i-1] <0 , 那么 nums[i] 就是以 i结尾时最大的值
    // 反之就是 dp[i-1]+nums[i]
    // 如果觉得下列写法比较抽象,
    // dp[i] = Math.max(dp[i-1]+nums[i],nums[i])
    // 还可以这么写 
    if(dp[i-1]<0){
      dp[i] = nums[i]
    }else{
      dp[i] = dp[i-1]+nums[i]
    }
    max = Math.max(dp[i],max)
  }
  return max
}

// 想想看想要列举出所有的可能性好像也不容易
// 突发奇想,用了一下暴力法,列举了所有的子串可能性
// 但是N^3 的时间复杂度导致超时
var maxSubArray = function(nums) {
  var res = nums[0]
  var len = nums.length
  // 暴力法
  for(var i = 0; i <len ;i++){
      for(var j = 0;j<=i;j++){
          res = Math.max(maxArray(nums,j,i),res)
      }
  }
  return res
};

function maxArray(nums,left,right){
  var res = 0
  for(var i = left; i<=right;i++){
      res+=nums[i]
  }
  return res
}


// 所以就有了下面这一种解法
var maxSubArray =function(nums){
  var len = nums.length
  var max = nums[0]
  for(var j = 0;j<len;j++){
    var sum = 0
    for(var i = j; i <len;i++){
      sum+=nums[i]  
      max = Math.max(sum,max)    // 分别求出以 i 开头到结尾的最大子串
                                 // 分别求出以 i+1 开头到结尾的最大子串
                                // ... 
    }
    // 成功压缩到o(n^2)
  }
  return max
}
