var permute = function(nums){
  var res = []
  pemutation(nums,0,[],res)
  return res
}

var pemutation = function(nums,tmp,visited,res){
    // base line
    if(tmp.length === nums.length){ // 退出条件
      res.push(tmp.slice())  // 拿到的是tmp的值,而不是地址
      return
    }
    for(var i = 0;i < nums.length;i++){
      if(visited.includes(nums[i])) continue  // 遍历之后的剪枝
      tmp.push(nums[i])                       // 我们不一样 
      visited.push(nums[i])
      pemutation(nums,tmp,visited,res)
      tmp.pop()       // 只是把最后一个元素去掉,然后继续遍历
      visited.pop()   // 只是把最后一个元素去掉
    }
}


/**         1 (x)
 *   1 -    2    
 * 
 *   2 -    1 
 *          2 (x)
 */                  




// 有关回溯法的概念的解释： https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/