//event.js 文件
// var EventEmitter = require('events').EventEmitter; 
// var event = new EventEmitter(); 
// event.on('some_event', function(value) { 
// 	console.log('some_event 事件触发',value); 
// }); 
// setTimeout(function() { 
// 	event.emit('some_event',123); 
// }, 1000); 

var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
var util = require('util');

// event.on('some_event', function(value) { 
// 	console.log('some_event 事件触发',value); 
// }); 

// event.on('some_event', function(value) { 
// 	console.log('some_event 事件触发',value,2); 
// }); 
// 	event.emit('some_event',123); 
// function Person(){

// }
// util.inherits(Person,EventEmitter)
// var person = new Person()
// person.on('some_event', function(value) { 
// 	console.log('some_event 事件触发',value); 
// }); 

// person.on('some_event', function(value) { 
// 	console.log(this,'some_event 事件触发',value,2); 
// }); 
// person.emit('some_event',123); 

var proxy = new EventEmitter()
var i = 0;
var select = (callback)=>{
	proxy.once('cache',function(msg){
		console.log(msg)
	})
	// setTimeout(()=>{
		proxy.emit('cache',i++)
	// },10*1000)
};
setInterval(select,0)
