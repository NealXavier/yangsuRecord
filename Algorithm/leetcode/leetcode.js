/**
 * leetcode 23:
 */

// 暴力法：
/**
 * 1. 将所有的链表遍历出来,
 * 2. 把所有的值放进去一个数组里面
 * 3. 对值从小到大进行排序
 * 4. 创建一个新的链表装进去
 */
var mergeKLists = function(lists) {
  // corner case
  if(lists.length) return null
  if(lists.length === 1) return lists[0]

  var arr = []
  for(var list in lists){
    while(list){
      arr.push(list.val)
      list = list.next   
    } 
  }
  // 从小到大排序
  arr.sort((a,b)=>a-b)
  var len = arr.length
  var result = new ListNode(0)
  var curr = result
  for(var i = 0;i<len;i++){
    curr.next = new ListNode(curr.val)
    curr = curr.next
  }
  return result.next
};


