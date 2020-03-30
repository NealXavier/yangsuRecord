/**
 * leetcode3 : 最长不重复子串的长度
 * 1.检查map是否存在当前的字符,如果存在: 更新Pointer位置 ; 这里的Pointer是用来规定字符串的[start]索引
 * 2.计算max
 * 3.更新map
 * 
 * point --> 3 
 * index --> 6,p
 * max   --> index - pointer +1 =  
 */
var lengthOfLongestSubstring = function(s) {
    var arr = s.split("")
    if(arr.length === 0) return 0
    var map = new Map()
    var point = 0
    var maxLen = 1
    for(var i = 0;i<arr.length;i++){
        if(map.has(arr[i])){
          // point = i: 会这么写因为我以为是当字典存在时,会把point移动到当前索引
          // 但实际上不是的,以下面的字符串举例
          // asdwodjhy
          // 012345678
          // 当index来到(d=>5)时,之前的字典应该是这样的: {a:0,s:1,d:2,w:3}
          // 这时候的point应该指向: (get(d)+1);然后字典应该改成{d:5}
          point = Math.max(map.get(arr[i])+1,point)

          // 然后来到了这一道题最需要注意的地方
          // pwwkewp 
          // 0123456
          // 当index到最后一位 p , point这时是在"k"上,也就是 point = 3
          // 如果按照上面的规则,指向p时,point = map.get(arr[i])+1,这时的 {p:0}
          // 按照道理, point = 1,
          // 但是请注意, 字符串的左侧已经从"w"开始, point不能往回走,这里的point,
          // 一定需要用 Math.max 函数取大的那个:所以point = Math.max(map.get(arr[i]+1),point)才是精髓
        }
	      map.set(arr[i],i)
        maxLen = Math.max(i-point+1,maxLen)
   }
    return maxLen  
};