##由jQuery.prototype.init()引出
```javascript
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
	jQuery("DDSS").say().jump().fly();	//"DDSS", "18", "flying"
```

理解面向对象中，prototype属性的this的指向，prototype只是一个对象的引用，this的指向只与引用有关，与prototype隶属于谁并没有多大关系（有区别的例如constructor属性）。

```javascript
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
	bb.init();	// "BB"
	bb.say();	// "BB" 13
	
	Person.prototype = bb;
	
	var duoduo = new Person("duoduo", 1413);
	duoduo.say();	//"duoduo" 1413
	duoduo.init();	//"duoduo"
```

####关于结构体的this及结构体值类型
```javascript
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
	console.log(AA);		//{ name: 'aa', say: [Function] }	
	console.log(BB);		//{ name: 'AA', aa: { name: 'aa', say: [Function] } }	
	AA.say();				//"aa"
	BB.aa.say();			//"aa"
```