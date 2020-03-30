/**
 * PS:
 *    原来以为跨过了递归的大坑，但是还是发觉自己的思维还是太嫩了,这道题使用的事BFS 深度优先算法,其实就是递归,想起了以前数学学习
 *    的排列组合,就是全排列的题目,发现要把它写出来还是有点难的，有点想当然,自己动笔的时候被一个很小的坑想了很久.
 *    还有，得想好一些简单的数据结构的遍历方式. 最后要说,如果遍历的条件想不起清除的话,还是应该用笔一点点算出来,层级不要太深,碰到
 *    重复的,就是递归的部分。 除此之外, base case 也就是出口一定要想清楚, 【返回类型是什么, 返回条件是什么】这点需要想清楚
 *  
 * leetcode 17: Letter Combinations of a Phone Number : 
 * 打算用深度优先算法(DFS):
 * 找到 base case  1、if(index === digest.length) 还是 if(index === digest.length - 1) 这点需要想清楚; 
 *                2、还有需要return 什么; 应该是什么数组结构
 * 
 *    有坑：// dfsHelper(digits,map,index+1,curStr+=item[chIndex],res) 还是 // curStr+item[chIndex] 这点我想了很久
 *         // 犯了很简单的错误
 *         // 后来发现 curStr+=item[chIndex] 使得我的 curStr 被发生改变了, 导致 cuStr 不停叠加, 变成下面的样子
 *        //  ["ad","ade","adef","abd","abde","abdef","abcd","abcde","abcdef"] 
 */
// var letterCombinations = function(digits) {
//   if(digits.length === 0) return [] 
//   var map = new Map()
//   map.set('0','')  
//   map.set('1','')  
//   map.set('2',"abc")  
//   map.set('3',"def")  
//   map.set('4',"ghi")  
//   map.set('5',"jkl")  
//   map.set('6',"mno")  
//   map.set('7',"pqrs")  
//   map.set('8',"tuv")  
//   map.set('9',"wxyz")
  
//   var res = []
//   var curStr = ""
//   /**
//    * 
//    * @param {string} digits 数字字符串
//    * @param {number} map 每个数字所对应的字符串
//    * @param {Map} index 当前数字字符索引
//    * @param {string} curStr 中间字符串
//    * @param {Array} res 结果集和
//    */
//   dfsHelper(digits,map,0,curStr,res)
//   return res
// }; 

// var dfsHelper = function(digits,map,index,curStr,res){
// // base case
// // debugger
// if(index === digits.length){
//   res.push(curStr)
//   return
// }
// var item = map.get(digits[index])
// for(var chIndex in item){
// dfsHelper(digits,map,index+1,curStr+item[chIndex],res)
// // dfsHelper(digits,map,index+1,curStr+=item[chIndex],res)
// }
// }
/**
 * 采用迭代的方式： 就是BFC广度优先算法; 
 * 想了想这个curArr存在的必要性在于: 
 * 如果直接使用 res.push(res[index]+item[j]) 就会导致 res 数组无数增长;陷入死循环 
 * curArr用来记住每一层树遍历的结果; 
 *   
 */
// var letterCombinations = function(digits){
//   var arr = ["","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"]
//   if(digits.length ===0) return []
//   var res = []
//   res.push('')
//   for(var i = 0;i<digits.length;i++){ // "23"
//     var item = arr[digits[i]]   // abc  def  ("a"+"d") ("a+e") ("a+f") ("b+d") ("b+e") ("b+f") ("c+d") ("c+e") ("c+f")
//     var curArr = []
//     for(var j = 0;j<item.length;j++){
//       for(var x=0;x<res.length;x++){
//         curArr.push(res[x]+item[j]) 
//       }
//     }
//     res = curArr
//   }
//   return res
// }

// var letterCombination = function(digits){
//   var res = []
//   res.push('')
//   for(var i = 0;i<digits.length;i++){
//       var item = digits[i]
//       var len = res.length
//       for(var j = 0;j < len ;j++){
//         var tmp = res.unshift()
//         for(var z = 0;z < item.length ;z++){
//             res.push(tmp+item[z])  
//         }
//       }
//   }
//   return res
// }