// https://www.youtube.com/watch?v=2Yk3Avrzauk 篮子王的题解


/**
 * 
 * 这道题的关键处, 就是将本题和leetcode 85 做联系
 * 将二维的数组变成每行多次求解
 * 例如本题给出的矩阵
 *  [
      ["1","0","1","0","0"],
      ["1","0","1","1","1"],
      ["1","1","1","1","1"],
      ["1","0","0","1","0"]
   ]
   如果转换成直方图，则是
    [1,0,1,0,0]
    [2,0,1,1,1]
    [3,1,1,2,1]
    [4,0,0,3,0]

   转换为四次的heights求解, heights的长度为 col
   
   值得注意的是: 如果该行元素为 "1" 则 heights[col] ++ 
                若为0, 则清空        heights[col] = 0
   
 */
var maximalRectangle = function(matrix) {
    if(matrix === null || matrix.length === 0) return 0

    debugger
    var row = matrix.length
    var col = matrix[0].length
    var heights = new Array()
    for(let i = 0 ;i<col;i++) heights.push(0)
    
    var max = 0
    
    for(var i = 0;i < row;i++){
      for(var j = 0;j < col ;j++){
        if(matrix[i][j] === '1'){
          heights[j]++
        }else{
          heights[j] = 0
        }
      }
      max = Math.max(max,largestRectangleArea(heights))
    }
    return max
};