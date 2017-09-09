

class Person{
    constructor(){

    }
    age(){
        return 26 
    }
    learn(){

    }
}

var p = new Person();
class Man extends Person{
    constructor(){
        super()
    }
  
}

var man =new Man()

class A {
 constructor(){
    //  super()
 }
 afn(){
     console.log(1)
 }
 bfn(){
     console.log(2)
 }
}
// console.log(man.age())

//此时想把 p对象的prototye指向 为A ,如下操作

Person.__proto__ = A;



//对象的原型链，指向A.prototope

//
//来自官网的一个demo

class Polygon {
    constructor() {
        this.name = "Polygon";
    }
}

class Square extends Polygon {
    constructor() {
        super();
    }
}

class Rectangle {}
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

// console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
// console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

let newInstance = new Square();


// var calculatorMixin = Base => class extends Base {
//     calc() { }
//   };
  
//   var randomizerMixin = Base => class extends Base {
//     randomize() { }
//   };


//   var t = function(Base){
//       return class extends Base{

//       }
//   }

//   class Foo { }
//   class Bar extends calculatorMixin(randomizerMixin(Foo)) { }


//   console.log(new Bar())