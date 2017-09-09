log = msg => console.log(msg)
var add = function(x){
    return function(y){
        return x+y
    }   
}

var curry = _.curry;
//策略性的将要把奥做的数据放到最后一个参数里。
var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

//


// var compose = function(f,g) {
//   return function(x) {
//     return f(g(x));
//   };
// };

var f1 = function(x){
    return x*x
}

var f2 = function(x){
    return 2*x
}

//重新处理下compose

var compose = function(){
    var arr = Array.prototype.slice.call(arguments,0)
    return arr.reduce(function(a,b){
        return function(x){
            return a(b(x))
        }
    })
}

var fn1 = x => 2*x

var fn2 = y => 3*y

var fn3 = z => 4*z

var t = compose(fn1,fn2,fn3);



var head = function(x) { return x[0]; };
var reverse = _.reverse;
var toUpperCase = function(x) { return x.toUpperCase(); };

var last = compose(toUpperCase,compose(head, reverse));

var target = last(['jumpkick', 'roundhouse', 'uppercut']);
//=> 'uppercut'

var snakeCase = compose(replace(/\s+/ig, '_'), toUpperCase);


// function IO(f){
//     this._value = f;
// }
// IO.prototype.map = function(f){
//     return new IO(compose(f,this._value))
// }
// IO.of = function(x){
//     return new IO(function(){
//         return x
//     })
// }

// var io_location = new IO(function(){
//     return window.location.href
// })
// io_location.map(function(str){
    
//     return str.toUpperCase()
// })._value();

// 容器 
// functor 是实现了 map 函数并遵守一些特定规则的容器类型。

function Container(x){
    this._value =  x;
}
Container.of = function(x){
    return new Container(x)
}
// 让f操作当前的 Container的_value，返回返回另一个container对象
Container.prototype.map = function(f){
    return Container.of(f(this._value))
}
var c = Container.of(3);

function id(x){
    return x
}


var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

//  map :: Functor f => (a -> b) -> f a -> f b
var map = curry(function(f, any_functor_at_all) {
  return any_functor_at_all.map(f);
});

var safeHead = function(xs) {
  return Maybe.of(xs[0]);
};

_.prop = _.curry(function(property, object){
    return object[property];
});
var HANDLE_DATA = {addresses: [{street: "Shady Ln.", number: 4201}]}

// var attrFn = compose(safeHead,_.prop('addresses'));
//调用safeHead返回一个MayContainer
 var attrFn = compose(map(_.prop('street')),safeHead,_.prop('addresses'));
// console.log(attrFn(HANDLE_DATA))

var msgtip = curry((msg,number) =>  msg+number);

var finishTransaction = msgtip('this is warning');


var _data = { balance: 200.00};
//amount.balance为目标价格，如果price大于amount就报错
var withdraw =  curry(function(price,amount){
    return  price > amount.balance ? Maybe.of(null) : Maybe.of(price)
})


// var getTwenty = compose(map(finishTransaction), withdraw(20));
// console.log(getTwenty(_data))

//说道底，map接收一个pure function  生成一个处理 类Container对象的方法，并且返回值为 类Container对象


//  maybe :: b -> (a -> b) -> Maybe a -> b    m:类Container，x:message,f为一个pure func,返回值的类型与x相同
var maybe = curry(function(x, f, m) {
  return m.isNothing() ? x : f(m.__value);
});

var getTwenty = compose(
  maybe("You're broke!", finishTransaction), withdraw(20)
);

console.log(getTwenty({ balance: 5}));
//..

var Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f) {
  return this;
}

var Right = function(x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}

var concat = curry(function(str1,str2){
    return str1+str2
})


var IO = function(f) {
  this.__value = f;
}

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
}

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.__value));
}

var io_window = new IO(function(){ return window; });

console.log(io_window.__value())