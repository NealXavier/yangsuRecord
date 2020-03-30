
/**leetcode11: Container With Most Water    
 * 可以这么写的原因是：
 * Math.max(maxLen,(high-low)*Math.min(height[low],height[high]))
 * 代表的是以【Math.min(arr[high],arr[high])】 对应底下的索引的最大容积已经找到:
 * 
 */
var maxArea = function(height) {
  var maxLen = 0
  var low = 0
  var high = height.length - 1
  while(low < high && low>=0 && high<=height.length-1){ // 如果两者相同就说明完全加紧就已经没有面积
    maxLen = Math.max(maxLen,(high-low)*Math.min(height[low],height[high]))
    if(height[low] < height[high]) low++
    else high--
  }
  return maxLen
};