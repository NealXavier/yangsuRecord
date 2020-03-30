 // [A,A,B,B,C,C]  n = 3   A B C _ A B _ C        
 // [A,A,A,B,B,C,C,] n = 2   A,B,B,A,C,C,D,D,A   A.length   (中间有坑)
 // [A,A,A,B,B,C] n = 2 , A,B,B,A,C,_,A    N = 种类 - 1 
 // 题目讲解：https://www.youtube.com/watch?v=U3JKn8vP9JE
 // 递归公式来源: 解法三: https://leetcode-cn.com/problems/task-scheduler/solution/ren-wu-diao-du-qi-by-leetcode/
 // 但是值得注意的是: 当 N >= 种类 - 2 
 /**
  * [A,A,A,B,B,C,C,D,D]  n = 2 , A B B A C C A D D  如果按照 (max - 1) * ( n + 1) + max_num =   2 * 3 + 1 = 6 
  * // 如果按照公式显然不合理 , 结果居然比数组长度还小  
  */
var leastInterval = function(tasks,n){
  var min_time = 0
  var count = new Array(26).fill(0)  // fill 这个数组方法也是新姿势
  for(let c of tasks) count[c.charCodeAt(0)-'A'.charCodeAt(0)]++   // c.charCodeAt(0) 这个方法是新姿势
  debugger
  // 拿完之后去比较哪个任务是最频繁的
  count.sort((a,b)=>b-a)

  var max = count[0]

  for(var z=0;z< count.length;z++) {
    if(max !== count[z]) break;
  }
  
  // z是第一个不是最大频繁的任务
  // max_num 代表最频繁的任务的个数
  var max_num = z ;
  var res = (max - 1) * (n+1) + max_num  // 递归公式 n代表间隔 , max代表最大频次的任务个数
  return res > tasks.length ? res:tasks.length
}