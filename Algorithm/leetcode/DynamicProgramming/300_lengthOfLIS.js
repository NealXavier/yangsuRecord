// 本题求的是最长递增子序列: 需要注意的是子序列和子串是不同过的，后者需要连续，but前者不需要 

// solve1: 思路很容易可以判断出来
// 时间复杂度 n^2
var lengthOfLIS = function(nums){
  var dp = new Array(nums.length).fill(1)
  var n = nums.length
  for(var i = 1;i < n;i++){
    for(var j = 0;j <=i ;j++){
      if(nums[i]>=nums[j]){
        dp[i] = Math.max(dp[j]+1,dp[i])
      }
    }
  }
  return dp[n - 1]
}

// 二分法: 说这里的是动态规划好像有点牵强
// 就只是普通的二分查找而已,其中二分查找的公式还是应该背下来的
// 这里当时想直接抄
var lengthOfLIS = function(nums) {
  let n = nums.length;
  if(n <= 1){
      return n;
  }
  // 这里tail 数组代表的是:tails[k] 的值代表 长度为 k+1 的子序列尾部元素的值
  // tail 代表的就是这个最长的子序列
  // 解释来自于: https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-dong-tai-gui-hua-2/
  let tail = new Array(n); 
  tail[0] = nums[0];
  let end = 0;
  for(let i = 1;i < n;i++){
      if(nums[i] > tail[end]){  // 如果cur > tail[end] 时就直接插入这个数组 tail
          end++;
          tail[end] = nums[i];
      }else{            // 如果不是就需要将nums[i] 替换tail 数组中众多比nums[i]大的最小的那一个数, 二分查找是把n->logN的 
          let left = 0;
          let right = end;
          let mid = Infinity
          // 常规中的二分查找, 这个模板应该记起来的。
          while(left <= right){
              // let mid = left + ((right - left) >> 1);  
              mid = left+right >> 1
              if(tail[mid] < nums[i]){
                  left = mid + 1;
              }else{
                  right = mid - 1;
              }
          }
          // 当 lo === hi, 指向的是比nums[i]大的数中最小的那一个 
          tail[left] = nums[i];
      }
  }
  return end + 1;
};