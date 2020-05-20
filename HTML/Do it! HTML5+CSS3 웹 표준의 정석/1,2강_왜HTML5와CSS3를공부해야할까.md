## 1-1 HTML 이란 무엇일까? 

- 컴퓨터에서 사용하는 모든 파일에는 각각 고유의 형식이 있다. 
- 웹에서는 웹에 맞는 형식인 `*.html` 또는 (`*.htm`) 로 문서를 저장해야 한다. 
- 텍스트뿐만 아니라 이미지, 링크 등 여러 요소들을 다루고 표시할 수 있어야 한다. 
- 웹에서 자유롭게 오갈 수 있는 웹 문서를 만드는 언어가 HTML 



### 웹 표준이란 무엇일까? 

- 웹 사이트를 만들 때 지켜야 하는 약속들을 정리한 것 
- 웹 표준을 지켜 사이트를 제작하면 장소나 브라우저와 상관없이 쉽게 웹 사이트를 볼 수 있다. 

- 웹 표준으로 문서 하나를 만들면 어떤 기기에서나 볼 수 있기 때문에 개발자와 디자이너의 시간 절약 
- HTML5로 문서를 만드는 것 = 웹 표준을 지킨 문서를 만드는 것 



### 왜 HTML5와 CSS3를 공부해야 할까? 

![image-20200520084637049](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520084637049.png)



**인터랙티브하다** : 사용자의 동작에 반응해서 결과물을 보여준다. 





### HTML5?  HTML? 

- 대부분의 웹 브라우저에서 HTML5를 지원하게 되면서 현재 HTML5 공식 명칭은 'HTML'이다. 



### HTML5.1 vs HTML5.2 

- HTML5 표준안부터는 웹 브라우저 업체들이 함께 참여하고 있기 때문에 표준안이 업그레이드될 때마다 웹 브라우저 업체에서 발 빠르게 수용하고 지원하며 살아있는 표준안이 되고 있다. 



## 1-2 웹 브라우저와 웹 편집기

![image-20200520085033535](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520085033535.png)

![image-20200520085343457](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520085343457.png)

![image-20200520085504378](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520085504378.png)



## 1-3 HTML 기본 문서 구조 

![image-20200520085826282](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520085826282.png)

- 웹 문서는 `html ` 태그로 시작한다. 
- `head` 태그는 문서의 정보들을 보여준다. ( 문자 인코딩 방법, 외부에서 참조하는 파일이 있을 경우 어디에서 참조하는지, 문서의 제목 )
- `body` 태그는 웹 브라우저에 드러나는 파일 



### HTML 문서와 DOCTYPE 

`<!doctype>` : 웹 브라우저에게 '이제부터 처리할 문서는 HTML 문서이고, 어떤 유형을 사용했으니 그 버전에 맞는 방법으로 해석하라.' 라고 알려주는 것. 

`<!DOCTYPE html>` 또는 `<!doctype html>` 

![image-20200520090012281](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520090012281.png)

![image-20200520090048650](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520090048650.png)

- utf-8 : 한글을 웹 브라우저에 표시하기 위해서 사용하는 방법. 이것이 안될경우 한글이 깨진다. 

![image-20200520090300066](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520090300066.png)





## 1-4 웹 문서 만들고 업로드하기

![image-20200520090408230](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520090408230.png)

- 서버 : 인터넷에 직접 연결되어있는 컴퓨터. 
- 다른 사람들이 내가 작성한 웹문서는 서버에 올려야 다른 사람들이 볼 수 있다. 



- 닷홈 무료 호스팅 정보 - **muk0920.dothome.co.kr**

  ![image-20200520091322973](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520091322973.png)

  비밀번호 : 숫자 + 특수 + 영어 





- 파일 질라 사용 

  ![image-20200520092325248](C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520092325248.png)

- 파일 -> 새 사이트 -> 닷홈 -> 닷홈 호스팅 사이트 주소와 아이디 비밀번호 입력하면 위와 같은 화면 뜬다. 

- 왼쪽은 클라이언트, 오른쪽은 서버이고 컴퓨터에서 작성한 html 파일을 드래그해서 서버의 html 폴더 내부로 옮길 경우 웹 호스팅 주소를 통해 접속하면 나의 웹 문서를 확인할 수 있다. 

  <img src="C:\Users\User\AppData\Roaming\Typora\typora-user-images\image-20200520092433480.png" alt="image-20200520092433480" style="zoom:80%;" />

