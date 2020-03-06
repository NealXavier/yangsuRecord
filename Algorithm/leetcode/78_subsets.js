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