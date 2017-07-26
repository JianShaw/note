# 深入一点，嗯，深一点 #

> 我们已经知道如何书写函数式的程序了，即通过管道把数据在一系列纯函数间传递的程序。我们也知道了，这些程序就是声明式的行为规范。但是，控制流（control flow）、异常处理（error handling）、异步操作（asynchronous actions）和状态（state）呢？还有更棘手的作用（effects）呢？本章将对上述这些抽象概念赖以建立的基础作一番探究。

(貌似没有比书中更简洁的描述了)

日常的程序中，不可能脱离`控制流（control flow）、异常处理（error handling）、异步操作（asynchronous actions）和状态（state）,effects`

// TODO  need to be resolved
- 控制流
- error handling
- 异步操作asynchronous actions
- state状态
- effects影响


## Container容器 ##

我们要创建一个容器，它必须符合几个条件。

- 这个容器必须能够装载任意类型的值
- Container 是个只有一个属性的对象。尽管容器可以有不止一个的属性，但大多数容器还是只有一个。我们很随意地把 Container 的这个属性命名为 __value。
- __value 不能是某个特定的类型，不然 Container 就对不起它这个名字了。
- 数据一旦存放到 Container，就会一直待在那儿。我们可以用 .__value 获取到数据，但这样做有悖初衷。

```
var Container = function(x) {
  this.__value = x;
}

Container.of = function(x) { return new Container(x); };
```

## functor ##

> functor是实现了map函数并遵守一些特定规则的容器类型。

一个functor
```
//(a -> b) -> Container a -> Container b
Container.prototype.map = function(f){
    return Container.of(f(this._value))
}

Container.of(2).map(function(two){ return two + 2 }).map(function(data){
    // do something...
})
//=> Container(4)
```

Container 里面的值传递给map中的fn后，操作Container中的value后，再返回一个新的Container对象。map就像一个管道，数据可以不停的通过map，这就是我们之前说的compose。

functor是一个签了合约的接口。签了合约，指的是必须符合一定的规则。functor是范畴学的概念。

同样，用map来处理它有什么好处？

__让容器自己去运用函数能给我们带来什么好处？答案是抽象，对于函数运用的抽象。当 map 一个函数的时候，我们请求容器来运行这个函数。不夸张地讲，这是一种十分强大的理念。__

### Maybe functor ###

我们在定义另一种functor，我们先将之称为Maybe，它也实现了符合一定规则的map函数

```
function Maybe(x){
    this._value = x;
}
Maybe.of = function(x){
    return new Maybe(x)
}
Maybe.prototype.map = function(f){
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value))
}
Maybe.prototype.isNothing = function(){
    return (this._value === null) || (this._value === undefined)
}
```

Maybe这个functor，当传入一个null或者undefined的时候，不会报错而回返回一个Maybe对象。_value值为null.

```
Maybe.of("Malkovich Malkovich").map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig));
//=> Maybe(null)

Maybe.of({name: "Boris"}).map(_.prop("age")).map(add(10));
//=> Maybe(null)

Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(add(10));
//=> Maybe(24)
```

虽然足够函数式了，但是我们更想保持一种 pointfree 的风格。碰巧的是，map 完全有能力以 curry 函数的方式来“代理”任何 functor：

> pointfree? 它的意思是说，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。

```
//  map :: Functor f => (a -> b) -> f a -> f b
var map = curry(function(f, any_functor_at_all) {
  return any_functor_at_all.map(f);
});
```

__这样我们就可以像平常一样使用组合，同时也能正常使用 map 了，非常振奋人心。ramda 的 map 也是这样。后面的章节中，我们将在点记法更有教育意义的时候使用点记法，在方便使用 pointfree 模式的时候就用 pointfree。你注意到了么？我在类型标签中偷偷引入了一个额外的标记：Functor f =>。这个标记告诉我们 f 必须是一个 functor。没什么复杂的，但我觉得有必要提一下。__

用例demo

```
//  safeHead :: [a] -> Maybe(a)
var safeHead = function(xs) {
  return Maybe.of(xs[0]);
};

var streetName = compose(map(_.prop('street')), safeHead, _.prop('addresses'));

streetName({addresses: []});
// Maybe(null)

streetName({addresses: [{street: "Shady Ln.", number: 4201}]});
// Maybe("Shady Ln.")
```

我们看streeName的`map(_.prop('street'))`,map函数传递一个`_.prop('street')`方法，(这是一个获取对象street属性的方法，它需要接受一个对象为参数)，我们回一下map方法。

```
//  map :: Functor f => (a -> b) -> f a -> f b
var map = curry(function(f, any_functor_at_all) {
  return any_functor_at_all.map(f);
});
```

map的签名，我看着有些蒙，

