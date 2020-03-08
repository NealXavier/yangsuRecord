// 理论就是如下：
// 就是把数字都作为二进制处理，每个二进制位上的n个bit相加看是否大于n/2，
// 大于的话这一位上是1，小于的话就是0，把32位都这么处理完就知道结果是多少了。

//借鉴了下面两个解答的结果:
// 其中第二个会更直观一点:
/**
 *   (n &&　(1<<i)) 和  (n>>i&1)==1) 都是表达 n这个数字和第i位的1 进行 & 运算是否为1, 
 *   如果是的话就统计起来,然后将这一"列" 中的"1"统计起来,看是否会超过nums.length的一半
 *   如果会的话,这一列上的"1" 将会被结果统计起来
 *   运用位运算的写法就是 major|= mask ,运用我们正常理解的写法就是 major += (1<<i),都是同种意思。
 * 
 */

var majorityElement = function(nums){
  // 位运算 
  
  var res = 0
  for(var i = 0; i< 32 ;i++){
      var mask = 1<<i
      var count = 0
      for(var n of nums){
        if(n & mask) count++
      }
      if(count > (nums.length)/2) res |=mask
  }
  return res
} 


// public int majorityElement(int[] nums) {
//   int major = 0;
//   for(int i = 0; i < 32; i++){ 
//       int mask = 1 << i;
//       int count = 0;
//       for(int num : nums) if( (num&mask) != 0)
//           count++;
//       if(count > nums.length/2)
//           major |= mask;
//   }
//   return major;
// }


// int majorityElement(vector<int>& nums) {
//   int i,j,count,major=0;
//   for(i=0;i<32;i++)
//   {
//       for(j=0,count=0;j<nums.size();j++)
//       {
//           if((nums[j]>>i&1)==1)
//               count++;
//       }
//       if(count>nums.size()/2)
//           major+=(1<<i);
//   }
//   return major;
// }

