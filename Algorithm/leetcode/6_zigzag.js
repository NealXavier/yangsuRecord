/**
 * leetcode 6 : zigzag
 * 思路：这道题不涉及什么高深的算法,应该是我第一道答案就大概知道是什么意思的题; 
 * 首先定义维护一个一维数组(numRows): 你可以理解为是 numRows行, 每行存放的都是字符串
 * 然后将 str 拆分成 ： => chs 字符数组  chs = str.split('') , str的长度作为外层循环
 * 然后来到本题最重要的一点: "reverse" 标志着: arr[i](i<numRows) 到底是是需要往上走还是往下走
 */

var convert = function(s,numRows){
  if(numRows<=1) return s
  var reverse = false
  var arr = new Array(numRows)
  var ret = ""
  for(var i = 0;i<arr.length;i++) arr[i] = ''
  var ioc = 0
  var chs = s.split('')
  for(var j = 0;j<s.length;j++){
    arr[ioc] += chs[j]
    // ioc 表示着现在第几行, 如果是最上面(ioc===0) 就需要往下走(ioc+1); 如果是最底下(ioc===numRows-1)则需要往上走(ioc-1)
    if(ioc === 0 || ioc === numRows-1) reverse = !reverse
    ioc += reverse? 1:-1
  }
  for(var z=0;z<arr.length;z++) ret+=arr[z]
  return ret
}