

# 목차 

[TOC]



# 1강_개발 환경과 파일생성 및 실행 방법

- 텍스트 에디터 필요 (visual code)
- 프로그래밍 언어로 작성된 파일을 실행할 수 있는 실행기가 필요 (Chrome)



통합 개발 환경이란 텍스트 에디터와 실행기가 같이 동작하는 환경. 



개발 환경 테스트 

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset=" -8">
		<title>JavaScript연습</title>
        <script>
            alert("Hello World ~! ");
        </script>
	</head>
	<body >
	</body>
</html> 
```

<img src="images/image-20200525085910583.png" alt="image-20200525085910583" style="zoom: 67%;" />





# 2강 기본 용어 정리와 출력 



### 2.1.1 표현식과 문장 

- 값을 만들어내는 간단한 코드를 '표현식'



### 2.1.2 키워드 

- 처음 만들어질 때 정해진 특별한 의미가 있는 단어를 '키워드'

|          |          |            |        |
| -------- | -------- | ---------- | ------ |
| break    | else     | instanceof | true   |
| case     | false    | new        | try    |
| catch    | finally  | null       | typeof |
| continue | for      | return     | var    |
| default  | function | switch     | void   |
| delete   | if       | this       | while  |
| do       | in       | throw      | with   |



### 2.1.3 식별자

- 자바스크립트에서 이름을 붙일 때 사용하는 단어 (변수, 속성, 함수, 메서드)
- 식별자 생성 시 규칙
  - 키워드 사용불가	
  - 숫자로 시작하면 불가
  - 특수 문자 _ 과 $ 만 허용 
  - 공백 문자 포함 불가 
- 자바 스크립트 개발자가 식별자를 만들 때 지키는 관례 
  - 생성자 함수의 이름은 대문자로 시작 
  - 변수와 인스턴스, 함수, 메서드의 이름은 **항상 소문자**로 시작
  - 식별자가 여러 단어로 이루어지면 **각 단어의 첫 글자는 대문자** . 
- 자바 스크립트의 식별자 종류 

| 구분                  | 단독으로 사용 | 다른 식별자와 사용 |
| --------------------- | ------------- | ------------------ |
| 식별자 뒤에 괄호 없음 | 변수          | 속성               |
| 식별자 뒤에 괄호 있음 | 함수          | 메서드             |



### 2.1.4 주석 

- 프로그램 진행에 영향을 끼치지 않음 

- 코드의 특정 부분을 설명. 

- HTML 내에서 주석 

  ```html
  <html>
      <!-- -->			//왼쪽과 같은 방식으로 문자열을 감싸 생성. 
  </html>
  ```

- 자바스크립트 주석 

  ```javascript
   // 를 사용해 한 줄 주석 표현 
  
   /*  */ 를 사용해 여러 줄 주석 표현 .
  ```





## 2.3 문자열 자료형 

- 문자열 자료형을 생성하는 방법 `''` 또는 `""` 으로 감싸준다.

- 문자열은 `+` 을 이용하여 연결 처리를 할 수 있다. 

  

### 이스케이프 문자

- 특수한 기능을 수행하는 문자 

- 따옴표를 사용하고 싶을 때 이스케이프 문자를 사용 

- \ 를 escape 문자라고 한다. ( **escape** - 의미 문자에서 의미를 제거 하고 문자 그 자체로 인식되도록 하는 것 )

  **의미문자 ( meta-character )** : 특별한 용도와 의미를 가지고 있는 문자

- escape 하는 방법 

  1. 이스케이프 문자를 이용  :  `\`
     2. 약속(규칙)에 따라서 변형을 한다. 일반적으로 `encoding` 한다고 얘기한다. 
              	3. 백틱(` : 숫자 1 왼쪽 옆에 있는 글자 )을 활용하는 방법. 

- | 이스케이프 문자 | 설명        |
  | --------------- | ----------- |
  | \t              | 수평 탭     |
  | \n              | 줄바꿈      |
  | \\'             | 작은 따옴표 |
  | \\"             | 큰 따옴표   |
  | \\\\            | 역 슬래시   |



예시) 

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>JavaScript연습</title>
        <script>
            console.log("동해물과 백두산이 마르고 닳도록");
            console.log("동해물과 백두산이\n 마르고 닳도록");
            console.log("동해물과 백두산이\t 마르고 닳도록");
        </script>
	</head>
	<body >
	</body>
</html> 
```

<img src="images/image-20200525095312768.png" alt="image-20200525095312768" style="zoom: 80%;" />





## 2.4 숫자 자료형 

- 자바스크립트에서는 정수와 실수 2가지만 다룬다. 

- `+`,`-`,`x`,`%`,`/` 를 사용가능. 

- 자바스크립트에서는 음수로 나눈다면 앞에 있는 숫자를 따라가게 된다.

  ```html
  <script>
  	console.log(10%3);     // 1 
  	console.log(10%-3);    // 1
  	console.log(-10%3);    // -1 
  	console.log(-10%-3);   // -1
  </script>
  ```

- 너무 큰 숫자를 사용할 경우 작은 숫자를 무시한다 (부동소수점의 특성)

- 자바스크립트에서는 오버플로우가 따로 없다.  엄청 큰 숫자가 되었을 경우 infinite 로 바뀌게 된다. 





## 2.5 불 자료형 

- 참과 거짓을 나타내는 값. 
- 자바스크립트는 `true`, `false` 로 소문자로 사용한다. 

```html
<script>
	// 비교 연산자 
    52 >= 273	// false 
    52 <= 273 	// true	
    52  < 273 	// false
    52  < 273  	// true	
    52 == 273 	// false
    52 != 273 	// true
</script>
```

- 비교연산자는 숫자 뿐만 아니라 문자도 할 수 있다. (사전순)

  ```javascript
  '가' > '나' ;  // false
  ```

  

### 자바스크립트 논리연산자의 종류

| 연산자 | 설명                                                     |
| ------ | -------------------------------------------------------- |
| !      | 논리 부정 연산자 ( 참 -> 거짓, 거짓 -> 참 ) - 단항연산자 |
| &&     | 논리곱 연산자                                            |
| \|\|   | 논리합 연산자                                            |





## 2.6 변수 

- 값을 저장할 때 사용하는 식별자 

- 변수를 사용하려면 ? 

  1. 변수 선언 : 변수를 만듬 
  2. 변수에 값 할당 (초기화)

- 변수 선언 방법

  - `let` 은 변수 값을 수시로 바꿀 수 있다. 

  - `const` 는 처음에 설정한 값 말고는 쓸 수 없다. ( == 상수형 변수 ) 

    `const` 는 선언하면서 할당을 해줘야한다. 

- 자료형 

  - 문자열,숫자,불리언,함수,객체와 같은 것 

  - JavaScript 에는 총 6가지 자료형이 있음 

    -cf. undefined 자료형 

    ​	-> 선언되지 않거나 할당되지 않은 변수 

    ​	-> 변수에 저장해도 의미가 없음. 



- ```
  10 + 10  // 덧셈 연산 : 숫자 덧셈 연산 
  
  message + message // 연결 연산 : 문자열 덧셈 연산
  ```

  

 

### 2.6.2 복합 대입 연산자 

- ```html
  <script>
  	radius = radius + 10
  	radius += 10  // 위와 아래 코드는 동일 
  <script>
  ```



### 2.6.3 증감 연산자 

- ```html
  <script>
      var radius = 10 ; 
  	console.log(radius++) // 후위
      console.log(++radius) // 전위 
  </script>
  ```

  <img src="images/image-20200525142127256.png" alt="image-20200525142127256" style="zoom:80%;" />



## 2.7 자료형 검사 

- 자바스크립트는 `typeof` 를 이용하여 자료형을 검사한다. 

  `typeof` 는 키워드이자  연산자이다.  

  ```html
  <script>
      console.log(typeof 273); 
      console.log(typeof 'String'); 
      console.log(typeof true); 
      console.log(typeof({}));
      console.log(typeof( () =>{} )); 
      console.log(typeof(alpha));
  </script>
  ```

  <img src="images/image-20200525142552460.png" alt="image-20200525142552460" style="zoom:80%;" />

  



## 2.9 입력 

- `prompt` 함수를 사용 .( 첫번째 매개변수에 메세지, 두번째 매개변수에 초기값)

  문자열을 입력 받는다. 

  ```html
  <script>
      var output = prompt('메시지', '디폴트'); 
      alert(output);
  </script>
  ```

  <img src="images/image-20200525142857877.png" alt="image-20200525142857877" style="zoom:67%;" />

- `confirm` 함수를 통해 bool 을 입력받을 수 있다. (실행이 될 경우 true 가 되거나 false 가 된다. )

  ```html
  <script>
      var output = confirm('메시지'); 
      alert(output);
  </script>
  ```

  

  <img src="images/image-20200525143021695.png" alt="image-20200525143021695" style="zoom:67%;" />



## 2.10 숫자와 문자열 자료형 변환 



### 자료형 변환

- **강제 자료형 변환**  : 개발자가 원하는 시점에 특정한 코드로 자료형 변환

  - `Number ()`

    1. 숫자처럼 생긴 문자열 변환 

       ```html
       Number('273'); // 273
       ```

    2. 숫자처럼 생기지 않은 문자열 변환

       숫자로 변환되기는 하나 **NaN**: Not a Number 이라는 값으로 변환

       ```
       Number('안녕하세요');   // NaN
       ```

    3. 불을 변환 

       ```html
       Number(true);   // 1
       number(false);  // 0
       ```

  - `String` 

    1. 숫자를 문자열로 변환

       ```html
       String(273);     //  273
       String(52.273);  //  52.273
       String(NaN);	 //  NaN
       ```

    2. 불을 문자열로 변환 

       ```html
       String(true); 	// 	true	
       String(false); 	//	false
       ```

  - `Boolean`

    ```html
    Boolean(0); 		//false
    Boolean(NaN);		//false 
    Boolean(''); 		//false
    Boolean(null); 		//false
    Boolean(undefined); //false
    ```

    위의 다섯가지 경우를 제외한 나머지는 모두 `true` 로 변환 

    

- **자동(암묵적) 자료형 변환** : 프로그래밍 언어가 내부적으로 자동으로 자료형 변환 

  - 연산자와 함께 사용 했을 때 자료형 변환 	

    - <어떤 자료형> + ""   : 앞의 자료형은 무조건 문자열로 변한다.

      ```html
      52 + "273"	 =>   "52273"
      ```

    - 숫자로 자동 변환되는 연산자는 `-`,`*`,`/`,`%` 

      ```html
      "52273" - 10   =>  52263
      ```

    - 논리 부정 연산자 `!` 를 사용할 경우 자동으로 변환

      ```html
      !true  // false  
      ```

      

  연습) 

  ```html
  <script>
      console.log(100 + 10	);// 110
      console.log(100 - 10	);// 90
      console.log(100 * 10 	);// 1000
      console.log(100 / 10	);//); 10
      console.log(""); 
      console.log("100" + 10	);// 10010
      console.log("100" - 10	);// 90
      console.log("100" * 10 );	// 1000
      console.log("100" / 10 ); // 10
      console.log(""); 
      console.log(100 + "10"	);// 10010
      console.log(100 - "10"	);// 90	
      console.log(100 * "10"	);// 1000
      console.log(100 / "10"	);// 10
      console.log(""); 
      console.log("100" + "10");// 10010
      console.log("100" - "10");// 90
      console.log("100" * "10");// 1000
      console.log("100" / "10");// 10
  </script>
  ```

  <img src="images/image-20200525150003248.png" alt="image-20200525150003248" style="zoom:80%;" />

- 자바스크립트는 자동 자료형의 변환이 다른 프로그램이 언어에 비해 유연하다. 





## 2.12 일치 연산자 

 

- `==` 은 최대한 유연하게 자료를 비교한다. 

  ```html
  <script>
  	console.log(10 == "10"); 	// true
      console.log(0==false) ;  	// true
  </script>
  ```

- `===` , `!==` 은 최대한 유연하지 않게 자료를 비교한다. 

  ```html
  <script>
  	console.log(10 === "10"); 		// false
      console.log(0 !== false) ;  	// false
  </script>
  ```

- `==` , `!=` : 비교 연산자 

- `===` , `!==` : 일치 연산자



## 2.13 조금 더 나아가기 



### 2.13.1 템플릿 문자열 - ECMAScript6



- 백틱과 `${}` 을 이용하여 보다 쉽게 표현 

  ```html
  <script>
      alert('표현식 273 + 27의 값은' + (273+27) + '입니다'); 
      alert(`표현식 273 + 27의 값은 ${273+27} 입니다. `);
  </script>
  ```



#### var - let - const  차이점

- var 키워드는 let 으로 대체가 가능하다. 

  - let 과 var 의 가장 큰 차이 

    `let ` 키워드는 오류를 조금 더 일으켜 개발자의 실수를 줄이는 것. 

- `const` 키워드는 변하지 않는 값을 의미하며 선언할 때 값을 넣어줘야 하고 이후 변경하면 안된다. 

  

- **호이스팅** - var 선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성 

  자바스크립트는 ES6 에서 도입된 let, const 를 포함하여 모든 선언(var, let, cosnt, function, function* class) 를 호이스팅한다. 

  반면 var 로 선언된 변수와는 달리 let 으로 선언된 변수를 선언문 이전에 참조하면 참조 에러 발생 

  ```html
  <script>
      console.log(foo); // undefinedz
      var foo; 
  
      console.log(bar); // Error: Uncaught ReferenceError: bar is not defined
      let bar;  // 선언 이전에 참조할 경우 참조 에러 발생 
  </script>
  ```

  



# 3강 조건문 

- 조건을 판별하는 문장. 



## if 문 

- `if( <불표현식> ){   }`

  예시) 

  ```html
  <script>
      let date = new Date(); 
      let hours =  date.getHours(); 
  	// 주의 ) 대부분의 프로그래밍 언어에서 '월'을 셀경우에는 0부터 센다. 
      // 현재 시간이 12시 이전 
      if(hours <12 ){
          alert('오전'); 
      }
  
      if(hours >= 12){
          alert('오후');
      }
  </script>
  ```

- `if(<불표현식>) {  }  else {  } ` 

- `if(<불표현식>) {  } else if(<불 표현식>) {   }  else {   } ` 



## switch 조건문 

- ```html
  <script>
  	switch(<표현식>){
             case <값> : 
             			<문장>
             			break;
             case <값2> : 
             			<문장>
             			break; 
             case <값3 	> : 
             			<문장>
             			break;            
             default : 
             			<문장>
             			break; 
      }
  </script>
  ```

- `break` 가 없을 경우 아래로 계속 내려간다. 따라서 탈출하기 위해서는 넣어줘야한다.

  예시 ) 

  ```html
  <script>
      var input = 5; 
  
      switch(input%2){
          case 0 : 
              console.log('짝수'); 
              break;
          case 1 : 
              console.log('홀수');
              break; 
          default :
              console.log('숫자가 아닙니다.'); 
              break; 
      }
  </script>
  ```

  <img src="images/image-20200525154600831.png" alt="image-20200525154600831" style="zoom: 50%;" />

  



## 삼항 연산자 

- 항이 3개라는 의미로, 조건부 연산자를 의미. 

```html
<script>
    var input = prompt('숫자를 입력해주세요',''); 
    var number = Number(input); 

    (number >0 ) ? alert('자연수') : alert('자연수 아니다'); 

</script>
```



## 짧은 조건문 



- <불표현식> ||  <불 표현식이 거짓일 때 사용하는 문장>
- <불 표현식> && <불 표현식이 참일 대 사용하는 문장> 

```html
<script>
    var number = Number(prompt('숫자를 입력해주세요','')); 
    (number > 0) || alert('자연수가 아닙니다.') ;
    (number > 0) && alert('자연수 입니다.'); 
</script>
```







# 4강 반복문 



## 4.2 배열 



- 배열 만들기 

  `[]` 를 사용하고 내부 자료를 `,` 를 통해서 구분. 

  ```
  var array = [10,20,30,40,50,60]; 
  ```

- 자바스크립트에서는 내부 배열 요소를 통일할 필요가 없다. 

  ```html
  <script>
      var array = [10,20,30,40,50,60]; 
      
      // 배열 뒤에 요소를 추가 
      array.push(70); 
      array.push(80); 
      
      array[array.length] = 90; 
      
      console.log(array);  // [10,20,30,40,50,60,70,80,90]
      
      // 배열의 요소를 제거 
      array.splice(1,1);  // 시작위치, 개수 
      console.log(array); // [10,30,40,50,60,70,80,90]
  </script>
  ```

  





## 4.3 while반복문



- ```html
  <script>
  	while(<불표현식>){
          
      }
  </script>
  ```





## 4.4 for 반복문 



- ```html
  <script>
  	for(초기식; 조건식; 종결식; ){
          문장
      }
  </script>
  ```

  

## 4.6 for in 반복문 

- 배열 내부에 있는 요소를 조금 더 간편하게 사용하기 위한 반복문

- ```html
  <script>
  	var array = ["과자", "사탕", "젤리"] ;
      for (let i in array){
          console.log(array[i]);
      }
  </script>
  ```





## 4.8 break 키워드 

- 반복문을 벗어날 때 사용하는 키워드



```html
<!-- 예시 -->
<script>
	while(true){
        if(confirm('종료할래?')){
            break; 
        }
    }
</script>
```





## 4.9 continue 키워드 

- 반복문의 다음 반복문을 실행하기 위해 사용하는 키워드 



```html
<!-- 예시 -->
<script>
	for(let i=0; i<10; i++){
        if(i%2 ==0){ // 짝수라면 
            continue; 
        }
        alert(i); 
    }
</script>
```



## 4.10 for of 반복문 



- ```html
  <script>
      var array = ["과자", "사탕", "젤리"] ;
  	for(let item of array){
          console.log(item); 
      }
  </script>
  ```





# 5강 함수 



## 함수 생성하기 

- 이름 있는 함수를 만드는 방법 

  `function name() { }  `  : 유명함수 (선언적 함수)

- 이름 없는 함수를 만드는 방법 

  `function () {  } `  : 익명함수 



```html
<script>
	function testA () { 
    	// 함수의 내용 
    }
    let testB = function () {
        // 함수의 내용
    } ;
    
    console.log(testA); 
    console.log(testB); 
</script>
```

![image-20200525163315849](images/image-20200525163315849.png)



- 이름있는 함수와 이름 없는 함수의 차이 

  선언적 함수는 스크립트 태그문을 읽을 때 먼저 실행되지만, 익명함수는 해당 줄을 읽을 때 먼저 실행된다. 

```html
<script>
    let test = function () { alert("B입니다. ")}; 
    function test() { alert("A입니다"); }
    
    test(); 
</script>
```

```html
<script>
    function test() { alert("A입니다"); }
    let test = function () { alert("B입니다. ")};    
    
    test(); 
</script>
```

위의 두개의 결과 모두 "B입니다" 를 출력. 





## 5.3 매개변수



- 매개변수 : 함수에 넣어 주는 값 
- 리턴 값 : 함수를 실행하면 반환하는 값 

```html
<script>
    function f(x){
        return x*x; 
    }

    let output = f(3); 
    alert(output) ; 
</script>
```

 

- 매개변수를 넣지 않을 경우 값은 `undefined` 로 설정된다. 
- 매개변수보다 더 많은 값을 넣을 경우 앞에서부터 순차적으로 들어간다. 

```html
<script>
    function f(x,y,z){
        console.log(x); 
        console.log(y); 
        console.log(z); 
    }

    f(); 
    f(1,2,3,4,5,6,7,8,9);
</script>
```

<img src="images/image-20200525165304113.png" alt="image-20200525165304113" style="zoom: 80%;" />

```html
<script>
	console.log(Array()); 
    console.log(Array(10)); 
    console.log(Array(1,2,3,4,5,6,7,8,9));
</script>
```

<img src="images/image-20200525170250544.png" alt="image-20200525170250544" style="zoom: 80%;" />



### 가변 매개변수 `arguments` 

- 매개변수로 들어간 값이 마치 배열처럼 적용된다. 

- 가변 매개변수는 for in 반복문을 적용할 수 없다. 

```html
<script>
	function sumAll() {
        for (let i=0; i<arguments.length; i++)
            console.log(arguments[i])
    }
   	
    console.log(sumAll(1,2)); 
    console.log(sumAll(1,2,3,4)); 
    console.log(sumAll(1,2,3,4,5,6,7,8,9,10));
</script>
```

<img src="images/image-20200525170513843.png" alt="image-20200525170513843" style="zoom:67%;" />

- **함수를 사용하는 이유** 

 	1. 코드를 입력하는 양이 줄어든다.
 	2. 수정했을 때 실수 없이 수정할 수 있다. 
 	3. 가독성이 좋아진다. 
 	4. 재사용이 가능하다. 





## 5.6 리턴 값 



- 함수를 호출했던 위치로 돌아가라는 의미. 

- `return` 을 만나게 되면, 함수는 곧바로 종료가 된다. 

```html
<script>
    function findNumber(array, number){
        
        if(!Array.isArray(array)) return ; 		// 조기 리턴
        if(typeof(number) != "number") return ; // 조기 리턴
        
        for (let i=0; i<array.length; i++){
            if(array[i] == number)
                return i; 
        }
    }

    let output = findNumber([1,2,3,4,5,6,7,8,9], 4); 
    console.log(output);
</script>
```





## 5.8 콜백 함수 



- 매개변수로 전달하는 함수

```html
<script>
    // 매개변수로 들어온 함수를 10번 실행 
    function callTenTimes(callback){
        for(let i=0; i<10; i++)
            callback(); 
    }

    function testA(){
        console.log("testA함수입니다");
    }

    callTenTimes(testA); 
    callTenTimes(function (){
        console.log("testB함수입니다")
    }); 
</script>
```

![image-20200525171942140](images/image-20200525171942140.png)

- 일반적으로 콜백함수를 가장 마지막에 써준다. 

```html
<script> 
    // 매개변수로 들어온 함수를 10번 실행 
    function callTenTimes(n,callback){
        for(let i=0; i<n; i++)
            callback(); 
    }

    function testA(){
        console.log("testA함수입니다");
    }

    callTenTimes(10,testA); 
    callTenTimes(20,function (){
        console.log("testB함수입니다")
    }); 
</script>
```

![image-20200525172009998](images/image-20200525172009998.png)





## 5.9 함수를 리턴하는 함수 



```html
<script>
    function returnFunction(){
        return function() {
            console.log("hello Function..! ")
        }
    }

    returnFunction()();
</script>
```

![image-20200525172214305](images/image-20200525172214305.png)



## 5.10 클로저 



- 장점1 . 변수를 보호할 수 있다.
- 장점2 . 한 번에 여러 변수를 선언하고 활용할 수 있다. 

```html
<script>
    function returnFunction(){
        let a = 10; 
        let b = 20; 
        let c = 30; 

        return function(){
            console.log(a); 
            console.log(b); 
            console.log(c); 
        }
    }

    returnFunction()();
</script>
```

![image-20200525172406280](images/image-20200525172406280.png)

