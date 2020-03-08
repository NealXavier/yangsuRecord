// 关键点在于 (n>>i)&1 判断出这个位上是否为1,如果是加入,不是则不管
var countBits = function(num){
  var res = []
  var arr = new Array(num+1).fill(0)
  for(var i = 0; i<= num;i++){
    arr[i] = i
  }
  for(n of arr){
    var count = 0
    for(var i = 0; i < 32;i++){
      if((n>>i)&1)count+=1 
    }
    res.push(count)
  }
  return res
}
