## 생성자 함수 



**생성자 함수** : new 키워드로 객체를 생성할 수 있는 함수 

생성자 함수의 이름은 일반적으로 대문자로 시작. 

생성자 함수 안에서는 `this` 키워드를 통해 생성자 함수로 생성될 객체의 속성을 지정 

```javascript
<script>
    // 생성자 함수 생성 
    function Student(){
    
	}
	// 객체 생성 
	var student = new Student(); 
	// student 는 생성자 함수로 만든객체 또는 인스턴스라고 부른다.
	// Student 는 new 키워드로 객체를 생성하므로 생성자 함수라고 부른다.
</script>
```





### 프로토타입 

**프로토타입** : 생성자 함수로 생성된 객체가 공통으로 가지는 공간 . 

생성자 함수로 객체를 만들 때는 생성자 함수 내부에 속성만 넣는다. 

프로토타입은 우리가 만드는 것이 아닌 함수 안에 자동으로 만들어지는 객체. ( 모든 자바스크립트 함수는 prototype 객체다. )

```javascript
<script>
    function Student(name, korean, math){
    	this.이름 = name; 
    	this.국어 = korean; 
    	this.수학 = math; 
	}
	Student.prototype.getSum = function() {}; 
	Student.prototype.getAverage = function() {}; 
</script>
```





### new 키워드 

```javascript
// new 키워드 사용 
<script> 
    function Constructor(value){
    	this.value = value; 
	}
	var constructor = new Constructor('Hello'); 

	alert(constructor.value); 
</script>
```

```javascript
// new 키워드 사용 x 
<script> 
    function Constructor(value){
    	this.value = value; 
	}
	var constructor = Constructor('Hello'); 

	alert(value); 
</script>
```

위의 2개의 코드 모두 Hello 정상적으로 실행. 

- 일반적으로 함수를 호출하듯이 new 키워드를 사용하지 않으면, 함수를 실행하는 동안 window 객체에 속성을 추가한 것이 된다. 하지만 new 키워드로 함수를 호출하면 객체를 위한 공간을 만들고 this 키워드는 해당 공간을 의미하게 된다. 



### 캡슐화

**캡슐화** : 잘못 사용될 수 있는 객체의 특정 부분을 사용자가 사용할 수 없게 막는 기술 

자바스크립트에서 캡슐화를 구현할 때는 클로저를 활용. 

```javascript
function Rectangle(w,h){
    var width = w ;
    var height = h ; 
    
    this.getWidth = function () {return width};  // 게터
    this.getHeight = function () {return height};
    this.setWidth = function(w){  // 세터 
        width = w;
    }
    this.setHeight = function(h){
        height = h; 
    }
}
```



### 상속 

기존의 생성자 함수나 객체를 기반으로 새로운 생성자 함수나 객체를 쉽게 만드는 것

```javascript
<script>
    function Square(length){
    	this.base = Rectangle; // Rectangle 의 속성을 Square 에 추가 
    	this.base(length, length); 
	}
	Square.prototype = Rectangle.prototype; // Rectangle 가 가진 프로토타입을 복사 
	Square.prototype.constructor = Square; // 프로토타입의 생성자 함수 재정의

	var rectangle = new Rectangle(5,7);
	var square = new Square(5); 
	alert(rectangle.getArea() + ' : ' + square.getArea());
</script>
```

상속됐다 안됐다를 판단하는 기준은 `instanceof` 키워드를 사용할 때 true 를 출력하면 상속 됐다고 판단. 