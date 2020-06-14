import $ from 'jquery'

// console: Cannot use import statement outside a module
// 无法编译es6
$('#title').click(()=>{
  $("body").css('backgroundColor','deeppink')
})