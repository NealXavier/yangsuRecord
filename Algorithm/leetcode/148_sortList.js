/**
 * 链表的归并排序
 */
var sortList = function(head){
  if(!head || !(head.next)) return head  // 为空或者链表只有一个节点
  var slow = head, fast = head
  while(fast && fast.next && fast.next.next){
    slow = slow.next
    fast = fast.next.next
  }
  var mid = slow.next  
  slow.next = null        // 及时截断,如果不是会进入死循环。
  return merge(sortList(head),sortList(mid)) 
}
function merge(l1,l2){
  var dummy = new ListNode(0)
  var tail = dummy // 不能直接 tail = dummy.next ,这样咋子 下面 tail.next 会出现undefined的错误
  while(l1 && l2){
    if(l1.val >= l2.val){
      tail.next = l2 
      l2 = l2.next 
    }else{
      tail.next = l1 
      l1 = l1.next
    }
    tail = tail.next
  }
  if(l1)  tail.next = l1 
  if(l2)  tail.next = l2
  return dummy.next
}