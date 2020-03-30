/**
 * leetcode19: Remove Nth Node From End of List
 * 目的：删除链表的倒数第N个节点
 * 
 */
  // 构建结点

  /**
   * param1 head 头节点
   * param2 n 倒数第n个
   */
  var removeNthFromEnd = function(head,n){
    /**
     *  [1,2,3,4,5] - 3 
     *  思路如下：n = 3 
     *  也就是需要 第3个元素名为[3]的元素,
     *  设置两个指针快(fast)、慢(slow) 两个指针
     *  初始化 slow = head; fast = head
     *  然后应该将 fast = head + n(3) ,所以在这里就是指向4的位置,然后快慢指针同时向后移动,直到 fast末尾为止,
     *  此时, slow 指向 2, fast指向5, 删除的正好是 3 , 所以就是 slow.next = slow.next.next 
     */
    // 这里的 n 一定是一个合理的数,也就是说链表长度为1 ,那么n 不可能为 > 1 的数或者其他负数
    /**
     * 考虑两种边界情况
     * edge1: [1] - 1
     */
    if(!head.next) return null
    /**
     * edge2: [1,2,3] - 3  直接去掉头节点的情况
     */
    var slow = head, fast = head
    for(var i = 0;i<n;i++){
      fast = fast.next
    }
    // 也就是 edge2 
    if(!fast) return head.next // head 的下一个节点作为头节点, 也就是原先的头结点被删除了
    while(fast.next){
      fast = fast.next
      slow = slow.next
    }
    slow.next = slow.next.next
    return head
  }