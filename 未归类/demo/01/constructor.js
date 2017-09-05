var obj = new Object();

console.log(obj)

class Person{
    constructor(){

    }
    age(){
        return 26 
    }
    learn(){

    }
}


// class Man extends Person{
//     constructor(){

//     }
  
// }

//不调用super


class Man extends Person{
    constructor(){
        super()
    }
  
}

var man =new Man()

console.log(man.age())



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
debugger
Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

let newInstance = new Square();
console.log(newInstance.name); //Polygon




var calculatorMixin = Base => class extends Base {
    calc() { }
  };
  
  var randomizerMixin = Base => class extends Base {
    randomize() { }
  };



  class Foo { }
  class Bar extends calculatorMixin(randomizerMixin(Foo)) { }


  console.log(new Bar())