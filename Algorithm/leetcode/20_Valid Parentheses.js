/**
 * leetcode20: 有效的括号,  stack的经典应用场景
 */
var isValid = function(s) {
  var stack = [] 
  var map = {
    "{":"}",
    "[":"]",
    "(":")"
  }
  // 长度为奇数直接为false
  if(s.length%2!==0) return false
  // 遍历数组,左括号进栈,右括号出栈
  // 是完整括号的前提是一定需要遍历完全
  for(var ch in s){
    if(s[ch] in map) stack.push(s[ch])
    else{
      // 以左括号为key值得到右括号的值, 如果不是直接返回
      if(s[ch] !== map[stack.pop()]) return false
    }
  }
  // if(stack.length){
  //   return false
  // }else{
  //   return true
  // }
  return !stack.length
};