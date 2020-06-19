// /**
//  * 服务器代码
//  * 
//  * node server js
//  */
// const express = require('express');

// const app = express();
// // express.static向外暴露静态资源
// // maxAge 资源缓存的最大时间，单位ms
// app.use('./build/index.html', { maxAge: 1000 * 3600 });

// app.listen(3000);

// console.log('启动了')

/*
  服务器代码
  启动服务器指令：
    npm i nodemon -g
    nodemon server.js

    node server.js
  访问服务器地址：
    http://localhost:3000

*/
// const express = require('express');

// const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms
// console.log('express static: '+ express.static)

// app.use(express.static('build', { maxAge: 1000 * 3600 }));

const express = require('express');

const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms

// 服务端一直报 cannot GET/ 这个错误  状态码是404 
// 然后找了下stackoverflow原来是语法的问题
// 之前express.static('build') ，后面改成 express.static(__dirname + '/build') 就可以了
app.use(express.static(__dirname + '/build', { maxAge: 1000 * 3600 }));

app.listen(3000);

