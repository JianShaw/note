面试时，一问类型，虽然知道是何物，但总是蒙逼想不起来。特此总结一番。

## 内置类型 ##

JavaScript有七种内置类型.(你不知道的JavaScript中)
- 空值(null)

- 未定义(undefined)

- 布尔值(boolean)

- 字符串(string)

- 对象(object)

- 数字(number)

- 符号(symbol)

除对象外，其他统称为`基本类型` 

## 类型判断 ##

`typeof`方法可以用来判断类型，但是他会有一些很奇怪的表现。

我们在测试一下相关类型的判断结果

```
typeof undefined    //"undefined"

typeof []   //"object"

typeof '123'    //"string"

typeof 1234     //"number"

typeof {}    //"object"

typeof null // "object"

typeof function(){} //"function"
```

注意`typeof null` 不等于`null` 而是等于 `'object'`,这是js的一个久远的bug

那该`如何判断null类型呢？`

```
typeof type === 'object' && !type //如果这个结果是true
```

`typeof function(){}`  我们知道function是 object的子类型。因此结果应该是`object`,typeof判断[],就符合我们的判断，但`Function`是个例外 ，

```
typeof function(){} === Function
```
## 差点遗漏的NaN ##

总觉得缺了点什么，看到内建函数后，想起了[NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)

`NaN` not a number
NaN 是一个全局属性
```
Number.Nan   // NaN
```
### 如何出现 ###

```
Number('ddddd')  //NaN
Math.floor('sfsfsfsf' //NaN)
```

作为Math方法的返回值失败或者一个方法试图去parse一个number失败 '类似parseInt('ddddd')'

### 如何判断是NaN ###
NaN与包括他自己在内的任何值都不相等。
js全局提供了`isNaN()`方法来判断`NaN`,
我们也可以根据NaN与自己都不相等这一特性来判断
如下
```
NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true

function valueIsNaN(v) { return v !== v; }
valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true
```

* 上边一不小心写了判断`null`和`NaN`两个兄弟，可是我们在日常开发中经常会遇见判断一个值是否为数组，或者是否为空对象，那么该如何判断呢，一起写了吧 *

### 如何判断数组 ###
ES5 提供了 Array.isArray()方法来判断数组

我们当然也可以用如下的方法来判断数组,这也是MDN给出的Polyfill
```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// or

var a = []

a instanceof Array // true
```
### 说到数组，就要补充下类数组的概念 ###
我们知道function的参数arguments是类数组 ，
我们处理时，需要将arguments转换为数组进行操作
es6提供了`Array.from()`方法将类数组转换为真正的数组对象

那什么样的结构才符合类数组呢？
首先我们要从数组`Array`说起
```
var arr = [1,2,3,4]

arr[0] //1
a[1] //2 
a.length //4
...
```
我们的数组有从0开始的下标，length属性

类数组对象是个对象，当然数组是对象的一个子类。
它的结构如下
```
var likeArr = {
    0: 1,
    1: 2,
    2: 3,
    3: 4
}
likeArr.length = 4

```
类数组虽然是以key-vlue的格式，但是只要它的属性是从0开始递增，并且有length属性，我们就可以称它为类数组对象

我们可以借用Array.prototype.slice.call()来将类数组转换成真正的数组。


## 内建函数（built-int function） ##

常见的内建函数（也有人叫原生函数）

- String()

- Number()

- Boolean()

- Array()

- Object()

- Function()

- RegExp()

- Date()

- Error()

- Symbol()

