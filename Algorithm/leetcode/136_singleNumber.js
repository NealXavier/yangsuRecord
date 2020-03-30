var singleNumber = function(nums) {
  var res = 0
  for(var i = 0,j = nums.length; i <j;i++){
      res^= nums[i]
  }
  return res
};

// 讲解： https://leetcode-cn.com/problems/single-number/solution/java-wei-yun-suan-bao-dong-hua-ji-by-deep2018530/
// 相同的数异或会得到0，如 a ^ a = 0
// 任何数与0异或都会得到该数,如 a ^ 0 = a
// ((0 ^ a) ^ b) ^ a
// = (a ^ b) ^ a // a ^ 0 = a 任意数与0异或等于任意数
// = (a ^ a) ^ b // 结合律，可以将他们换位置
// = 0 ^ b // a ^ a = 0 任意数与任意数异或等于0（两个相同的数异或等于0）
// = b // a ^ 0 = a
