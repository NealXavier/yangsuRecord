// 题解连接：https://leetcode-cn.com/problems/longest-valid-parentheses/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-7/
// 必须承认，刚开始时的题意理解错了。
// 比如以下测试用例：
// 输入：" ( ) ) ( ( ( ) )"      输出:4
//        0 1 2 3 4 5 6 7         
// 我以为结果应该是 6, 也就是所有有效的 "()" 有多少, 但是本题强调的是"连续", 
// 这里的 4 是来自于  "(())" 也就是索引从 4->7 这个过程
var longestValidParentheses = function(s){
  // 定义状态  dp[i][j] 表示 s[i..j] 是否为有效括号
   var dp = new Array(s.length).fill(0)
   var max = 0
   // 其中 dp[i] 代表 从0..i 之间最长连续的"()" 是多少个
   
   for(var i = 1; i < s.length;i++){
     // 如果 s.charAt(i) === "(" ,dp[i] 直接就是 0
       // 这里肯定是 ) 的情况 , 
       // 这里得分情况 ：
       // 1.1 s.charAt(i-1) === "(" ,这个时候就是  dp[i-2] + 2, 以测试用例的 index = 6 举例dp[6] = dp[4]+2 = 0+2 = 2
       // 1.2 s.charAt(i-1) === ")", 以 index = 7 举例, i - 1 = 6 , dp[6] = 2 ,
       // 但是我们需要找到 (i-1) 组成完整"()"的前一个索引，也就是  dp[i -dp[i-1] - 1]  这就到了 index = 4
      if(s[i] === ')'){
        // j 指的是 dp[i-1] 最前面一个完整"()"的前一个索引位
        var j =  i - dp[i-1] -1
        if(j>=0 && s[j] === '('){
          // i - j +1 代表和 i 和其匹配的 "(" 之间的距离
          // 之所以要加上 dp[j-1] 是需要防 "()(())"  前两位 "()" 的情况
          // 从这里看无时无刻都有对于边界的探讨
          dp[i] = (i-j+1)+((j - 1) >= 0 ? dp[j - 1] : 0);
        }
      }
      max = Math.max(max, dp[i]);
   }
   return max
}