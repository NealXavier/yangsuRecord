/**          1 -> 1,2 -> 1,2,3
 * [1,2,3]->      1,3
 *           
 *           2 -> 2,3
 *           
 *           3 -> 3
 */
var subsets = function(nums){
  if(!nums || nums.length === 0) return []
  var res = []
  backTrack(nums,0,[],res)
  return res
}

function backTrack(nums,curId,curr,res){
  res.push(curr.slice())  // curr.slice() 这个方法很巧妙, 目的就是为了得到curr的数组的值, 而如果直接 res.push(curr),
                          // 一旦curr的指向变了,就会导致res之前push所有的值都变成相同的了.
  for(var i = curId;i < nums.length;i++){ 
      curr.push(nums[i])   
      backTrack(nums,i+1,curr,res)
      curr.pop()
  }
}
// backtrack　回溯法一定需要在脑子里面模拟dfs的执行过程,其中 solve(nums,i+1,curr,res) 这个递归方式很巧妙,
// 一般很深度遍历相关的问题都可以回溯法,
// 回溯法一般都有几个套路: 基线(就是停止递归的条件),一个全局变量的结果集(res),一个局部结果集(curr),重点在于递归公式。


// https://leetcode-cn.com/problems/subsets/solution/hot-100-78zi-ji-python3-hui-su-liang-chong-jie-ti-/
// 这个答案写得非常好

// 做与不做, 画图
var subsets = function(nums){
  if(!nums || nums.length === 0) return []
  var res = []
  backTrack(nums,0,[],res)
  return res
}
var backTrack = function(nums,curIndex,sol,res){
  if(curIndex === nums.length){
    res.push(sol) 
    return
  } 
  backTrack(nums,curIndex+1,[...sol,nums[curIndex]],res)
  backTrack(nums,curIndex+1,sol,res)
}


var backTrack = function(nums,curIndex,tmp,res){
  // 有效结果,都是有效结果
  res.push(tmp)
  for(var i = curIndex; i < nums.length;i++){
    backTrack(nums,i+1,[...tmp,nums[i]],res)
  }
}

var subsets = function(nums){
  var res = []
  backTrack(nums,0,[],res)
  return res
}



/**
 * ===============================================================================
 */

 // solve2: 位运算
 // 详细解答在: https://blog.csdn.net/gh6267/article/details/88116764

 // 简单解释下:

 /** (nums.length)   A          B             C
  *   0        000 & 001      000 & 010      000 & 100       []   - 都不带
  *   1        001 & 001      001 & 010      001 & 100       [A]  只有第一个数参与& 运算为 1 ，带它
  *   2        010 & 001      010 & 010      010 & 100       [B]  只有第二个数参与& 运算为 1 ，带它
  *   3        011 & 001      011 & 010      011 & 100       [A,B]  A,B 都为1 
  *   4        100 & 001      100 & 010      100 & 100       [C]  
  *   5        101 & 001      101 & 010      101 & 100       [A,C] 
  *   6        110 & 001      110 & 010      110 & 100       [B,C]
  *   7        111 & 001      111 & 010      111 & 100       [A,B,C]
  */

 var subsets = function(nums){
   var res = []  // 最终结果集
   var curr = []  // 局部结果集
   var len = 1 << nums.length     // 子集的个数为 nums.length
  for(var i = 0; i < len;i++){
    for(var j = 0; j < nums.length;j++){
      if(i & (1 << j)){
          curr.push(nums[j])
      }
    }
    res.push(curr.slice())
    curr = []
  } 
   return res
 }