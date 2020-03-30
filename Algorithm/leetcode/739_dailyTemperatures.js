/**
 * 由题意得, 为了获得一个最近的温度比当前更高的索引数 ,
 *  
 * 转化为单调栈的逻辑就是: 维护一个单调递减的栈,
 * 
 * 结果是一个 长度为 T.length 的数组。
 * 
 * 如果 T[curIndex] > T[st.top()] , top 准备出栈 , 通过 curIndex - st.pop() 得到索引号, 也是结果集的元素
 * 
 * 然后继续遍历到 T[curIndex] < T[st.top()] 时, 就可以进栈 , 当前要排除 st 为 空时情况
 * 
 * 这里值得注意的是: js是没有初始化的过程,所以需要手动初始化
 * 
 */
var dailyTemperatures = function(T){
  var len = T.length
  var deSt =  []
  var res = []
  for(var i = 0; i < len;i++) res.push(0)

  for(var i = 0; i < len ;i++){
    if(deSt.length === 0 || T[deSt[deSt.length-1]] >= T[i]){
      deSt.push(i)
    }else{
      while(deSt.length !== 0 && T[i] >= T[deSt[deSt.length - 1]]){
        var top = deSt.pop()
        res[top] = i - top
      }
      deSt.push(i)
    }
  }
  return res;
}