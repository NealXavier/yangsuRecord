// 单调栈
var trap = function(height){
  var st = []   // 一个单调栈
  var curIndex = 0 // 当前的索引号
  var len = height.length  // 数组的长度
  var res = 0     // 结果集
  while(curIndex < len){
      // 首先栈不能为空 并且 后一个柱子比前一个大时出现凹槽可以储水
      //因为javascript 没有获取栈顶元素的方法,所以通过获取当前数组最后一个元素的方式获取栈顶元素
      while(st.length !== 0 && height[st[st.length - 1]] < height[curIndex]){  // !== 不能写成 !st.length === 0
          // 首先先拿到当前栈顶元素
          var top = st.pop()
          // 然后再看看当前stack是否为空,为空则说明当前元素的前一个没有柱子,跳出逻辑
          if(st.length === 0 ) break
          // 计算柱子水体积
          // 高度: 高度由左右两边矮的决定,再减去top元素 
          var h = Math.min(height[st[st.length - 1]],height[curIndex]) - height[top]
          // 宽度 
          var width = curIndex - st[st.length - 1] - 1
          // 结果集累加
          res+= h*width 
      }
      st.push(curIndex++) // 把当前的索引加入栈内,并且移动指针
  }
  return res
}

