/**
 * leetcode5：最长回文子串 :Longest Palindromic Substring
 * 思想: 如果在一个回文串的两端,对称地加上相同的元素,那么新形成的字符串任然是一个回文串
 * 方法: 使用Dynamic Programming (动态规划)
 * 
 *  解决这种"最优子结构"问题,都可以用"动态规划":
 *  1.定义"状态"
 *  dp[l][r] 表示子串 s[1,r] (包括区间左右端点)是否构成回文串,是一个二维数组。
 *  即如果子串s[l,r] 是回文串,那么dp[l][r] = true
 *  2.找到"状态转移方程"
 *  2-1、当子串只包含一个字符,它一定是回文子串
 *  2-2、当子串包含2个以上字符的时候: 如果s[1,r] 是一个回文串,例如 "abccba"
 *       里面收缩一个字符(如果可以的话)的子串s[l+1,r-1] 也一定是回文串,
 *       即dp[1][r] = true成立,一定有dp[l][r] = true 成立
 *  根据这一点,我们可以之道,给出一个子串s[1,r],如果s[l]!=s[r],那么这个子串
 *  就一定不是回文串。如果s[l] == s[r]成立,就接着判断s[l+1][r-1],
 *  这很像中心扩散法的逆方法。
 *  
 *  事实上,当 s[l] == s[r] 成立的时候,dp[l][r]的值由 dp[l+1][r-1]决定,
 *  这一点也不难思考:当左右边界字符串相等的时候,整个字符串是否是回文就完全由
 *  "原字符串去掉左右边界"的子串是否回文决定。
 *  
 * 但是请注意：这里需要多考虑一点点："原字符串去掉左右边界"的子串的边界情况  
 * 1、当原字符串的元素个数为3个的时候,如果左右边界相等,那么去掉它们以后,只剩下一个字符,
 *    它一定是回文串,故原字符串也一定是回文串。
 * 2、当原字符串的元素个数为2个的时候，如果左右边界相等,那么去掉他们以后,
 * 只剩下0个字符,显然原字符串也一定是回文串。
 *  结合这两种情况就是 s[l+1,r-1] , 整理得 l+1 < r-1 也就是  r-l > 2
 * 
 * 所以状态转移方程为 dp[l,r] = (s[l] == s[r] && (r-l<=2 || dp[l+1][r-1])) 
 */
var longestPalindrome = function(s){
  var len = s.length
  var longestPalindrome = 1
  var longestPalindromeStr = s.subString(0,1)
  var dp = new Array(len)

  // 通过这种方式开辟二维数组
  for(var i = 0;i < len;i++){
    dp[i] = new Array(len)
  }

  
  // l->r 表示 [l...r] 表示索引从l到r的子串; 
  // r 之所以从 1 开始是 r 必须大于 l
  for(var r = 1;r<len;j++){
    for(var l = 0;l<r;l++){
      // if语句里面的主要逻辑有两点:
      // 1、 s[l] === s[r]
      // 2、 dp[l+1][r-1] = true ,代表 s[l+1,...,r-1] 是回文子串
      // 所以 s[l,...,r] 是回文子串
      // r - l < =2  是代表 s[l+1,r-1] 这个索引【不存在】或者 l+1 = r - 1,这中间只有一个字符
      if(s.charAt[l] == s.charAt[r] && (r-l<=2 || dp[l+1][r-1])){
          dp[l][r] = true
          // 实际该字符的长度为: r - l + 1
          if(r-l+1 > longestPalindrome){
            longestPalindrome = r-l+1
            // substring(l,r+1) 代表 索引位置从 [l,r] 
            longestPalindromeStr = s.substring(l,r+1)
          }
      }
    }
  }
  return longestPalindromeStr
}



/**
 * leetcode 5 : Solution 2: 中心扩散法
 */
var longestPalindrome  = function(s){
  // 分为奇数和偶数.但是奇数和偶数的情况可以合并, 给centerOs()传值时,如果是奇数那就 i和j都是同一个值,如果是偶数那就是相邻的值
  // 思路很简单: 将 遍历的 index 为中心,分别向两边扩散, 
  
  // 初始化 longestPalindrome 的长度
  var longestPalindrome = 1
  var longestPalindromeStr = s.substring(0,1)
  var len = s.length
  for(var i = 0;i<len;i++){ // 以每个字符作为 index 
    var longestPalindromeStrOdd = centerOs(s,i,i)  // 分别做以index为中心奇数和偶数是回文串的猜想：
    var longestPalindromeStrEven = centerOs(s,i,i+1)
    var longest = longestPalindromeStrOdd.length > longestPalindromeStrEven.length?longestPalindromeStrOdd:longestPalindromeStrEven
    if(longest.length > longestPalindrome){ 
      longestPalindrome = longest.length
      longestPalindromeStr = longest 
    }
  }
  return longestPalindromeStr
}

var centerOs = function(s,i,j){
  while(i>=0 && j< s.length && s.charAt(i) === s.charAt(j)){
    i--
    j++
  }
  // s.charAt(i) !== s.charAt(j)跳出循环  
  return s.subString(i+1,j)
}