/**
 *  回溯题三要素:
 *    1. 有效结果
 *    2. 回溯范围及答案更新,也就是调用递归条件的变更
 *    3. 剪枝条件,什么是剪枝。如果能够提前知道这一条分支不能搜索到满意的结果，
 *                          就可以提前结束，这一步操作称之为剪枝。
 *   
 *   将 target 作为树结点。进行自上而下的遍历 
 * 
 *   图示在: https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/
 *   当时我的代码是这样的;
 */
// var combinationSum = function(pos,target){
//   var res = []
//   pos.sort((a,b)=>a-b)
//   backTrack(target,pos,target,[],res)
//   return res
// }

// function backTrack(t,pos,rest,path,res){
//   // 满足条件
//   if(rest === 0){
//     res.push(path.slice()) 
//     return
//   } 

//   for(var i = 0; i < pos.length;i++){
//     // 在数组有序的前提下，剪枝
//     if (rest - pos[i] < 0) break;
//     path.push(pos[i])
//     backTrack(t,pos,rest-pos[i],path,res)
//     path.pop()
//   }
// }

// 测试用例是：
//  [2,3,6,7]
//  7
/**
 *  结果是: 
 *  [[2,2,3],[2,3,2],[3,2,2],[7]]
 *   而结果是:
 *  [[2,2,3],[7]]
 *  其实结果也没错, 只是出现了重复。 
 *  思考为什么会出现重复:
 *  就是因为我没有限制 path数组的只能从小到大,
 *  那怎么样可以保证[2,2,3]是从小到大的.
 *  首先 1. 将数组从小到大排序  
 *      2.将 for loop 的初始化由 var i =0 改为 var i = curIndedx,数组的排序使得index 和 数值的大小挂钩
 */
var combinationSum = function(pos,target){
  var res = []
  pos.sort((a,b)=>a-b)
  backTrack(target,pos,target,[],0,res)
  return res
}

function backTrack(t,pos,rest,path,begin,res){
  // 满足条件
  if(rest === 0){
    res.push(path.slice()) 
    return
  } 

  for(var i = begin; i < pos.length;i++){
    // 在数组有序的前提下，剪枝 
    if (rest - pos[i] < 0) break;
    path.push(pos[i])
    backTrack(t,pos,rest-pos[i],path,i,res)
    path.pop()
  }
}