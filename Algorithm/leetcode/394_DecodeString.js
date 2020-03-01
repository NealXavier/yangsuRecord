// 参考视频:  https://www.youtube.com/watch?v=Qoz3ujccNQY&t=300s
//  "3[a2[c]]"
// 遍历时只有四种结果:  1.数字 2.字符 3. [  4.]
/**
 * 1.如果出现数字,则继续看下一位是否也是数字 方便一次性统计， 然后将 放进 timeSt 这个栈
 * 2.如果出现'[', 左括号, 则有两个作用, 第一:则将 当前tail (也就是记录之前统计好的字符串)放入strSt; 第二:作为一个重新开始统计字符串的开始 
 * 3.如果出现']', 右括号, 开始和 timeSt结合, 开始计算 字符(tmp)和倍数(repeaTime)相乘的结果, 以3[a2[c]]为例,第一次的结果应该是: 3[acc]
 * 4.如果字符串, 则直接 和 tail 拼接
 */
/**
 *  index  value timeSt strSt       tail
 *   0       3     [3]    []         ""
 *   1       a     [3]    ["a"]      ""
 *   2       2     [3,2]  ["a"]      ""
 *   3       c     [3,2]  ["a","c"]  "c"
 *   4       ]     [3]    ["a"]     "acc"
 *   5       ]     []     []         "accaccacc"
 */
var decodeString = function(s){
  var timeSt = [] //
  var strSt = [] // 为了记录[]前面的字符
  var tail = "" // 结果集
  // 遍历出来的四种结果 1.数字 2.字符 3. [  4.]
  for(var i = 0;i < s.length;i++){
    var ch = s[i] 
    if(!isNaN(ch)){
        var num = Number(ch)
        while(i+1 < s.length && (!isNaN(s[i+1]))){
          num = num*10 + Number(s[i+1])
          i++
        }
        timeSt.push(num)
     }else if(ch === '['){
      strSt.push(tail)
      tail = ''
     }else if(ch === ']'){
      var tmp = strSt.pop()
      var repeatTime = timeSt.pop()
      while(repeatTime > 0){
        tmp = tmp.concat(tail)
        repeatTime -- 
      }
      tail = tmp
     }else{
       tail+= ch
     }
  }
  return tail
}