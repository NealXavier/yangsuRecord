var minDistance = function(word1,word2){
  // 定义状态
  // dp[i,j] 代表对于s1的前i个字符和s2的前j个字符，两者的编辑距离
  var dp = new Array(word2.length+1).fill(0)
  // 为什么建立的长度是 dp[word1Len+1][word2Len+1]
  // 如果能把矩阵图画出来的话应该会更清楚
  // 篮子王的视频 画矩阵时可以提现出来https://www.youtube.com/watch?v=Uv9dNpHlSY4&t=541s
  for(let i = 0; i< word1.length+1 ;i++) dp[i] = new Array(word2.length+1)
  
  // 初始化
  for (let i = 0; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= word2.length; j++) {
    dp[0][j] = j;
  }

  // 思考过程来自于: 
  // 问题1：如果 word1[0..i-1] 到 word2[0..j-1] 的变换需要消耗 k 步，那 word1[0..i] 到 word2[0..j] 的变换需要几步呢？
  // 答：先使用 k 步，把 word1[0..i-1] 变换到 word2[0..j-1]，消耗 k 步。再把 word1[i] 改成 word2[j]，
  // 就行了。如果 word1[i] == word2[j]，什么也不用做，一共消耗 k 步，否则需要修改，一共消耗 k + 1 步。

  // 问题2：如果 word1[0..i-1] 到 word2[0..j] 的变换需要消耗 k 步，那 word1[0..i] 到 word2[0..j] 的变换需要消耗几步呢？

  // 答：先经过 k 步，把 word1[0..i-1] 变换到 word2[0..j]，消耗掉 k 步，再把 word1[i] 删除，
  // 这样，word1[0..i] 就完全变成了 word2[0..j] 了。一共 k + 1 步。

  // 问题3：如果 word1[0..i] 到 word2[0..j-1] 的变换需要消耗 k 步，那 word1[0..i] 到 word2[0..j] 的变换需要消耗几步呢？

  // 答：先经过 k 步，把 word1[0..i] 变换成 word2[0..j-1]，消耗掉 k 步，
  // 接下来，再插入一个字符 word2[j], word1[0..i] 就完全变成了 word2[0..j] 了。

  // 还有图片可以参考模拟这个过程 :72_minDistance.png
  
  for(var i = 1; i <= word1.length;i++){
    for(var j = 1;j<=word2.length;j++){
      if(word1[i-1] === word2[j-1]){ // 这个逻辑很绕,dp[i][j] 
                                    // 代表的是 word1[0...i-1] 和 word2[0,...j-1] 
                                    // 之间需要多少次转换,z所以我写成 word1[i] === word2[j]
        dp[i][j] = dp[i-1][j-1]
      }else{
        dp[i][j] = 1+ Math.min(dp[i-1][j],Math.min(dp[i][j-1],dp[i-1][j-1]))
      }   
    }
  }
  return dp[word1.length][word2.length]
}


