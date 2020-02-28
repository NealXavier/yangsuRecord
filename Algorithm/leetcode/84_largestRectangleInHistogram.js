var largestRectangleArea = function(heights){
  var st = [] // 一个单调栈
  var curIndex = 0 // 当前遍历位置
  var max = 0  // 结果集
  var len = heights.length
  // 先插入是一个高级的做法
  st.push(-1)
  debugger
  while(curIndex < len){
    // 在违反单调递增时处理 , 
    while(st.length >1 && heights[st[st.length - 1]] >= heights[curIndex]){ // 
      // 这里发现 heights[peek] === heights[curIndex] 也可以和 heights[peek] >== heights[curIndex]一并处理
      max = Math.max(max,heights[st.pop()] * (curIndex - st[st.length - 1] - 1))
      // 这里 * 的两个数 heights[st.pop()] 和 (curIndex - st[st.length - 1] - 1) 的顺序需要 注意,
      // 肯定是 st.pop 在前 ,它会影响到后面 peak 的值, 而st[st.length - 1] 拿的是将要计算的元素的左侧元素 , 这是第一点
      // 第2点: 以[2,1,5,6,2,3 ] st.push(-1)的意义在于 , 在 curIndex - st[st.length - 1]  
      // 如果 curIndex = 1 时, 左侧元素[2(index= 0)]已经被 pop出去,这时 st为null,  会导致 st[st.length - 1] 为 NaN,这时的Math.max()会为 NaN
    }  
    st.push(curIndex++)
  }
  // 
  while(st.length >1 ){
    max = Math.max(max,heights[st.pop()] * (heights.length - st[st.length - 1]-1))
  }
  return max
}

// [2,1,5,6,2,3]