// solve 1: 
var largestRectangleArea = function(heights){
  var st = [] // 一个单调栈
  var curIndex = 0 // 当前遍历位置
  var max = 0  // 结果集
  var len = heights.length
  // 先插入是一个高级的做法
  st.push(-1)
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
  // 遍历单调递增栈
  while(st.length >1 ){
    max = Math.max(max,heights[st.pop()] * (heights.length - st[st.length - 1]-1))
  }
  return max
}

// [2,1,5,6,2,3]

// solve 2:
// 具体讲解:  https://blog.csdn.net/Zolewit/article/details/88863970
// 相比于solve1 的好处在于，这个方法会更好理解,并且少了后面二次遍历单调栈的问题
var largestRectangleArea = function(heights){
  var st = [] 
  var max = 0
  var curIndex = 0
  // 这应该是本题最骚之处，通过给heights原数组最后一位增加 0 , 
  // 使得 原数组的 [2,1,5,6,2,3] 都会出栈成功参与最后的运算,
  
  /**
   * 面积: S = h * width,而 h 是固定的就是数组的值, 接着就需要延伸知道到底左右能够延伸多远
   * 而width的宽度: 取决于左右分别距离index[h]最近的元素, 
   * 左边就是这个h所在的索引号在栈中前一位,毕竟维护的是单调递增的栈,右边同理
   *
   */ 
  heights.push(0) 
  while(curIndex < heights.length){
      while(st.length !== 0  && heights[curIndex] < heights[st[st.length - 1]]){
        var top = st[st.length - 1]
        st.pop()
        // 如果st.length 为 0, 若栈为空,就取curIndex 为 width  
        max = Math.max(max,heights[top]*(st.length === 0?curIndex:(curIndex - st[st.length - 1]-1)))
      }
      st.push(curIndex++)
  }
  return max
}