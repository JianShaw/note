

## class ##

es6中添加了该关键字，它的作用是创建一个基于原型继承的类。

class是语法糖，它的本质还是函数。

还记得我们如何创建一个基于原型的类么

```
function Person(){

}
Person.prototype = {
    //add some method
}
```

## 类表达式 ##

没多么复杂，只是另一种写法。

```
var Foo = class {
  constructor() {}
  bar() {
    return "Hello World!";
  }
};

```
等同于

```
class Foo{
  constructor() {}
  bar() {
    return "Hello World!";
  }
};
```


## constructor ## 

构造函数方法是一种特殊的方法，用于创建和初始化一个类中创建的对象。

- 何时调用?

    每个class都会默认一个constructor。通过new 命令生成实例时，自动调用该方法。如果没有显示定义，会默认添加一个constructor方法。

- constructor会默认返回一个实例对象。`(this)`

- class类必须用new调用。直接当做一个函数运行的话，会报错。这与es5里`function Person(){}`的方式有些区别。

## 实现一个new怎么样? ##

step 1.实现目标
    实现一个New方法，当我调用class.New(args)，返回一个对象

    有了如下的实现
```
Function.prototype.NEW = function(args){
   
   return obj
}
```
step 2.class的实例都有个特点，就是它可以使用原型链上的方法，在浏览器里的log里，我们打印一个实例对象，它通过一个`__proto__`方法指向它的类。并且它的this总是指向实例对象。继续完善这个方法。

```
Function.prototype.NEW = function(){
   //this为调用者class
   var o = Object.create(this.prototype)
 
    //修正this.将this指向新的o

   this.apply(o,arguments);

   return o
}
```
success.

## 实例对象 ##

class中的属性除非定义在`对象上`，否则都是定义在原型上。

```
class Person{
    constructor(){
        this.age = 0;
        this.sex = 'male';
    }
    walk(){
        log('person,talk')
    }
    talk(){
        log('talk')
    }
}

var p = new Person()


```

甚至可以粗暴的理解为，设置在Person这个{}下的方法都是直接在原型的Prototype上。

walk,talk都定义在Person.prototype上了。

所以

```
p.hasOwnProperty('talk') // false
```

强势插入`__proto__`

`__proto__` 对实例对象来说，它指向类的prototype

```
p.__proto__ == Person.prototype // true
```
so

```
p.__proto__.hasOwnProperty('talk') // true
```

## extends 继承 ##

extends关键词用来创建一个普通类或者内建对象的子类。

日常使用，都是extends 一个class

有没有想过，我想extends 一个对象呢

别想了，当然不可以，传入一个对象，会报错。错误信息，自己试一下就知道了。

言归正传，js 是单一原型链的继承模型，简单点，就是通过唯一的prototype来向上查找，获取prototype上的方法，属性，来作为自身的方法属性来使用。

而在实际开发中，我们不可能只需要继承一个类来进行开发。

比如这样 base  -> util -> basePc/baseApp -> entrancePage

此时，我们希望我们的entrancePage 继承上边的多重方法，而我绝对不会去 一个个extends

.
## __proto__ ##

## set get操作 ##

在class内通过`set`,`get`关键字，对某个属性设置存取函数。

demo

```
var demo = class {
    set prop(value){

    }
    get prop(){

    }
}

```
注意，set操作，可以用来做参数处理。

## 为什么要有prototype ##

## 如此设计，有什么缺点么 ##

## 私有方法`属性 ##

## 补充 ##

- 类不存在变量提升，必须保证子类在父类后边，new操作在类后边