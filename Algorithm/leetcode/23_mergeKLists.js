// 合并k个链表
  var mergeKLists = function(lists){
    // corner case
    if(!lists) return null;
    return merge(lists,0,lists.length-1)
  }
  // 其实就是快速排序
  // 先切到最碎, 也就是 corner case , 一般都是只剩下 0 个 或者 1 个元素
  // 再进行合并, 用局部的有序逐渐形成整体的有序

  // 分而治之 divide & conquer
  var mergeKLists = function(lists){
    // corner case
    if(!lists || lists.length === 0  ) return null;
    if(lists.length === 1) return lists[0];
    return merge(lists,0,lists.length-1)
  }
  // 其实就是快速排序
  // 先切到最碎, 也就是 corner case , 一般都是只剩下 0 个 或者 1 个元素
  // 再进行合并, 用局部的有序逐渐形成整体的有序
  
  // 分而治之 divide & conquer
  var merge = function(lists,left,right){
    console.log(right)
    // baseline 
    if(left === right){
      return lists[left]
    }
    var mid = left + Math.floor((right - left) / 2)
    // 这里的l1 一定要命名,要不然以默认全局变量处理, 那就完蛋了
    var l1 = merge(lists,left,mid)
    var l2 = merge(lists,mid+1,right)
    return mergeTwoList(l1,l2)
  }
  // 合并两个有序链表
  var mergeTwoList = function(l1,l2){
    // corner case
    if(!l1) {
      return l2     
    }
    if(!l2){
      return l1
    } 
    if(l1.val > l2.val){
      l2.next = mergeTwoList(l1,l2.next)
      return l2
      // 要记得return
    }else{
      l1.next = mergeTwoList(l1.next,l2)
      return l1
    } 
  }

// 古典解法
var mergeKLists = function(lists){
  var len = lists.length
  // corner case
  if(len === 0 ) return null
  var arr = []
  for(let i = 0;i<len;i++){
    // 得到每个链表的头结点
    var tmp = lists[i]
    while(tmp){
      arr.push(tmp.val) 
      tmp = tmp.next
    }
  }
  // 数组从小到大排列
  arr.sort((a,b)=>a-b)
  var arrLen = arr.length
  // 再次构造链表
  var dummy = new ListNode(0)
  var curr = dummy
  for(let i = 0;i<arrLen;i++){
    let node = new ListNode(arr[i])
    curr.next = node
    curr = curr.next
  }
  return dummy.next
}