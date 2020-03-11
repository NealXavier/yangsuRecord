// 检验为二叉搜索树,
// 也就是 root.left.val < root.val < root.right.val
// 评论区有个人说：就是中序遍历升序的情况就是valid的情况醍醐灌顶
// 这也是我第一时间的想法, 就是使用遍历, 只是遍历之后不知道该做什么，这道题将数组升序和中序遍历结合起来
var middle_travelsal = function(node,res){
  if(node.left) middle_travelsal(node.left)
  res.push(node.val)
  if(node.right) middle_travelsal(node.right)
}
var isValidBST = function(root){
  var res = []
  if(!root || root === null) return
  middle_travelsal(root,res)
  // 下面是判断该数组是否是升序情况, 并且不包含重复数字,虽然有点难看
  for(var i = 0; i < res.length - 1;i++){
    if(res[i] >= res[i+1]) return false
  }
  return [...new Set(res)].length === res.length
}

// 和下面的解法是同个意思,但是会很难写
// public boolean isValidBST(TreeNode root) {
//   if (root == null) {
//       return true;
//   }
//   if (isValidBST(root.left)) {
//       if (last < root.val) {
//           last = root.val;
//           return isValidBST(root.right);
//       }
//   }
//   return false;
// }

// 还有一种解法： 这种思路也很好理解

// 思路：引入上下边界

// 对于树的每个节点 val ，设其上下边界 low , high。(用 long 防止 INT_MAX 溢出 )
// 判断根结点时，须满足 low < val < high ，否则返回 false
// 判断左节点时，仅 上界 变化 ( 新上界为 high 与 val 较小值。又因 val 必小于 high，故新上界为 val )
// 判断右节点时，仅 下界 变化 ( 同理，新下界为 val )
bool fun(struct TreeNode* root, long low, long high) {
    if (root == NULL) return true;
    long num = root->val;
    if (num <= low || num >= high) return false;
    return fun(root->left, low, num) && fun(root->right, num, high);
}
bool isValidBST(struct TreeNode* root){
    return fun(root, LONG_MIN, LONG_MAX);
}
