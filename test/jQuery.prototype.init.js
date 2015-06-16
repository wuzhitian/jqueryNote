//-------------------------------------------------------------------
function jQuery(name){
	return new jQuery.prototype.init(name);
	//将jQuery.prototype.init当做构造函数
}
jQuery.prototype.init = function(name){
	this.name = name;
	this.height = 18;
}
jQuery.prototype.say = function(){
	console.log(this.name);
	return this;
}
jQuery.prototype.jump = function(){
	console.log(this.height);
	return this;
}

// 将jQuery.prototype引用至jQuery.prototype.init.prototype
jQuery.prototype.init.prototype = jQuery.prototype;
jQuery.prototype.init.prototype.fly = function(){
	console.log("flying");
}
jQuery("DDSS").say().jump().fly();

//理解面向对象中，prototype属性的this的指向，
//prototype只是一个对象的引用，
//this的指向只与引用有关，
//与prototype隶属于谁并没有多大关系（有区别的例如constructor属性）。

//-------------------------------------------------------------------
function Person(name, height){
	this.name = name;
	this.height = height;
}

var bb = {
	name: "BB"
	,init: function(){
		//this指向bb
		this.height = 13;
		console.log(this.name);
	}
	,say: function(){
		console.log(this.name, this.height);
	}
}
bb.init();	//"BB"
bb.say();	//"13"

Person.prototype = bb;

var duoduo = new Person("duoduo", 1413);
duoduo.say();	//"13"
duoduo.init();	//"duoduo"

//-------------------------------------------------------------------
//关于结构体的this及结构体值类型
var AA = {
	name: "AA"
	,aa : {
		name: "aa"
		,say: function(){
			console.log(this.name);
		}
	}
};
BB = AA;
AA = AA.aa;
console.log(AA);
console.log(BB);

AA.say();
BB.aa.say();

//-------------------------------------------------------------------
function Person(name, height){
	this.name = name;
	this.height = height;
}
Person.prototype.init = function(name, height){
	this.name = name;
	this.height = height;
}

Person.prototype.say = function(){
	console.log(this.name, this.height);
}

var aa = new Person("aa", 12);
aa.say();
aa.init("AA", 45);
aa.say();

//-------------------------------------------------------------------
function Animal(name, age){
	this.name = "HACK";
	return Animal.prototype.init(name, age);
	//1. Animal.prototype.init.apply(this,arguments);
	
	//2. Animal.prototype.init 
	//	 这个this.name
	//	 是Animal.prototype.name
	//	 初始化了bb.name，也就不从原型链往上找name了
}
Animal.prototype.init = function(name, age){
	console.log(this);
	this.name = name;
	this.age = age;
	return this;
}
Animal.prototype.say = function(){
	console.log(this.name, this.age);
}
var bb = new Animal("LION", 13);
bb.say();
var cc = Animal("DDCK", 14);
console.log(cc);
bb.say.call(cc);

//-------------------------------------------------------------------
function Person(name, age){
	this.name = "HACK";
	// return (function(name, age){
	// 	this.name = name;
	// 	this.age = age;
	// })(name, age);
	return Person.prototype.init(name, age);

}

Person.prototype.init = function(name, age){
	this.name = name;
	this.age = age;
}

Person.prototype.say = function(){
	console.log(this.name, this.age);
}

var lion = new Person("LION", 18);
lion.say();
console.log(lion);