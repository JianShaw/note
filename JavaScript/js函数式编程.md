## 纯函数 ##

我们要理清纯函数的概念

__纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用.__

```
var xs = [1,2,3,4,5];

// 纯的
xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]


// 不纯的
xs.splice(0,3);
//=> [1,2,3]

xs.splice(0,3);
//=> [4,5]

xs.splice(0,3);
//=> []

```

slice符合纯函数是因为对相同的输入返回相同的输出。

__可以理解为只要传相同的参数就会有同样的输出结果,从编程的维度来讲，我们更喜欢这种可靠的，每次都能返回同样结果的函数，而不是像splice这种，每次调用都会讲数据弄的乱七八糟。__


## 副作用 ##

作用本身并没有什么，函数在我理解甚至就是一种作用。

> 副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。

副作用可能包含，但不限于：

- 更改文件系统
- 往数据库插入记录
- 发送一个 http 请求
- 可变数据
- 打印/log
- 获取用户输入
- DOM 查询
- 访问系统状态

我们甚至可以这样理解，只要同函数外部环境发生交互都是副作用。函数式编程也正是假设`副作用`是造成不正当行为的主要原因。

我们并不是说要禁止这种副作用的发生，而是要将副作用控制在可以控制的范围内。后面讲到 functor 和 monad 的时候我们会学习如何控制它们，目前还是尽量远离这些阴险的函数为好。

### 追求纯的理由 ###

#### 可缓存 ####

首先，纯函数总能够根据输入来做缓存。实现缓存的一种典型方式是 memoize 技术：

```
var squareNumber  = memoize(function(x){ return x*x; });

squareNumber(4);
//=> 16

squareNumber(4); // 从缓存中读取输入值为 4 的结果
//=> 16

squareNumber(5);
//=> 25

squareNumber(5); // 从缓存中读取输入值为 5 的结果
//=> 25
```
显然memoize方法需要传入一个函数，

```
var memoize = function(fn){
    var cacheObj = {};
    return function(){
        var argsStr = JSON.stringify(arguments);
        cacheObj[argsStr] = cacheObj[argsStr] || fn.apply(fn,arguments);
        return cacheObj[argsStr]
    }
}
```


值得注意的一点是，可以通过延迟执行的方式把不纯的函数转换为纯函数

```
var pureHttpCall = memoize(function(url, params){
  return function() { return $.getJSON(url, params); }
});
```
之所以说pureHttpCall有资格称之为纯函数，是因为它总是根据相同的输入返回相同的输出。传入相同的url和params后，总会返回同一个http请求的函数。

#### 可移植性／自文档化 ####

```
// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};

var saveUser = function(attrs) {
    var user = Db.save(attrs);
    ...
};

var welcomeUser = function(user) {
    Email(user, ...);
    ...
};

// 纯的
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};
```

比较纯函数signUp和非纯函数signUp,纯函数的依赖很明确，因此更易于观察和理解，反之，另一个版本的signUp只有一个attrs参数。

这个例子表明，纯函数对于其依赖必须要诚实，这样我们就能知道它的目的。仅从纯函数版本的 signUp 的签名就可以看出，它将要用到 Db、Email 和 attrs，这在最小程度上给了我们足够多的信息。

其次，通过强迫“注入”依赖，或者把它们当作参数传递，我们的应用也更加灵活；因为数据库或者邮件客户端等等都参数化了（别担心，我们有办法让这种方式不那么单调乏味）。如果要使用另一个 Db，只需把它传给函数就行了。如果想在一个新应用中使用这个可靠的函数，尽管把新的 Db 和 Email 传递过去就好了，非常简单。

在 JavaScript 的设定中，可移植性可以意味着把函数序列化（serializing）并通过 socket 发送。也可以意味着代码能够在 web workers 中运行。总之，可移植性是一个非常强大的特性。

命令式编程中“典型”的方法和过程都深深地根植于它们所在的环境中，通过状态、依赖和有效作用（available effects）达成；纯函数与此相反，它与环境无关，只要我们愿意，可以在任何地方运行它。

#### 可测试性 ####

这个就是测试输出就可以了

#### 合理性 ####

#### 并行代码 ####

最后一点，也是决定性的一点：我们可以并行运行任意纯函数。因为纯函数根本不需要访问共享的内存，而且根据其定义，纯函数也不会因副作用而进入竞争态（race condition）。

并行代码在服务端 js 环境以及使用了 web worker 的浏览器那里是非常容易实现的，因为它们使用了线程（thread）。不过出于对非纯函数复杂度的考虑，当前主流观点还是避免使用这种并行。

## Curry(柯里化) ##

curry的概念很简单。

只传递给函数一部分参数来调用它，让它返回一个函数去处理余下的参数。

你可以一次的调用curry函数，也可以每次只传一个参数分多次调用。

相当于有一个函数 `function foo(x,y){ return x+y}`,当然它也可以转换成如下的方式

```
function foo(x){
    return function(y){
        return x+y
    }
}
```
也就是说本来执行一个foo(1,2)的方式，我们也可以通过foo(1)(2)的方式来执行

```
var add = function(){

}
```


当我们谈论纯函数的时候，我们说它们接受一个输入返回一个输出。curry 函数所做的正是这样：每传递一个参数调用函数，就返回一个新函数处理剩余的参数。这就是一个输入对应一个输出啊。


## 代码组合 ##

### 组合compose ###

```
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};
```

f,g是两个函数，x是他们之间通过管道传递的值。

执行`var com = compose(f,g)`，函数f,g会被封闭在com生成的闭包作用域内，当执行`com(7)`

又修正了一下compose
```
var compose = function(){
    var arr = Array.prototype.slice.call(arguments,0)
    return arr.reduce(function(a,b){
        return function(x){
            console.log(x)
            return a(b(x))
        }
    })
}
```
compose接受若干个函数。

```
var toUpperCase = function(x) { return x.toUpperCase(); };
var exclaim = function(x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);

shout("send in the clowns");
//=> "SEND IN THE CLOWNS!"

```
组合的功能很强大，可以选择你喜欢的函数，组合成一个你喜欢的函数。
组合中，会从右向左执行，换言之，创建了一个从右到左的数据流。这样的可读性要远大于一大堆潜逃的函数调用。

如果不用组合，可能我们的函数会是这个样子

```
var shout = function(x){
    return exclaim(toUpperCase(x))
}
```

## pointfree ##

它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。

```
// 非 pointfree，因为提到了数据：word
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

// pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

```

函数无须提及将要操作的数据是什么样的.像replace和toLowerCase其实都没有显示的通知我们传递了什么参数。

而在非pointfree的版本中，必须要有word才能进行一切操作

```
var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});
```

看到 replace 是如何被局部调用的了么？这里所做的事情就是通过管道把数据在接受单个参数的函数间传递。利用 curry，我们能够做到让每个函数都先接收数据，然后操作数据，最后再把数据传递到下一个函数那里去


### 好处 ###

pointfree能帮我们减少不必要的命名，让代码保持简洁和通用。

## debug ##

组合的一个常见错误是，在没有局部调用之前，就组合类似map这样接受两个参数的函数。

```
var latin = compose(map, angry, reverse);

latin(["frog", "eyes"]);
// error


// 正确做法：每个函数都接受一个实际参数。
var latin = compose(map(angry), reverse);

latin(["frog", "eyes"]);
// ["EYES!", "FROG!"])
```

debug时遇到了困难，那么使用下面这个实用的，但是不纯的trace函数来追踪代码的执行情况

```
var trace = curry(function(tag,x){
    console.log(tag,x)
    return x
})


var dasherize = compose(join('-'), toLower, trace("after split"), split(' '), replace(/\s{2,}/ig, ' '));
// after split [ 'The', 'world', 'is', 'a', 'vampire' ]

```
trace 函数允许我们在某个特定的点观察数据以便 debug。像 haskell 和 purescript 之类的语言出于开发的方便，也都提供了类似的函数。

组合将成为我们构造程序的工具，而且幸运的是，它背后是有一个强大的理论做支撑的。让我们来研究研究这个理论。


## 介绍一个独特的函数 ##

介绍一个名为`id`的实用函数。这个函数接受随便什么输入然后原封不动的返回它

```
var id = function(x){ 
    return x
    }
```

id和组合compose使用简直完美。下面这个特性对所有的一元函数f都成立。

> 一元函数： 只接受一个参数的函数。

```
//identity

compose(id,f) == compose(f,id) == f
```

这就是identity property。（单位元）

## 声明式代码／命令式代码 ##

我们要开始学会不再指示计算机如何工作，而是指出我们明确希望得到的结果。这种做法比那种需要时刻关心所有细节的命令式编程更轻松

命令式，顾名思义就是命令计算做指定的操作。

而声明式，意味着我们要写表达式，而不是一步步的指示。

以sql为例，我们不在是先做这个，在做那个的命令，而是一个指明我们想要从数据库取什么数据的表达式。至于如何取数据，原则上是有它自己决定的。以后数据库的升级，优化，也不需要修改查询语句。因为有很多方式解析一个表达式并得到相同的结果。 记得纯函数了么，相同的输入，相同的输出。

```
// 命令式
var makes = [];
for (i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}


// 声明式
var makes = cars.map(function(car){ return car.make; });
```

再看另一个demo

```
// 命令式
var authenticate = function(form) {
  var user = toUser(form);
  return logIn(user);
};

// 声明式
var authenticate = compose(logIn, toUser);
```
虽然命令式的版本并不一定就是错的，但还是硬编码了那种一步接一步的执行方式。而 compose 表达式只是简单地指出了这样一个事实：用户验证是 toUser 和 logIn 两个行为的组合。这再次说明，声明式为潜在的代码更新提供了支持，使得我们的应用代码成为了一种高级规范（high level specification）。

因为声明式代码不指定执行顺序，所以它天然地适合进行并行运算。它与纯函数一起解释了为何函数式编程是未来并行计算的一个不错选择——我们真的不需要做什么就能实现一个并行／并发系统。


## demo ##

```
requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function (_, $) {
    ////////////////////////////////////////////
    // Utils

    var Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),

      setHtml: _.curry(function(sel, html) {
        $(sel).html(html);
      })
    };

    var img = function (url) {
      return $('<img />', { src: url });
    };

    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });

    ////////////////////////////////////////////

    var url = function (t) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + t + '&format=json&jsoncallback=?';
    };

    var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

    var srcs = _.compose(_.map(mediaUrl), _.prop('items'));

    var images = _.compose(_.map(img), srcs);

    var renderImages = _.compose(Impure.setHtml("body"), images);

    var app = _.compose(Impure.getJSON(renderImages), url);

    app("cats");
  });
```

map的组合定律

`var law = compose(map(f), map(g)) == map(compose(f, g));
`


## Hindley-Milner类型签名 ##


```
//  strLength :: String -> Number
var strLength = function(str){
  return str.length
}
```

Hindley-Milner中，函数都可以写成 a -> b 这种格式，a，b为任意类型的变量，strLength可以理解为一个接受string类型的参数返回一个Number类型的值。

再来看几个其它的函数

```
//  match :: Regex -> String -> [String]
var match = curry(function(reg, s){
  return s.match(reg);
});

```

match可以理解为 接受一个 Regex类型的参数，一个String类型的参数，返回一个数组，数组里面是字符串([string])

因为是curry的原因，我们初次也可以只传一个参数。将第一个参数缓存掉。生成新的函数。再传入一个第二个参数，返回最后的数组。这样思考也有助于最后一个值为返回值。

所以match也可以写成如下这样

```
//  match :: Regex -> （String -> [String]）
var match = curry(function(reg, s){
  return s.match(reg);
});


//  replace :: Regex -> (String -> (String -> String))
var replace = curry(function(reg, sub, s){
  return s.replace(reg, sub);
});
```

观察上边的replace为了加深理解，加了很多括号。但这些括号显得很多余，所以一次性把所有的参数都传进来，前三个是参数，最后一个是返回值。



__你以为写完事了？开什么玩笑__

```
//  id :: a -> a
var id = function(x){ return x; }

//  map :: (a -> b) -> [a] -> [b]
var map = curry(function(f, xs){
  return xs.map(f);
});
```

id函数的类型为啊？ 这是什么鬼？

其实，a 其实是指这个函数接受任何一个类型的数据，返回值为a，这里可以这么理解，对于相同的变量名，其类型也必然相同。

map呢？初看有点懵逼，本来有2个参数，算上返回值应该也只有3个而已。。

括号内应该理解为一个参数
(a -> b) ：： 它是一个接受a类型的值，返回一个b类型的值的函数(b,a类型可能相同)，
[a] :: 第二个类型为一个数组，元素是任意类型的元素a
[b]  返回一个数组，元素为任意类型b

怎么样？map其实就是接受一个函数，调用数组里的a，返回元素为b的数组。

一般的签名现在难不倒我们了。再看一个reduce

```
//  reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = curry(function(f, x, xs){
  return xs.reduce(f, x);
});
```

第一个参数是一个函数(b -> a -> b) 接受一个b，和a，返回一个b
  b和a来自哪里。应该来自于第二个参数和第三个参数。 此时的返回值b 就是这个reduce的输出b
第二个参数是b
第三个参数 [a],数组，元素a
返回值是b,

__这鬼东西带来什么好处?__

```
// head :: [a] -> a
```
看head的签名，输入是一个元素为类型a的数组，返回一个类型为a的值。所以函数的功能只在操作这个数组上。操作这个数组，对其中某个元素处理，但又不能改变类型。
结合函数名字的话，应该是取数组的首位。
