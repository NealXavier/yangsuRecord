// eslint main is defined but never used
// 但是因为这个是css变量，不使用很正常，解决方法是：
// 在.eslintrc中 写上： "rules":{"no-unused-vars":"off"}
import main from '../css/main.css';

const add = (a, b) => a + b;

// 没有引入垫片,在IE环境下会提示promise未定义
// 使用 core-js 打包，直接减少了 3/4的体积
const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行结束');
    resolve();
  }, 1000);
});

// eslint-disable-next-line
console.log(promise)

// eslint-disable-next-line
console.log(add(1, 2));
