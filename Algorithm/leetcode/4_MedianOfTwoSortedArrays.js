/**
 * leetcode4: 求两个有序数组的中位数,复杂度log (n+m)
 *  
 *  m = [1,3*,4,5]
 *  n = [2,3,6,6,8*,9]
 * 
 * 说下思路:
 * 1.调换一下数组,让first是更小的那个
 * 2.用i来表示 m的数组索引位置, half = (m+n+1)/2 代表中间那个数, j == (half - i)表示n的数组索引位置 
 * 为什么是这样的? 假设说是上面的例子: 如果m[i] = 3 是中位数(或者之一), 而数组都是排好序的, mLen+nLen = 10,那么还有5个数排在它前面,
 * 比如m中的[1],还有n中的[2,3,6,6],所以j的位置肯定是: j = (m+n+1)/2 - i, 才会符合请求 
 * 3.以上都只是分别判断 i和j 的位置怎么取,接下来判断应该怎么确定它们的位置是不是中间(怎么移动)
 * 3-1 假设取 i = 1 ,j = 4, 发现 m[i]() < n[j-1], 这时候 i 应该向右移动直到 m[i]>n[j-1],(因为m[i]肯定比排在它前面的要大)
 * 3-2 不仅仅如此, 3-1 满足时,还要留意,n[j]>m[i-1],如果不是需要向左移动直到 n[j] > m[i-1] （换言之,还是需要 i 向右移动 ,因为 j 和i存在函数关系）
 * 4. 按照上面的方式遍历下去,这时候需要判断
 *    maxLeft: 上半截最大的数
 *    minRight: 下半截最小的数
 *    maxLeft的取值有三种情况: 但是为什么讨论maxLeft都是分别在m和n都在左边界的原因:  
 *        i === 0  maxLeft = [j-1]
 *        j === 0  maxLeft = [i-1]
 *        ...      maxLeft = min(n[i],m[j])
 *  如果 (mLen + nLen) 为奇数,则不需要考虑:minRight 的情况
 *  
 * 
 *  minRight的取值有三种情况:
 *       i === n minRight = m[j]  
 *       j === m minRight = n[i]
 */
var findMedianSortedArrays = function (m, n){
  if(m.length >n.length) return findMedianSortedArrays(n,m)
  if(m.length === 0){
    if(n.length%2===0) return (n[Math.floor(n.length/2)-1]+n[Math.floor(n.length/2)])/2.0
    else return n[Math.floor(n.length/2)]
  }
  var iMin = 0
  var iMax = m.length
  var mLen = m.length
  var nLen = n.length
    while(iMin<=iMax){
     var i = Math.floor((iMin + iMax)/2)
     var j = Math.floor((m.length + n.length + 1) / 2) - i  // 奇偶数情况合并
     if(i>0 && m[i-1]>n[j]) iMax = i - 1 
     else if(i<mLen && n[j-1]>m[i]) iMin = i + 1
     else{ // 找到了
      var maxLeft = 0
      var minRight = 0
      if(i===0) maxLeft = n[j-1]
      else if(j===0) maxLeft = m[i-1]
      else maxLeft = Math.max(m[i-1],n[j-1])
      if((mLen+nLen)%2 === 1) return maxLeft

      if(i===m.length) minRight = n[j]
      else if(j===n.length) minRight = m[i]
      else minRight = Math.min(m[i],n[j]) 

      return  (maxLeft + minRight) / 2
     }
  }
  return 0.0
};