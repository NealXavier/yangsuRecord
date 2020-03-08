// 本题探讨的是两个化为二进制的数之后,到底有多少位是不同的,并且记录起来
// 异或运算刚好可以解决这个问题,
// 这里简单说下异或运算: 相同取 0, 不同取 1
// 0^0 = 0 ,0^1 =1 , 1^0 = 1 , 1^1 = 1
// 将取异或之后的结果的每一位和 1 进行 & 运算,如果是结果是1则记录起来
var hammingDistance = function(x,y){
  var xor = x^y
  var count = 0
  for(var i = 0;i < 32;i++) count+=(xor>>i)&1
  return count
}