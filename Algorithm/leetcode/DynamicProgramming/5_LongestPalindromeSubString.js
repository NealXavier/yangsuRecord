var longestPalindromeSubString = function(str){
  if(str === null || str.length === 0) return s
  var len = str.length
  var start = 0,length = 1
  var dp = new Array(len).fill(0)
  for(let i = 0;i<len;i++) dp[i] = new Array(len).fill(0)

  for(let i = 0;i<len;i++)dp[i][i] = true 
  for(let i = 0;i<len-1;i++){
    if(str[i]===str[i+1]){
      dp[i][i+1] = true
      start = i
      length = 2
    }
  }
  // 这里是有误的,且不好理解
  // for(let i = 3; i <= len;i++){
  //   for(let j = 0; j+1 - i< len;j++){
  //     if(str[j] === str[j-i-1] && dp[j+1][j-i-2]===true){
  //       dp[j][j+i-1] = true
  //       start = j
  //       length = i
  //     }
  //   }
  // }
  return str.subString(start,start+length)
}

// 本题的总结来自于：
// https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/

// 篮子王的视频讲解构造二维矩阵的方式可以学习，但是代码不必学
// 和篮子王的视频讲解
// https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/

// 有几步需要注意:
// 首先什么情况下会想到用动态规划, 篮子王在他的视频里面讲binary search tree那道题上讲过，一旦涉及到问题是 :  
      // 1. 要求你返回数量   2.要求你返回是否时,  一般都会选择动态规划。
// 说到动态规划这么邪门,就是就是高中数学, 数学归纳法。 把问题分解成 ： 最优子问题，反映的形式就是 递推公式
// 
/**
 * 
 * 1. 定义状态: dp[i][j] = 代表 s[i][j]之间是回文子串,至于为什么是二维的,从目前的经验来看,涉及
 *     字符串(例如本题)和棋盘(n皇后问题，自带二维数组特性)都会转化为二维数组。
 * 2. 状态转移方程(递推公式):  怎么将该问题分解成子问题
 * 3. 初始化。 也可以理解成入口。从已知->未知的入口, 而初始化的值就是那个已知。
 * 
 *  角度 1：直接从状态的语义出发；

    角度 2：如果状态的语义不好思考，就考虑“状态转移方程”的边界需要什么样初始化的条件

    角度 3：从“状态转移方程”方程的下标看是否需要多设置一行、一列表示“哨兵”，这样可以避免一些边界的讨论，使得代码变得比较短。

    这三个角度都很重要。
 */

 // 以下的代码是简洁并且好理解的；
 public class Solution {

  public String longestPalindrome(String s) {
      int len = s.length();
      if (len < 2) {
          return s;
      }
      boolean[][] dp = new boolean[len][len];
      // 初始化 i = j 的情况 , 就是斜对角的值,全设为 true
      for (int i = 0; i < len; i++) {
          dp[i][i] = true;
      }
      int maxLen = 1;
      int start = 0;
      for (int j = 1; j < len; j++) {
          for (int i = 0; i < j; i++) {  // s[i,j] 永远保证住 i < j ,为什么没有 等于的case,因为　上面已经初始化
              if (s.charAt(i) == s.charAt(j)) { 
                  if (j - i < 3) {    // 子串是 <=2 的情况下,如果 两边s[i] === s[j]的话,就代表是Palindrone了
                      dp[i][j] = true;
                  } else {
                      dp[i][j] = dp[i + 1][j - 1];  // 递推公式: dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]  
                  }
              } else {
                  dp[i][j] = false;   // 如果不是这两种情况就是 false
              }
              // 只要 dp[i][j] == true 成立，就表示子串 s[i, j] 是回文，此时记录回文长度和起始位置
              if (dp[i][j]) {   // 然后记下来 start 和 end 的索引，非常美妙
                  int curLen = j - i + 1; // 长度是 j - i + 1 这个不要忘记
                  if (curLen > maxLen) {
                      maxLen = curLen;
                      start = i;
                  }
              }
          }
      }
      return s.substring(start, start + maxLen);
  }
}