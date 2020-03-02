// 贪心算法,解法
// 假设 [2,3,1,1,4] 这个数组
/**
 * 描述一下这个思考过程
 * 用 reach 描述最远可以到达的index 
 *  index = 0 时， 可以到达 1(3) , 2(1)  ,最远 reach = 2  
 *  index = 1 时,  可以到达 2(1) , 3(1)  ,最远 reach = 3
 *  index = 2 时,  可以到达 3(1)         ,最远 reach = 3
 *  index = 3 时 , 可以到达 4(4)         ,最远 reach = 4 === nums.length   返回:true
 * 
 * === 在此需要注意的是:
 *  此时遍历的关键是 下一个 index 一定要比 前一个数的 reach 要小, 不然 相当于 中间有"坑" ,跨不过去就视为 无效 false 
 */
var canJump = function(nums){
  if(nums.length < 2) return true
  var reach = nums[0]
  for(var i = 1 ; i < nums.length && i <= reach;i++){
    reach = Math.max(i+nums[i],reach)
    if(reach >= nums.length) return true
  }
  return false
}

// 还有另外一种解法, 其实也是同样的思路,只不过会更简洁
//  i > max 就是将上面所谓的 当前的index 和 上一个index 的max(i+nums[i]) 相比, 如果 i > index 大,则说明有坑,就是false
var canJump = function(nums){
  var canMax = 0
  for(var i = 0; i< nums.length;i++){
    if(i > canMax) return false
    canMax = Math.max(canMax,i+nums[i])
  }
  return true
}