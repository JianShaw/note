## 观察__proto__ ##

```
class Person{
    constructor(){

    }
    age(){
        return 26 
    }
    learn(){

    }
}
console.log(new Person())

```
 ![demo](./demo/01/person.png)


 我特地展开`__proto__`对象并截图，

 Person的实例，通过一个__proto__指向一个对象，这个对象有constructor属性，该属性为`class Person`

 我先试着猜想，这个`__proto__`指向Person

 可是
 ```
 p.__proto__ == Person //false
 ```

```
 p.__proto__ == Person.prototype // true
```

so

p.__proto__ 指向的是Person类的prototype

```
p.__proto__.__proto__ == Object.prototype // true
```

不难得出，__proto__总是指向它父类的原型链。

可以使用__proto__来修改原型链的指向。但是因为它有性能问题。


其实经常和constructor打交道，只是之前不太关注。


具体的解释可以看mdn

简单标注下，构造函数方法是一种特殊的方法，用于创建和初始化一个类中创建的对象。


一个class下只能有一个constructor属性，多余的会throw 一个error


构造函数可以使用super关键字来调用父类的构造函数。如果我是一个extends父类


用了extends 来继承一个父类 ，却不实用super会throw一个error 

`ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`


关于继承


js 是单一原型链的继承模型，简单点，就是通过唯一的prototype来向上查找，获取prototype上的方法，属性，来作为自身的方法属性来使用。

而在实际开发中，我们不可能只需要继承一个类来进行开发。

比如这样 base  -> util -> basePc/baseApp -> entrancePage

此时，我们希望我们的entrancePage 继承上边的多重方法，而我绝对不会去 一个个extends



换电脑，做备注

https://www.h5jun.com/post/mixin-in-es6.html


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins



