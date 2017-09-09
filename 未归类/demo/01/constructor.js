<<<<<<< HEAD
// var obj = new Object();
var log = console.log.bind(this);

function Word(){
    this.num = 5
}
Word.prototype = {
    add: function(){}
}
log(new Word().__proto__ == Word.prototype)
var w =new Word()

// class Person{
//     constructor(){
//         this.age = 0;
//         this.sex = 'male';
//     }
//     walk(){
//         log('person,talk')
//     }
//     talk(){
//         log('talk')
//     }
// }


// var p = new Person();

// 测试，extends 一个对象 testObj
=======

>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74


testObj = Object.create(null);
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
//实现man
class Man extends Person{
    constructor(){
        super()
    }
    talk(){
        log('talk')
    }
    get age(){
        return 5
    }
    set age(age){
        return 6
    }
}

//实例化一个man

log(new Man())

//实现boy   extends Man

class Boy extends Person{
    constructor(){
        super()
    }

}

<<<<<<< HEAD
// console.log(obj)

// class Person{
//     constructor(){

//     }
//     age(){
//         return 26 
//     }
//     learn(){

//     }
// }


// // class Man extends Person{
// //     constructor(){

// //     }
=======
var p = new Person();
class Man extends Person{
    constructor(){
        super()
    }
>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74
  
// // }

// //不调用super

<<<<<<< HEAD

// class Man extends Person{
//     constructor(){
//         super()
//     }
  
// }
=======
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
>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74

// var man =new Man()

<<<<<<< HEAD
// console.log(man.age())
=======
>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74

//对象的原型链，指向A.prototope

//
//来自官网的一个demo


// //来自官网的一个demo


// class Polygon {
//     constructor() {
//         this.name = "Polygon";
//     }
// }

// class Square extends Polygon {
//     constructor() {
//         super();
//     }
// }

<<<<<<< HEAD
// class Rectangle {}
// debugger
// Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
=======
class Rectangle {}
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);
>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74

// console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
// console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

<<<<<<< HEAD
// let newInstance = new Square();
// console.log(newInstance.name); //Polygon




=======
let newInstance = new Square();


>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74
// var calculatorMixin = Base => class extends Base {
//     calc() { }
//   };
  
//   var randomizerMixin = Base => class extends Base {
//     randomize() { }
//   };
<<<<<<< HEAD
=======

>>>>>>> 634992bbb61a6a99a16455f21c372e23bf972f74

//   var t = function(Base){
//       return class extends Base{

//       }
//   }

//   class Foo { }
//   class Bar extends calculatorMixin(randomizerMixin(Foo)) { }


//   console.log(new Bar())