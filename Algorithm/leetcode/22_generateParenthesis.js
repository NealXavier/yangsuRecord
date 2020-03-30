var generateParenthesis = function(n){
  var res = []
  // 顺序为 input 到output 的顺序
  dfsHelper(0,0,n,"",res)
  return res
}

var dfsHelper = function(left,right,n,curr,res){
  // 递归终止
  if(left === right && right === n ){
    res.push(curr)
    return 
  }
  // 会加左括号的情况
  if(left < n) dfsHelper(left+1,right,n,curr+"(",res)
  // 会加右括号的情况  
  if(right < left) dfsHelper(left,right+1,n,curr+")",res)
}
// 最好的办法 ： 还是穷举法, 把所有可能性全部列出来,以左边加左括号的方式,不管是否合法
 // n = 2 
      //               (
      //     ((                               ()
  //   (((         (()                ()(             ())
 // ((((  ((()   (()(     (())     ()((   ()()     ())(   ()))    