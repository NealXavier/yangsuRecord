// 构造函数
function createPerson(name,age){
  var obj = {}
  obj.name = name;
  obj.age = age;
  obj.isAdult = age >= 18;
  obj.say = function(){
    console.log(`i am ${this.name}`);
  }
  return obj;   
}

因为没有必要给每个obj创建一个匿名函数(obj),于是我们有了公有属性
var personCommonAttrs = {
  say: function(){
      console.log('Hi i am ${this.name}');
  }
}

function createPerson(name,age){
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.isAdult = age >=18;
    obj.__proto__ =createPerson.personCommonAttrs;// __proto__ 是私有属性，不要在生产环境使用 __proto__，请使用 Object.create
    return obj;
}

// 强迫症不习惯,要把personCommonAttrs改成createPerson.personCommonAttr;
createPerson.personCommonAttrs = {
  say: function(){
      console.log('Hi i am ${this.name}');
  }
}

// 但是js中统一将"公有属性"称为prototype;
// 因此就是：
function createPerson(name,age){
    var obj  = {};
    obj.name = name;
    obj.age =  age;
    obj.isAdult = age>=18;
    obj.__proto__ = createPerson.prototype;
    return obj;
}

createPerson.prototype = {
  say:function(){
      console.log(`hi i am ${this.name}`);
  }
}


// 那么,用 new关键字又有什么用处呢
/**
 * 1. 不用创建obj这个临时对象,想变量名是个痛苦的过程
 * 2. 不用绑定原型,也就是不用写 obj.__proto__ = createPerson.prototype这一句
 * 3. 不用写return 
 * 4. "共有属性"这个变量已经叫 prototype ,需要添加就直接用"obj.prototype = xxx;"这种方式添加
 */
// 因此改写为
function createPerson(name,age){
  this.name = name; 
  this.age = age;
  this.isAdult = age>18;
}
// ps：这个地方应该注意,如果用了new 关键字之后,它是会有自动生成constructor这个属性的
createPerson.prototype = {
  constructor:createPerson
}

// 因此直接像以下这么写是会覆盖上面的，所以不好
createPerson.prototype = {
  say:function(){
      console.log('I am '+this.name);
  }
}
所以应该这么写

// 这是正确的公有属性的写法
createPerson.prototype.say = function(){
  console.log('I am '+this.name);
}


// 说完了new这个语法糖是怎么简化对象创建的
// 现在应该来看看继承这个概念了
// 首先，这里不介绍class Yyy extends Xxx 这种面向对象的写法。只说明基于原型链的写法
// 继承的话分为两个部分,一个是共用属性的继承,一个是自有属性的继承
// 请看下面的例子:
// 动物 》哺乳动物 
function Animal(color,weight){
  this.color = color;
  this.weight = weight;
}
Animal.prototype.eat = function(){
  console.log('mia mia mia..');
}

Animal.prototype.sleep = function(){
  console.log('zzz..');
}

function Mammal(color,weight){
  Animal.call(this,color,weight); 
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.suckle = function(){
  console.log('mia 好奶棒棒哒！');
}

// Animal.call(this,color,weight)是对父类Animal的自有属性的继承,
// 毕竟 Mammmal也应该有color和weight这个属性

// 接下来说一下重头戏,继承公有属性
// 其实继承公有属性应该有一种很直观的理解办法, Mammal.__proto__ = Animal.prototype ;
// 就是把Mammal的原型链指向Animal的公有属性,这样看来还是很直观的,
// 可偏偏js就是一个特别纠结的语言,就是不让我们直接操作__proto__ 这个属性,
// 但是在es5中js提供了一个方法Object.createObject(),用来实现 Mammal.__proto__ = Animal.prototype 这种效果
// 截图1
// 但是是这种效果,而且没有constructor 属性, 这样沿着原型链找就会指向Animal,这显然不是我们想要的,
// 因此,在此之后应该加上 Mammal.prototype.constructor = Mammal,让constructor 指向 Mammal

// 小插曲
// 为什么不是Mammal.prototype = Animal.prototype;
// 我们来看看这句代码执行之后的效果先：
// 截图2

// 那如果是这样的话,这两个对象又有什么分别呢,我们又为什么还要造出个这样的对象呢 ?
// 而我们想要的效果是"继承" 它的属性, 所以应该出来的效果是 Mammal.__proto__ = {eat:f{},sleep:f()}这种格式,
// 而不是直接打印Mammal.prototype 就出现 {eat:f{},sleep:f{}} 这个属性


// 扩展延伸：
// 上面是使用es5的方法进行解释的,这种方式是不兼容ie的,而古老的es3是怎么解释的呢?这个方式可能更接近于js的设计者想要
// 我们去理解的一种方式
function fakeAnimal(){}
fakeAnimal.prototype = Animal.prototype;
Mammal.prototype = new fakeAnimal()


function Animal(){
  obj = {}
  obj.__proto__ = Animal.prototype
  return obj 
}

// Animal.prototype.__proto__ === obj__proto__  
// Animal.prototype = new Human()

// Animal.prototype.__proto__ = Animal.prototype 



