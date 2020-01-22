## JavaScript 



### Javascript 란 ? 

- 웹 브라우저에서 많이 사용하는 프로그래밍 언어 ( 동적인 처리를 위한 언어 )



정적 : 바꾸기 전까지는 동일하게 보이는 것. 



정적 자원 : gif, jpg, png , html, txt ...



초기의 웹은 정적인 자원을 공유하기 위해 만들어졌다. 

​	-> 정적인 자원을 제공하는 가장 큰 문제점 : 사용자 관점에서 뭐가 어디에, 어떤 구조로 저장되어있는지 모른다. 

사용자가 입력하는 값에 따라 다른 값을 반환해준다 -> 동적 페이지 





옐로우북 서비스 (디렉터리 서비스) 

CGI 기술 ( Common Gateway Interface ) - 동적인 서비스의 초기 모델 

J Query -> 문서를 마음대로 주무를 수 있도록 만들어준다. 

Node -> 자바 스크립트의 실행 환경

Web : HTTP 프로토콜 기반의 서비스 

​		   1_ 요청 응답 구조 

​		   2_ Stateless => 상태 관리(유지)를 하지 않는다. 



### HTML 파일을 만들고 실행하는 방법 

- HTML ( HyperText Markup Language )
- [파일] -> [새 파일]을 선택해 새 파일 대화상자 열기 
- HTML 페이지 선택해 파일 생성 -> 코드 생성 



**마크업 언어**란 마크(tag)를 가지고 둘러싼 언어. -> 다른 환경의 머신 간에 정보를 교환하기 위해 등장한 언어. ( 서버가 가진 정보를 사용자(클라이언트 브라우저)에게 보여주기 위해 태그와 같은 마크를 통해 구분지어뒀다. )

마크업 언어는 트리 구조의 형태. 



Semantic web ( 의미 기반의 웹 )- 데이터를 보여주는 것이 아닌 데이터의 가치를 가지고 판단하는 .. 

​		-> 의미를 가지고 있는 tag 를 사용 



HTML 에서 추구하는 철학 	

 1. 본연의 기능 요소로 돌아가자

 2. 개발 편의성 - 개발자가 편리해야 한다. 

    동일한 의미가 다른 형태로 들어올 때 이것을 정규화하는 과정이 필요. 





**HTML doctype** -> 저 문서를 해석하는 녀석에게 이 문서가 어떠한 구조를 가지는지 알려주는 것. 그래야만 해당 브라우저가 문서 구조에 맞도록 사용자에게 보여주게 된다.  



### 자바 스크립트 코드 위치

- 기본 페이지의 head 태그 사이에 script 태그 삽입 
  - script 태그 사이에 자바 스크립트 코드 입력 
- HTML5 에서는 script 태그에 type 속성을 적지 않는게 원칙. 





랜더링 : 기호로 쌓여있는 것들을 해석해서 사용자에게 보여주는 작업 





### 강의 초기 작업 

1. visual studio code 와 node.js 설치 

2. 명령 프롬프트 실행 ( 시작 > cmd.exe ) 해서 `C:` 밑에 `javascript` 디렉터리 생성 

3. node 설치 여부 검색 

   ```bash
   C:\javascript> node --version
   
   v12.14.1
   ```

4. Visual Studio Code 실행 > File > Open Folder > Javascript 

5. 새문서 `code1-3` 생성 및 작업

6. https://www.npmjs.com/package/http-server   <- http-server 설치 

7. ```bash
   C:\javascript> npm init -y  # 내가 노드 기반 파일을 만들때 관련 설정들을 초기화하는 작업.
   							# -y 옵션은 묻지 않고 그냥 바로 설치 .
   ```

   ```bash
   C:\javascript> npm install http-server -g   # -g 옵션은 어디에서 쓸 수 있도록 전역으로 설치.
   
   # -g 옵션을 주면 C:\Users/PC_USER_NAME\AppData\Roaming\npm\node_modules 경로에 설치된다.
   ```

   모든 프로그램은 실행하면 그 프로그램이 필요한 정보들을 가지고 올라온다. 그 정보 중 하나가 시스템에서 가지고 있는 정보(환경변수). 

8. ```basic
   C:\javascript>npx http-server
   
   Starting up http-server, serving ./
   Available on:
     http://10.0.75.1:8080
     http://59.29.224.20:8080
     http://192.168.56.1:8080
     http://192.168.118.1:8080
     http://10.0.0.1:8080
     http://127.0.0.1:8080
     http://172.29.245.65:8080
   Hit CTRL-C to stop the server
   ```

   브라우저를 통해서 http://localhost:8080/code1-3.html 로 접속 ( web 서버라는 녀석에게 요청하여 자신이 가진 경로의 정보를 읽어 브라우저에 주는 것. )

   크롬에서 `F12` 를 누르면 개발자 도구가 나온다. 

   Console 에 내가 원하는 정보가 나오도록 할 수 있다. 

9. 





### 명령 

HTML 문서는 위에서부터 아래로 순차적으로 실행한다. 

```html
<script>
	alert("#1"); 	# 경고 알림을 띄우는 행동 
    console.log("#1"); 	# 콘솔을 통해 확인하기 위한 명령어. 
</script>
```



```bash
$ npm i http-server  # http-server 설치 (간단한 서버 기능)

# http-server 는 매우 단순해서 그것이 실행된 환경에서 파일이 제공된다. 실행한 위치가 웹루트가 된다. 
# 기준 디렉터리(웹 루트) 아래에 있는 것들만 제공한다. 
```



```html
// script 를 head 상단에 위치시키기 위해서 이벤트 처리. 
<script>
    window.onload = function(){		// on 으로 시작하는 것은 대부분 이벤트 
	기능 							   // 해당 되는 문서가 다 읽히고 나면 실행되도록 한다. 
	}
</script>
```

