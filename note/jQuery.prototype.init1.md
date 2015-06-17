##由jQuery.prototype.init()引出

####Version 0
```javascript
    function Person(name, age){
        return Person.prototype.init(name, age);
    }

    Person.prototype.init = function(name, age){
        //这里的this指向原型prototype，会被实例覆盖
        this.name = name;
        this.age = age;
    }

    Person.prototype.say = function(){
        console.log(this.name, this.age);
    }

    var lion = new Person("LION", 18);
    lion.say();
    //LION 18
    console.log(lion);
    //{}
    console.log(lion.constructor.prototype);
    //{ init: [Function], say: [Function], name: 'LION', age: 18 }
```

----------------------------------------------------

####Version 1
```javascript
    function Person(name, age){
        this.name = "HACK";
        return Person.prototype.init(name, age);
    }

    Person.prototype.init = function(name, age){
        //这里的this指向原型prototype，会被实例覆盖
        this.name = name;
        this.age = age;
    }

    Person.prototype.say = function(){
        console.log(this.name, this.age);
    }

    var lion = new Person("LION", 18);
    lion.say();                                 
    //HACK 18
    console.log(lion);                          
    //{ name: 'HACK' }
    console.log(lion.constructor.prototype);     
    //{ init: [Function], say: [Function], name: 'LION', age: 18 }
```

----------------------------------------------------

####Version 2
```javascript
    function Person(name, age){
        this.name = "HACK";
        return (function(name, age){            
            //这里面的this不指向new Person()构造出来的对象，
            //指向全局对象，在浏览器里即指向window
            this.name = name;
            this.age = age;
            //该函数缺少返回值
        })(name, age);
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
    //HACK undefined
    console.log(lion);
    //{ name: 'HACK' }
    console.log(lion.constructor);
    //[Function: Person]
```

----------------------------------------------------

####Version 3
```javascript
    function Person(name, age){
        this.name = "HACK";
        return (function(){         
            //这里面的this不指向new Person()构造出来的对象
            this.name = name;
            this.age = age;
            return this;            //指向全局对象，在浏览器里即指向window
        })();
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
    //Object #<Object> has no method 'say'
    console.log(lion);
    console.log(lion.constructor);
    //[Function: Object]
```

----------------------------------------------------

####Version 4
```javascript
    function Person(name, age){
        this.name = "HACK";
        直接返回一个函数
        return function(){          
            //这里面的this不指向new Person()构造出来的对象
            this.name = name;
            this.age = age;
        };
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
    //Object #<Object> has no method 'say'
    console.log(lion);
    console.log(lion.constructor);
    //[Function: Object]
```

----------------------------------------------------

####Version 5
```javascript
    function Person(name, age){
        this.name = "HACK";
        var that = this;
        return (function(){         
            //这里面的this不指向new Person()构造出来的对象
            that.name = name;
            that.age = age;
        })();
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
    //LION 18
    console.log(lion);
    //{ name: 'LION', age: 18 }
    console.log(lion.constructor);
    //[Function: Person]
```

