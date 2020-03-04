// 合并区间, 简单解法.  讲解: https://www.bilibili.com/video/av51692387?p=51
// 简单来讲, 
/**
 *  1.将开始和结束时间分别成一个数组,
    2.然后进行从小到大排序
 *  3. 遍历当前 end[i] 和 start[i+1]
    [1,3],[2,6],[8,10],[15,18]

    1 , 2 , 8 , 15
    3 , 6 , 10, 18
    斜对角之间的比较
 */ 


var merge = function(intervals){
  var len = intervals.length
  var start = new Array(len)
  var end = new Array(len)
  var res = []
  for(let i = 0; i< len;i++){
    start[i] = intervals[i][0]
    end[i] = intervals[i][1]
  }
  start.sort((a,b)=>a-b)
  end.sort((a,b)=>a-b)
  for(var j = 0;j < len;j++){
    var st = start[j]
    while(j+1 < len && end[j] >= start[j+1]) j++
    var en = end[j]
    res.push([st,en])
  }
  return res
}

