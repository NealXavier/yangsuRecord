// 题目讲解: https://www.bilibili.com/video/av53982318?from=search&seid=16413291298012766309
var exist = function(word,board){
  // 还是采用回溯法
  var rLen = board.length,
      cLen = board[0].length;
  var visited = new Array(rLen).fill(0)
  visited = visited.map((item,index)=> item = new Array(cLen).fill(0))
  // 找到word的第一个字母
  for(var i = 0; i < rLen;i++){
    for(var j = 0; j < cLen;j++){
      if(word.charAt(0) === board[i][j]){
        if(dfsHelper(word,board,i,j,0,visited)) 
          return true
      }
    }
  }
  return false
}

function dfsHelper(word,board,row,col,index,visited){
  if(index === word.length) return true 
  // 下面两段句不能调换位置,不然会出现数组越界的问题
  if(row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false
  if(board[row][col] !== word[index]) return false
  // 已经浏览过
  if(visited[row][col]) return false

  // 上面都属于不符合要求的情况

  // visited 表示该坐标已经被遍历过
  visited[row][col] = true
  
  // 顺序为右,下,上，左
  if(dfsHelper(word,board,row,col+1,index+1,visited) 
              || dfsHelper(word,board,row+1,col,index+1,visited) 
              || dfsHelper(word,board,row-1,col,index+1,visited) 
              || dfsHelper(word,board,row,col-1,index+1,visited)) 
              return true
  // 下一句一定记得, 代表 word 的首字母重新找过,所以代表 visited 要重新记过,一定要记得置为 false 代表可以重新被遍历  
  // 这个细节很重要     
  visited[row][col] = false
  return false
}