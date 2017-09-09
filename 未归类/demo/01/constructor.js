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
  
// // }

// //不调用super


// class Man extends Person{
//     constructor(){
//         super()
//     }
  
// }

// var man =new Man()

// console.log(man.age())



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

// class Rectangle {}
// debugger
// Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

// console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
// console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

// let newInstance = new Square();
// console.log(newInstance.name); //Polygon




// var calculatorMixin = Base => class extends Base {
//     calc() { }
//   };
  
//   var randomizerMixin = Base => class extends Base {
//     randomize() { }
//   };



//   class Foo { }
//   class Bar extends calculatorMixin(randomizerMixin(Foo)) { }


//   console.log(new Bar())