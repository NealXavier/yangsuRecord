// leetcode2: add two numbers
var addTwoNumbers = function(l1,l2){
  // 初始化一个链表,但它的第一个元素并不是最重要的,它会用到的是第二个元素往后
  var linked = new ListNode(0) // 这个数值并不重要
  var result = linked  // 用来记住linked这个链表
  var carry = 0 // 进位的那一个数
  // 遍历会进行下去的情况：p1,p2任一不为空,或者carry不为0,考虑到最大的情况不过 9+9 =18,所以carry就算有值,它也只能为1
  var value
  while(l1 || l2 || carry === 1){
    value = 0
    if(l1){
      value +=l1.val
      l1 = l1.next       
    }
    if(l2){
      value +=l2.val
      l2 = l2.next
    }
    if(carry===1){
      value+=carry
    }
    carry = Math.floor(value/10) 
    linked.next = new ListNode(value % 10)
    linked = linked.next    
  }
  return result.next
}
