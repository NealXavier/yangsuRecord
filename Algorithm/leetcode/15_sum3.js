/**
 *leetod 15: sum3  a+b+c
 * 
 * 思路：
 *  考虑先把数组先排好序
 *  然后可以参考 上面maxArea的写法: 现在有三个数 a , b , c 
 *  如果选定 a , 然后b 从(a +1) 遍历, c从(str.length-1) 开始遍历, 
 *  a+b+c 会出现三种情况
 *  1、a+b+c > 0
 *      在a 不变的情况下: 那么需要减小 b + c 的值,  那么b只会越来越大, 那就减少 c 的索引 
 *  2、a+b+c < 0
 *      在a 不变的情况下: 那么需要增大 b + c 的值,  那么c只会越来越小, 那就增大 b 的索引 
 *  3、a+b+c = 0
 *      说明找到了,这时应该同时【增加 b 的索引】  和 【减少 c的索引】
 *      [-1,-1,-1,0,2,2]
 *      ps:需要注意;假如是上面这种情况
 *     a = -1 , b=-1 ,c=2 这时候成立 ; b[index++] ,c[index--] 之后 b还是等于 -1 , c还是等于 2
 *     那么结果集里面就会出现两次 [-1,-1,2] 、 [-1,-1,2]  这不是我们想要看到的;
 *     所以我们需要注意，在给 b[index++]和c[index--] 之前必须保证 b[index] !=b[index+1] && c[index]!=c[index+1]
 *    
 *   上面是我们应该注意的第一种情况;
 *   还有一种情况值得注意: 
 *   在遍历的时候
 *   在选择 【a】 这个基准值的时候;我们必须先保证 若 arr[index] = a 那么arr[index-1] != a;  
 */
// var threeSum = function(nums) {
//   var res = []
//   // 从小到大排序
//   var sortedNums = nums.sort(function(a,b){
//     return a-b
//   })
//   var len = sortedNums.length
//   for(var i = 0;i<len;i++){
//       if(i>=1 && sortedNums[i] === sortedNums[i+1]) continue
//       var a = sortedNums[i]
//       var left = i+1
//       var right = len-1
//       var b = sortedNums[left]  
//       var c = sortedNums[right]
//       var total = a+b+c
//       while(left < right && total < 0){    // 这么写有问题是因为 索引left发生改变,但是sortedNums[left]没有发生改变导致分支一直没走到 [res.push]
//         left++
//       }
//       while(left < right && total > 0){
//         right--
//       }
//       while(left < right && total === 0){
//         res.push([a,b,c])      
//         left++
//         right-- 
//       }
//       while(left < right && sortedNums[left] === sortedNums[left+1]){
//         left++
//       }
//       while(left < right && sortedNums[right] === sortedNums[right-1]){
//         right--
//       }
//   }
//   return res
// }

var threeSum = function(nums){
  // 结果集
  var res = []
  // 从小到大排序
  var sortedNums = nums.sort(function(a,b){
    return a-b
  })
  var len = nums.length
  if(len <3) return []
  for(var i = 0;i<len;i++){   // 这个循环是用来遍历 pivot(a) 的
    if(i>=1 && sortedNums[i] === sortedNums[i-1]) continue  // 发现当前pivot 和 前一个数相同时需要往前移动一位
    var a = sortedNums[i]
    var left = i + 1 
    var right = len - 1
    while(left < right){  // 内循环是为了分别找到 b 和 c 的:  用 left 和 right 夹中的方式往中间靠; left和right分别指向 b 和 c 
      var b = sortedNums[left]
      var c = sortedNums[right]
      var total = a+b+c
      if(left < right && total <0) left++ // b 不够大需要往右靠 
      else if(left < right && total > 0) right--  // c 不够小需要往左边靠
      else{ // 条件满足了, left 和 right 同时向中间靠 
        res.push([a,b,c])                 
        // 这里需要注意:
        // [-1,-1,-1,0,2,2]  需要排除 sortedNums[left] === sortedNums[left+1] 和 sortedNums[right] === sortedNums[right-1] 的情况,
        // 如果不注意的话; a = -1 , b = -1, c =2 的情况会被反复取出两次 这不是我们想要的,就是防止 b 和 c重复的情况
        while(left < right && sortedNums[left] === sortedNums[left+1]) left++
        while(left < right && sortedNums[right] === sortedNums[right-1]) right--
        left++
        right--
      } 
    }
  }
  return res
}