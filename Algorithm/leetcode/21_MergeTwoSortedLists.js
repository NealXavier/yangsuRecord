/**
 * leetcode21:  Merge Two Sorted Lists 合并有序链表, 这两条链表都是已经经过有序排列
 */
// solution1: Iterator:新建一新链表, 开始遍历, 条件为两条链表都同时不为空的情况,
//            跳出遍历之后,比较当前两条链表谁还没被遍历完,将新链表的next指向更长的链表,结束
var mergeTwoLists = function(l1, l2) {
  var dummy = new ListNode(0)
  var tail = dummy
  while(l1 && l2){
    if(l1.val > l2.val){
      tail.next = l2
      l2 = l2.next
    }else{
      tail.next = l1
      l1 = l1.next
    }
    // 不要忘记了tail = tail.next,也就是链表需要继续往右移
    tail = tail.next 
  }
  tail.next = (l1)?l1:l2
  return dummy.next  
};



/**
 * BFS :  
 * DFS : 
 */
var dict = new Map()
map.set("A","['B','C']")
map.set("A","['B','C']")
map.set("A","['B','C']")
map.set("A","['B','C']")
map.set("A","['B','C']")
map.set("A","['B','C']")
// {
//   'A':[''],
//   "B":["A","C","D"],
//   "C":["A","B","D","E"],
//   "D":["B","C","E","F"],
//   "E":["C","D","F"],
//   "F":["D"]
// }

var dfs = function(dict,start){
  var stack = []
  stack.push(s)
  var seen = new Set()
  seen.add(start)
  while(stack.length){
    var vertex = stack.pop()
    nodes = dict.get(vertex)
    for(var n of nodes){
      if(!seen.include(n)){
        stack.push(n)
        seen.add(n)
      }
    }
    console.log(vertex)
  }
}