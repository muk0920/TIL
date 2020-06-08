# 목차

[TOC]



# 1. 웹 프로그래밍 

## 1-1 웹 프로그래밍이란? 

1. 웹프로그래밍이란  웹 애플리케이션을 구현하는 행위 

2. 웹 애플리케이션이란, 웹을 기반으로 작동되는 프로그램

3. 웹이란 1개 이상의 사이트가 연결되어 있는 인터넷 서비스의 한가지 형태를 의미 

4. 인터넷이란, 1개 이상의 네트워크가 연결되어 있는 형태

![image-20200529084035778](images/image-20200529084035778.png)

- **프로토콜 ( Protocol )**  : 네트워크 상에서 약속한 통신규약(Http, FTP, SMTP, POP, DHCP)
  - FTP : File Transfrom Protocol  - 파일을 주고 받을 때 사용하는 프로토콜 
  - SMTP - 메일을 전송해주는 것
  - POP -  메일을 받는 것 
  - DHCP - 동적으로 IP 주소가 바뀌는 것. 
- **IP** : 네트워크 상에서 컴퓨터를 식별할 수 있는 주소 
- **DNS** : IP 주소를 인간이 쉽게 외우도록 맵핑한 문자열 
- **Port** : IP 주소가 컴퓨터를 식별할 수 있게 해준다면, Port 번호는 해당 컴퓨터의 구동되고 있는 **프로그램을 구분할 수 있는 번호** 

​	



## 1-2 JAVA웹 

JAVA 플랫폼( J2SE, J2EE, J2ME(모바일환경) ) 중에서 J2EE를 이용한 웹 프로그래밍

![image-20200518224850718](images/image-20200518224850718.png)



## 1-3 웹 프로그램의 동작 



![image-20200518225011678](images/image-20200518225011678.png)



## 1-4 필요한 학습 



1. JAVA : Java 웹 애플리케이션을 구현하기 위한 선행 학습 필요
2. HTML : 웹 애플리케이션을 구현하기 위한 기본 언어 
3. JavaScript : 클라이언트 기능을 구현하기 위한 언어 
4. JQuery : JavaScript 의 대표적인 라이브러리로써, 클라이언트 사이드 스크립트 언어를 단순화 할 수 있다. 
5. CSS : 웹 애플리케이션의 레이아웃 및 스타일을 지정하는 언어 

![image-20200518225336650](images/image-20200518225336650.png)





# 3. JSP 맛보기 



## 3-1 JSP 문서 작성하기 

**JSP 특징** 

- **동적** 웹 애플리케이션 컴포넌트
- .jsp 확장자 
- 클라이언트의 요청에 동적으로 작동하고, 응답은 html을 이용.
- jsp는 **서블릿으로 변환되어 실행** 
- MVC패턴에서 View 로 이용됨 . 

![image-20200518232832648](images/image-20200518232832648.png)



1. **프로젝트 생성**

![image-20200518233145940](images/image-20200518233145940.png)

![image-20200518233226771](images/image-20200518233226771.png)

Context root : 각 프로젝트를 구분하는 이름 (하나하나의 웹 애플리케이션을 지칭하는 이름)



2. JSP 파일 생성 

![image-20200518233248997](images/image-20200518233248997.png)

`<head /> ` : 어떠한 정보를 정의 

`<body />` : 화면에 출력되는 부분 





3. JSP 파일 실행 

![image-20200518233319820](images/image-20200518233319820.png)



- `Ctrl + F11`  : 해당 파일을 서버에서 실행 



## 3-2 JSP 아키텍처 



![image-20200518234643427](images/image-20200518234643427.png)





# 4. Servlet 맛보기 



HttpServlet 를 상속받아야 Servlet 클래스가 된다. 



Servlet 파일은 `Java Resources-src` 밑에 생성이 된다. 



anotation 을 이용하여 `HWorld` 라는 닉네임을 지정

![image-20200529092410182](images/image-20200529092410182.png)





url 맵핑 경로 : http://localhost:8181/`contextRoot명` /`닉네임`



맵핑을 하는 방법 2가지 

1. web.xml 을 이용 

   ![image-20200529093211679](images/image-20200529093211679.png)

2. 자바 anotation 을 이용하는 방법

   해당 자바 코드 안에 `@WebServlet("hw")`







# 5강 Servlet 본격적으로 살펴보기



`doGet` 



요청하는 객체는 클라이언트로부터 정보를 받을 수 있다. 





```java
response.setContentType("text/html")
```

응답을 해줄 때는 html 파일 형식으로 응답을 한다. 



  

![image-20200529150252777](images/image-20200529150252777.png)

서버의 요청이 있을 때 마다 스레드가 생성되어 실행되기 때문에 다른 CGI 에 비해서 부하가 적다. 





HttpServletRequest 객체를 이용하여 Parameter 값을 얻는다. 

`getParameter(name)` : 이름에 해당되는 value 값을 얻는것. 

`getParameterValues(name)` : 체크박스 처럼 값이 여러개일 경우 사용 

`getParameterNames()` : html 에서 넘어온 이름들을 얻는 것. 

반환값은 다 string 





Tomcat 은 한글을 지원하지 않기 때문에 개발자가 별도의 한글인코딩을 하지 않으면 한글이 깨져보이는 현상이 있다. 

get 의 한글 설정은 server.xml 파일에서 해주면 되고 , post 의 한글 설정은 자바 파일 내에서 해주면 된다. 





서블릿 초기화 파라미터는 `<servlet> </servlet> ` 내에 입력해줘야한다.  - 특정 서블릿에만 해당되기 때문에. 





ServletContext 는 특정한 서블릿만 사용하는 것이 아니기 때문에, web.xml 의 공통부분에 기술한다. 주의할 점은 서블릿을 맵핑하는 태그보다는 상단에 위치해야한다. 











# 18강 데이터베이스 2 



JDBC의 특징은 다양한 데이터베이스에 대해서 별도의 프로그램을 만들 필요 없이, 해당 데이터 베이스의 JDBC를 이용하면 하나의 프로그램으로 데이터베이스를 관리할 수 있다. 



#### 데이터베이스 연결 순서 



**JDBC 드라이버 로드**   :  [DriverManager] - `Class.forName()` 

**데이터베이스 연결**  :  [Connection] - `DriverManager.getConnection(url, uid, upw);` 

**SQL문 실행** :  [Statement]  - `connection.createStatement()` 

**데이터베이스 연결 해제**  : [ResultSet]  -  `statement.executeQuery()` , `statement.executeUpdate()` 





##### Statement 객체 - 쿼리를 실행하는 객체

- `executeQuery()` : SQL문 실행 후 여러 개의 결과값 생기는 경우 사용  (반환형이 ResultSet 객체)

  ex_ select 

- `executeUpdate()` : SQL문 실행 후 테이블의 내용만 변경되는 경우 사용 ( 반환형이 int 형 )

  ex_ insert, delete, update 



-  ResultSet 레코드 셋 
  - next() : 다음 레코드로 이동 
  - previous() : 이전 레코드로 이동 
  - first() : 처음으로 이동 
  - last() : 마지막으로 이동 
  - get메소드(getString, getInt) 



```java
<%!
    Connection connection ; 
	Statement statement; 
	ResultSet resultSet; 
 
	String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"; 
	String url = "jdbc:sqlserver://localhost:9036; database=master; integratedSecurity=true";
    String query = "select * from member"; 
%>
        
<%
	try{
        Class.forName(driver);  // JDBC 드라이버 로드 
        connection = DriverManager.getConnection(url);  // 데이터베이스 연결 
        statement = connection.createStatement(); 
        resultSet = statement.executeQuery(query); 
        
        while(resultSet.next()){
            ...
        }
    }
%>
```





# 19강 데이터베이스 3 



### 실습 흐름도

![image-20200602220242975](images/image-20200602220242975.png)



#### join.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<form action="JoinOk.java" method = "post">
		이름 : <input type="text" name = "name" size = "10"><br />
		아이디 : <input type="text" name = "id" size ="10"><br />
		비밀번호 : <input type="password" name="pw" size ="10"><br />
		전화번호 :  <select name ="phone1">
			<option value="010">010</option>
			<option value="016">016</option>
			<option value="017">017</option>
			<option value="018">018</option>
			<option value="019">019</option>
			<option value="011">011</option>
		</select> - 
		<input type="text" name ="phone2" size = "4" >-<input type="text" name ="phone3" size = "4" ><br />
		성별 구분 : <input type="radio" name="gender" value ="man"> 남자 &nbsp; <input type="radio" name="gender" value="woman">여자<br />
		<input type="submit" value="회원가입"> <input type="reset" value = "취소">
	</form>
</body>
</html>
```

![image-20200602220334745](images/image-20200602220334745.png)





#### JoinOk.java  - servlet 

```java
package com.javalec.ex;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*; 

@WebServlet("/JoinOk")
public class JoinOk extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	private Connection connection ; 
	private Statement stmt; 
	
	private String id, pw, name, phone1, phone2, phone3, gender; 
	
    public JoinOk() {
        super();
    
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request, response); 
	}
	
	private void actionDo(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
		req.setCharacterEncoding("EUC-KR");
		
		id = req.getParameter("id");
		pw = req.getParameter("pw");
		name = req.getParameter("name");
		phone1 = req.getParameter("phone1");
		phone2 = req.getParameter("phone2");
		phone3 = req.getParameter("phone3");
		gender = req.getParameter("gender");
		
		String query = "insert into member values ('"+name+"','"+id+"','"+pw + "','" + phone1 + "','" + phone2 + "','" + phone3 + "','" + gender + "')";
		
		try{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); 
			connection = DriverManager.getConnection("jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true");
			stmt = connection.createStatement(); 
			int i = stmt.executeUpdate(query); 
			
			if(i==1){
				System.out.println("insert success");
				res.sendRedirect("joinResult.jsp"); 
			}else{
				System.out.println("insert fail");
				res.sendRedirect("join.html"); 
			}
		}catch(Exception e){
			e.printStackTrace(); 
		}finally{
			try{
				if(connection != null) connection.close(); 
				if(stmt != null) stmt.close(); 
			}catch(Exception e2){
				e2.printStackTrace();
			}
		}
	}
}
```

![image-20200602222501357](images/image-20200602222501357.png)



#### joinResult.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	회원가입이 정상 처리 되었습니다. <br />
	<a href = "login.html"> 로그인 </a>
</body>
</html>
```





#### login.html

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<form action="LoginOk" method="post">
		아이디 : <input type="text" name="id"><br />
		비밀번호 : <input type="text" name="pw"><br />
		<input type="submit" value="로그인">
	</form>
</body>
</html>
```





#### LoginOk.java - servlet 

```java
package com.javalec.ex;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.*; 

@WebServlet("/LoginOk")
public class LoginOk extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private Connection conn; 
	private Statement stmt; 
	private ResultSet resultSet; 
	
	private String name, id, pw, phone1, phone2, phone3, gender ;
	

    public LoginOk() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		actionDo(request, response); 
	}
	
	private void actionDo(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
		id = req.getParameter("id"); 
		pw = req.getParameter("pw");
		
		String query = "select * from member where id = '"+ id+ "'and pw = '" + pw + "'";
		String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		String url = "jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true";
		
		try{
			Class.forName(driver); 
			conn = DriverManager.getConnection(url); 
			stmt = conn.createStatement(); 
			resultSet = stmt.executeQuery(query); 
			
			while(resultSet.next()){
				name = resultSet.getString("name"); 
				id = resultSet.getString("id");
				pw = resultSet.getString("pw");
				phone1 = resultSet.getString("phone1");
				phone2 = resultSet.getString("phone2");
				phone3 = resultSet.getString("phone3");
				gender = resultSet.getString("gender");
			}
			
			HttpSession httpSession = req.getSession(); 
			httpSession.setAttribute("name",name); 
			httpSession.setAttribute("id", id); 
			httpSession.setAttribute("pw", pw); 
			
			res.sendRedirect("loginResult.jsp");
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try{
				if(stmt != null) stmt.close(); 
				if(conn != null ) conn.close(); 
				if(resultSet != null) resultSet.close(); 
			}catch(Exception e2){
				e2.printStackTrace();
			}
		}
	}
}
```

![image-20200602223941759](images/image-20200602223941759.png)



#### loginResult.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%!
		String id, name, pw; 
	%>
	
	<%
		id = (String)session.getAttribute("id"); 
		name = (String)session.getAttribute("name"); 
		pw = (String)session.getAttribute("pw"); 
	%>
	
	<%= name %> 님 안녕하세요. <br />
	
	<a href="modify.jsp"> 정보 수정하기 </a>
</body>
</html>
```





#### modify.jsp 

```jsp
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%!
		Connection conn; 
		Statement stmt; 
		ResultSet resultSet; 
		
		String id, pw, name, phone1, phone2, phone3, gender ; 
	%>
	
	<%
		id = (String)session.getAttribute("id"); 
	
		String query = "select * from member where id= '" + id + "'";
		
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); 
		conn = DriverManager.getConnection("jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true");
		stmt = conn.createStatement(); 
		resultSet = stmt.executeQuery(query); 
		
		while(resultSet.next()){
			name = resultSet.getString("name");
			pw = resultSet.getString("pw"); 
			phone1 = resultSet.getString("phone1"); 
			phone2 = resultSet.getString("phone2"); 
			phone3 = resultSet.getString("phone3"); 
			gender = resultSet.getString("gender"); 
		}
	%>
	
	<form action ="ModifyOk" method = "post">
		이름 : <input type="text" name = "name" size = "10" value=<%= name %>><br />
		아이디 : <%= id %><br />
		비밀번호 : <input type="password" name ="pw" size="10" ><br />
		전화번호 : <select name="phone1">
			<option value="010">010</option>
			<option value="016">016</option> 
			<option value="017">017</option>
			<option value="018">018</option>
			<option value="019">019</option>
			<option value="011">011</option>
		</select> - 
		<input type="text" name="phone2" size="5" value=<%= phone2 %>> - <input type="text" name="phone3" size="5" value=<%= phone3 %>> <br />
		
		<%
			if(gender.equals("man")){
		%>
		성별 구분 : <input type = "radio" name = "gender" value ="man" checked="checked"> 남 &nbsp; <input type = "radio" name="gender" value ="woman">여 <br />
		<%
			} else{
		%>
				성별 구분 : <input type = "radio" name = "gender" value ="man"> 남 &nbsp; <input type = "radio" name="gender" value ="woman" checked = "checked">여 <br />
		<% } %>
		
		<input type="submit" value="정보수정"> <input type="reset" value="취소">
		
	</form>
</body>
</html>
```



#### ModifyOk.java - servlet

```java
package com.javalec.ex;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.*; 


@WebServlet("/ModifyOk")
public class ModifyOk extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private Connection connection; 
	private Statement stmt; 
	private ResultSet resultSet; 
	HttpSession httpSession; 
	
	private String name, id, pw, phone1, phone2, phone3, gender;  
	
    public ModifyOk() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		actionDo(request, response); 
	}
	
	private void actionDo(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException{
		req.setCharacterEncoding("EUC-KR");
		httpSession = req.getSession(); 
		
		name = req.getParameter("name"); 
		id = req.getParameter("id");
		pw = req.getParameter("pw");
		phone1= req.getParameter("phone1");
		phone2= req.getParameter("phone2");
		phone3= req.getParameter("phone3");
		gender = req.getParameter("gender");
		
		if(pwConfirm()){
			System.out.println("OK");
			String query = "update member set name = '" + name + "', phone1 = '" + phone1 + "',phone2 = '" + phone2 + "',phone3='" + phone3 + "',gender='" + gender + "'";
			
			try{
				Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
				connection = DriverManager.getConnection("jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true"); 
				stmt = connection.createStatement(); 
				int i = stmt.executeUpdate(query); 
				
				if(i==1){
					System.out.println("update sucess");
					httpSession.setAttribute("name",name); 
					res.sendRedirect("modifyResult.jsp"); 
				}else{
					System.out.println("update fail");
					res.sendRedirect("modify.jsp");
				}
			}catch(Exception e){
				e.printStackTrace(); 
			}finally{
				try{
					if(stmt != null) stmt.close(); 
					if(connection != null) connection.close(); 
				}catch(Exception e2){
					e2.printStackTrace();
				}
			}
		}else{
			System.out.println("NG");
		}
	}
	
	
	private boolean pwConfirm(){
		boolean rs = false; 
		String sessionPw = (String)httpSession.getAttribute("pw"); 
		
		if(sessionPw.equals(pw)){
			rs= true; 
		}else{
			rs = false; 
		}
		return rs; 
	}
}
```

![image-20200602225730633](images/image-20200602225730633.png)



#### modifyResult.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%= session.getAttribute("name") %>님의 회원정보 수정이 정상 처리 되었습니다. <br />
	
	<a href = "logout.jsp">로그아웃</a> &nbsp; 
	<a href = "modify.jsp">정보수정</a>
</body>
</html>
```





#### logout.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<%
		session.invalidate(); 
		response.sendRedirect("login.html"); 
	%>
</body>
</html>
```





# 20강. 커넥션풀 



### DAO _ DTO

- **DAO** : Data Access Object  
  - DB에 접근하여 어떠한 로직을 수행하는 객체 
  - 데이터베이스에 접속해서 데이터 추가, 삭체, 수정 등의 작업을 하는 클래스. 
  - 유지보수 및 코드의 모듈화를 위해 별도의 DAO 클래스를 만들어 사용한다. 



- **DTO** : Data Transfer Object 

  - Data를 모아서 객체로 묶어서 하나로 관리하는 객체  
  - DAO 클래스를 이용하여 데이터베이스에서 데이터를 관리할 때 데이터를 일반적인 변수에 할당하여 작업할 수도 있지만, 해당 데이터의 클래스르 만들어 사용. 

  

#### 예제 1) 

##### MemberDTO.java

```java
package com.javalec.daotoex;

public class MemberDTO {

	private String name;
	private String id;
	private String pw;
	private String phone1;
	private String phone2;
	private String phone3;
	private String gender;
	
	public MemberDTO(String name, String id, String pw, String phone1, String phone2, String phone3, String gender) {
		this.name = name;
		this.id = id;
		this.pw = pw;
		this.phone1 = phone1;
		this.phone2 = phone2;
		this.phone3 = phone3;
		this.gender = gender;
	}

	// ... 
    //     getter , setter 존재 
    // ...
}
```

##### MemberDAO.java

```java
package com.javalec.daotoex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class MemberDAO {

	private String url = "jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true";
	
	public MemberDAO() {
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<MemberDTO> memberSelect() {
		
		ArrayList<MemberDTO> dtos = new ArrayList<MemberDTO>();
		
		Connection con =null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			con = DriverManager.getConnection(url);
			stmt = con.createStatement();
			rs = stmt.executeQuery("select * from member");
			
			while (rs.next()) {
				String name = rs.getString("name");
				String id = rs.getString("id");
				String pw = rs.getString("pw");
				String phone1 = rs.getString("phone1");
				String phone2 = rs.getString("phone2");
				String phone3 = rs.getString("phone3");
				String gender = rs.getString("gender");
				
				MemberDTO dto = new MemberDTO(name, id, pw, phone1, phone2, phone3, gender);
				dtos.add(dto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
				if(con != null) con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return dtos;
	}
}
```

##### memberSelect.jsp

```jsp
<%@page import="com.javalec.daotoex.MemberDTO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.javalec.daotoex.MemberDAO"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<%
		MemberDAO memberDAO = new MemberDAO();
		ArrayList<MemberDTO> dtos = memberDAO.memberSelect();
		
		for(int i=0; i<dtos.size(); i++) {
			MemberDTO dto = dtos.get(i);
			String name = dto.getName();
			String id = dto.getId();
			String pw = dto.getPw();
			String phone = dto.getPhone1() + " - "+ dto.getPhone2() + " - " + dto.getPhone3();
			String gender = dto.getGender();
			
			out.println("이름 : " + name + ", 아이디 : " + id + ", 비밀번호 : " + pw + ", 연락처 : " + phone + ",  성별 : " + gender + "<br />" );
		}	
	%>
</body>
</html>
```

![image-20200603214735390](images/image-20200603214735390.png)





### PreparedStatement 객체 

- Statement 객체의 중복 코드가 많아지는 단점을 보완한 객체 

- query 문 작성 이후 SET 을 이용하여 값들을 삽입. 

  ```java
  Class.forName(driver); 
  connection = DriverManager.getConnection(url, uid, upw); 
  int n; 
  String query = "insert into memberforpre (id, pw, name, phone ) values (?,?,?,?)"; 
  preparedStatement = connection.prepareStatement(query); 
  
  preparedStatement.setString(1, "abc"); 
  preparedStatement.setString(2, "1235"); 
  preparedStatement.setString(3, "홍길동"); 
  preparedStatement.setString(4, "010-1234-5678"); 
  n = preparedStatement.executeUpdate(); 
  ```



#### 예제 2) 

##### memberDatainsert.jsp 

```jsp
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%!
		Connection connection;
		PreparedStatement preparedStatement;
		ResultSet resultSet;
	
		String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		String url = "jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true";
	%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<%
		try{
			
			Class.forName(driver);
			connection = DriverManager.getConnection(url);
			int n;
			String query = "insert into member (id, pw, name, phone) values (?, ?, ?, ?)";
			preparedStatement = connection.prepareStatement(query);
			
			preparedStatement.setString(1, "abc");
			preparedStatement.setString(2, "123");
			preparedStatement.setString(3, "홍길동");
			preparedStatement.setString(4, "010-1234-5678");
			n = preparedStatement.executeUpdate();
			
			preparedStatement.setString(1, "def");
			preparedStatement.setString(2, "456");
			preparedStatement.setString(3, "홍길자");
			preparedStatement.setString(4, "010-9012-3456");
			n = preparedStatement.executeUpdate();
			
			preparedStatement.setString(1, "ghi");
			preparedStatement.setString(2, "789");
			preparedStatement.setString(3, "홍길순");
			preparedStatement.setString(4, "010-7890-1234");
			n = preparedStatement.executeUpdate();
			
			preparedStatement.setString(1, "AAA");
			preparedStatement.setString(2, "111");
			preparedStatement.setString(3, "이길동");
			preparedStatement.setString(4, "010-1234-1111");
			n = preparedStatement.executeUpdate();
			
			if(n == 1) {
				out.println("insert success");
			} else { 
				out.println("insert fail");
			}
			
		} catch(Exception e) {
				e.printStackTrace();
		} finally {
			try{
				if(resultSet != null) resultSet.close();
				if(preparedStatement != null) preparedStatement.close();
				if(connection != null) connection.close();
			} catch(Exception e){}
		}
	%>
	
	<br />
	<a href="memberDateView.jsp">회원정보 보기</a>

</body>
</html>
```







### 커넥션 풀 (DBCP) 

- 클라이언트에서 다수의 요청이 발생할 경우 데이터베이스의 부하가 발생하는데 이를 해결하기 위한 기법. 
- 미리 Connection 객체들을 많이 생성하고 ,이를 이용. 

<img src="images/image-20200603213720772.png" alt="image-20200603213720772" style="zoom:67%;" />

- Tomcat 컨테이너가 데이터베이스 인증을 하도록 context.xml 파일을 열어 아래의 코드를 추가. 

  ```xml
  <Resource 
            auth = "Container"
            driverClassName = 
            url = 
            username = 
            password = 
            name = 
            type = 
            maxActive = 
            maxWait = 
  />
  ```



이후 `publish to server` 버튼을 클릭하여 해당 파일을 서버와 동기화. 

![image-20200603213923521](images/image-20200603213923521.png)





#### 예제 3)

##### Tomcat 컨테이너 context.xml

```xml
	<Resource 
		auth = "Container"
		driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
		url = "jdbc:sqlserver://localhost:9036;database=master;integratedSecurity=true"
		name = "mssql-jdbc-6.4.0.jre7"
		type = "javax.sql.DataSource"
		maxActive = "50"
		maxWait = "1000"
	/>
```

##### MemberDAO.java

```java
package com.javalec.daotoex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class MemberDAO {

	private DataSource dataSource;
	
	public MemberDAO() {
		try {
			Context context = new InitialContext();
			dataSource = (DataSource)context.lookup("java:comp/env/mssql-jdbc-6.4.0.jre7");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<MemberDTO> memberSelect() {
		
		ArrayList<MemberDTO> dtos = new ArrayList<MemberDTO>();
		
		Connection con =null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			con = dataSource.getConnection();
			stmt = con.createStatement();
			rs = stmt.executeQuery("select * from member");
			
			while (rs.next()) {
				String name = rs.getString("name");
				String id = rs.getString("id");
				String pw = rs.getString("pw");
				String phone1 = rs.getString("phone1");
				String phone2 = rs.getString("phone2");
				String phone3 = rs.getString("phone3");
				String gender = rs.getString("gender");
				
				MemberDTO dto = new MemberDTO(name, id, pw, phone1, phone2, phone3, gender);
				dtos.add(dto);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
				if(con != null) con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return dtos;
	}
	
}

```

나머지 소스는 예제 1 번과 동일. 

![image-20200603220741291](images/image-20200603220741291.png)





# 21강 



```html
<!-- join.html -->

<input type="button" value="회원가입" onclick="javascript:window.location=join.jsp">
```

클릭 이벤트가 발생할 경우 `join.jsp` 로 이동해라 



```jsp
// joinOk.jsp 파일 

<jsp:setProperty name="dto" property = "*" />
```

`*` 를 이용해서 속성을 자동적으로 입력하게 하려면, Dto 의 속성의 변수명과 join.form 의 input 이름이 같아야 자동으로 입력이 된다. 





# 22강. 파일 업로드 



- 파일 업로드 라이브러리 다운로드 및 설치 

  http://www.servlets.com 접속 후 아래 과정을 통해 설치 

  ![image-20200603222847088](images/image-20200603222847088.png)

- 여러가지 라이브러리가 존재하고, 우리가 실습한 라이브러리는 cos.jar 파일 라이브러리이다. 

- 다운로드 받은 라이브러리를 `WEB-INF` -> `lib` 로 복사한다. 
- 업로드 파일을 저장할 폴더를 생성한다. 

#### fileForm.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<form action="fileFormOk.jsp" method="post" enctype="multipart/form-data">
		파일 : <input type="file" name="file"><br />
		<input type="submit" value="File Upload">
	</form>

</body>
</html>
```

`enctype = "multipart/form-data"`  라고 명시를 해야 파일 첨부가 정상적으로 이루어진다. 



#### fileFormOk.jsp

```jsp
<%@page import="java.util.Enumeration"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	String path = request.getRealPath("fileFolder");

	int size = 1024 * 1024 * 10; //10M
	String file = "";
	String oriFile = "";
	
	try{
		MultipartRequest multi = new MultipartRequest(request, path, size, "EUC-KR", new DefaultFileRenamePolicy());
		
		Enumeration files = multi.getFileNames();
		String str = (String)files.nextElement();
		
		file = multi.getFilesystemName(str);
		oriFile = multi.getOriginalFileName(str);
		
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
 	file upload success!
</body>
</html>
```

`DefaultFileRenamePolicy()` : 동일한 파일명이 존재할 경우 파일명 뒤에 1, 2, 3 ... 을 붙이는 기본 규칙. 



파일을 업로드 할 경우 해당 프로젝트 디렉터리 내에서 파일이 생성되는 것이 아니라, 서버쪽 Tomcat 의 디렉터리 하단에 파일이 생성된다. 

<img src="images/image-20200604082948961.png" alt="image-20200604082948961" style="zoom:80%;" />



# 23강. EL ( Expression Language )

### EL ( Expression Language) 

- 표현식 또는 액션 태그를 대신해서 값을 표현하는 언어. 

<img src="images/image-20200604083914168.png" alt="image-20200604083914168" style="zoom:67%;" />



예시) 

![image-20200604084346195](images/image-20200604084346195.png)





### 액션태그로 사용되는 EL

<img src="images/image-20200604084604098.png" alt="image-20200604084604098" style="zoom:80%;" />



예시) 

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<jsp:useBean id="member" class="com.javalec.ex.MemberInfo" scope="page" />
<jsp:setProperty name="member" property="name" value="홍길동"/>
<jsp:setProperty name="member" property="id" value="abc"/>
<jsp:setProperty name="member" property="pw" value="123"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	이름 : <jsp:getProperty name="member" property="name"/><br />
	아이디 : <jsp:getProperty name="member" property="id"/><br />
	비밀번호 : <jsp:getProperty name="member" property="pw"/><br />
	
	<hr /> <!--위의 액션태그와 아래 표현식은 동일한 기능 수행 -->
	
	이름 : ${member.name }<br />
	아이디 : ${member.id }<br />
	비밀번호 : ${member.pw }<br />
	
</body>
</html>
```



### 내장 객체 

- **pageScope** : page 객체를 참조하는 객체 
- **requestScope** : request 객체를 참조하는 객체 
- **sessionScope** : session 객체를 참조하는 객체 
- **applicationScope** : application 객체를 참조하는 객체 
- **param** : 요청 파라미터를 참조하는 객체 
- **paramValues** : 요청 파라미터(배열)를 참조하는 객체 
- **initParam** : 초기화 파라미터를 참조하는 객체 
- **cookie** : cookie 객체를 참조하는 객체 



예시) 

```jsp
<!-- objel.jsp --> 
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	
	<form action="objelOk.jsp" method="get">
		아이디 : <input type="text" name="id"><br />
		비밀번호 : <input type="password" name="pw">
		<input type="submit" value="login">
	</form>
	
	<% 
		application.setAttribute("application_name", "application_value");
		session.setAttribute("session_name", "session_value");
		pageContext.setAttribute("page_name", "page_value");
		request.setAttribute("request_name", "request_value");
	%>
	
</body>
</html>
```

```jsp
<!-- objelOk.jsp -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	
	<%
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
	%>
	
	아이디 : <%= id %> <br />
	비밀번호 : <%= pw %>
	
	<hr />
	
	아이디 : ${ param.id } <br />
	비밀번호 : ${ param.pw } <br />
	
	<hr />
	아이디 : ${ param["id"] } <br />
	비밀번호 : ${ param["pw"] }
	
	<hr />
	
	applicationScope : ${ applicationScope.application_name }<br />
	sessionScope : ${ sessionScope.session_name }<br />
	pageScope : ${ pageScope.page_name }<br />
	requestScope : ${ requestScope.request_name }
	
	<hr />
	
	context 초기화 파라미터<br />
	${ initParam.con_name } <br />
	${ initParam.con_id } <br />
	${ initParam.con_pw } <br />
</body>
</html>
```



web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" id="WebApp_ID" version="3.0">
  <display-name>jsp_23_3_ex1_elex</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  
  <context-param>
  	<param-name>con_name</param-name>
  	<param-value>con_name은 홍길동 입니다.</param-value>
  </context-param>
  <context-param>
  	<param-name>con_id</param-name>
  	<param-value>con_id는 abcde 입니다.</param-value>
  </context-param>
  <context-param>
  	<param-name>con_pw</param-name>
  	<param-value>con_pw는 12345 입니다.</param-value>
  </context-param>
  
</web-app>
```



![image-20200604085510865](images/image-20200604085510865.png)

pageScope 와 requestScope 는 페이지와 요청 범위 내에서 유효한 객체이기 때문에, objel.jsp 파일에서 objelOk.jsp 파일로 넘어갈 경우 값이 없음을 확인할 수 있다. 





# 24강. JSTL (JSP standard Tag Library)

- HTML 태그와 같이 사용되어 전체적인 코드의 가독성이 떨어지는 JSP의 단점을 보완하고자 만들어진 태그 라이브러리. 

- JSTL의 경우 Tomcat 컨테이너에 포함되어있지 않으므로, 별도의 설치를 하고 사용한다. 

- JSTL 설치 

  http://jakarta.apache.org 접속 후 아래 순서에 따라 다운로드

![image-20200604090315317](images/image-20200604090315317.png)

![image-20200604090359283](images/image-20200604090359283.png)

라이브러리 파일 다운로드 이후, 압축을 해제하고 `jar` 파일들을 Tomcat 의 lib 디렉터리 하단으로 복사한다. 



### JSTL 라이브러리

- JSTL 에서는 다섯 가지의 라이브러리를 제공한다. 

  <img src="images/image-20200604090513629.png" alt="image-20200604090513629" style="zoom:67%;" />

  그 중 가장 기본적인 라이브러리인 Core 라이브러리를 살펴본다. 



#### Core

- Core 라이브러리는 기본적인 라이브러리로 출력, 제어문, 반복문 같은 기능이 포함되어있다. 

<img src="images/image-20200604090600971.png" alt="image-20200604090600971" style="zoom:67%;" />

<img src="images/image-20200604090615703.png" alt="image-20200604090615703" style="zoom:67%;" />

<img src="images/image-20200604090715437.png" alt="image-20200604090715437" style="zoom:67%;" />

<img src="images/image-20200604090737289.png" alt="image-20200604090737289" style="zoom:67%;" />



예시) 

```jsp
	<c:set var="varName" value="varValue" />
	varName : <c:out value = "${varName }" /> 
```

![image-20200603165916931](images/image-20200603165916931.png)

```jsp
	<c:set var="varName" value="varValue" />
	varName : <c:out value = "${varName }" /><br /> 
	
	<c:remove var="varName" />
	varName : <c:out value = "${varName }" />
```

![image-20200603165956880](images/image-20200603165956880.png)

```jsp
	<c:forEach var="fe" begin="0" end="100" step ="5">
		${fe}<br />
	</c:forEach>
```

<img src="images/image-20200603170101759.png" alt="image-20200603170101759" style="zoom:67%;" />





# 25강. FrontController 패턴과 Command 패턴

### 25.1 url-pattern

- 디렉터리 패턴 

  디렉터리 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조 

  <img src="images/image-20200604091412919.png" alt="image-20200604091412919" style="zoom: 50%;" />

- 확장자 패턴 

  확장자 형태로 서버의 해당 컴포넌트를 찾아서 실행하는 구조 

  <img src="images/image-20200604091446367.png" alt="image-20200604091446367" style="zoom:50%;" />

  

### 25.2 FrontController 패턴 

- 클라이언트의 다양한 요청을 한곳으로 집중시켜, 개발 및 유지보수에 효율성을 극대화. 

  <img src="images/image-20200604091544917.png" alt="image-20200604091544917" style="zoom:50%;" />



예시) 

`frontControllerEx.jsp`

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<a href="insert.do">insert</a>
	<hr />
	<a href="http://localhost:7979<%=request.getContextPath()%>/update.do">update</a>
	<hr />
	<a href="http://localhost:7979/jsp_25_2_ex1_frontex/select.do">select</a>
	<hr />
	<a href="<%=request.getContextPath()%>/delete.do">delete</a>

</body>
</html>
```

`FrontCon.java`

```java
package com.javalec.ex;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("*.do")
public class FrontCon extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public FrontCon() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doGet");
		actionDo(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doPost");
		actionDo(request, response);
	}
	
	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("actionDo");
		
		String uri = request.getRequestURI();
		System.out.println("uri : " + uri);
		String conPath = request.getContextPath();
		System.out.println("conPath : " + conPath);
		String command = uri.substring(conPath.length());
		System.out.println("command : " + command);

		if(command.equals("/insert.do")){
			System.out.println("insert");
			System.out.println("----------------");
		}else if(command.equals("/update.do")){
			System.out.println("update");
			System.out.println("----------------");
		}else if(command.equals("/select.do")){
			System.out.println("select");
			System.out.println("----------------");
		}else if(command.equals("/delete.do")){
			System.out.println("delete");
			System.out.println("----------------");
		}
	}
}
```



![image-20200604092418097](images/image-20200604092418097.png)



### 25.3 Command 패턴

- 클라이언트로부터 받은 요청들에 대해서, 서블릿이 작업을 직접 처리하지 않고 해당 클래스가 처리하도록 한다. 

<img src="images/image-20200604091633267.png" alt="image-20200604091633267" style="zoom:50%;" />





# 26강. 포워딩(Forwarding)

- 서블릿 또는 JSP에서 요청을 받은 후 다른 컴포넌트로 요청을 위임할 수 있다. 



### 26.1 RequestDispatcher 클래스 

- 요청 받은 요청 객체(request)를 위임하는 컴포넌트에 동일하게 전달 

<img src="images/image-20200604093140962.png" alt="image-20200604093140962" style="zoom:67%;" />



예시) 

```java
// RequestObj.java
package com.javalec.ex;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RequestObj")
public class RequestObj extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RequestObj() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doGet");
		actionDo(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doPost");
		actionDo(request, response);
	}
	
	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("actionDo");
		
		request.setAttribute("id", "abcde");
		request.setAttribute("pw", "12345");
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/dispacherJsp.jsp");
		dispatcher.forward(request, response);
	}
}
```

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

		dispacherJsp.jsp
		<hr />
		
		id : <%= request.getAttribute("id") %> <br />
		pw : <%= request.getAttribute("pw") %>

</body>
</html>
```

![image-20200604093517982](images/image-20200604093517982.png)

요청 객체가 그대로 전달되기 때문에, servlet 에서 설정한 객체의 값이 JSP 에서 그대로 유지됨을 확인할 수 있다. 





### 26.2 HttpServletResponse 클래스 

- 요청 받은 요청 객체를 위임 받은 컴포넌트에 전달하는 것이 아닌, 새로운 요청 객체를 생성한다. 

<img src="images/image-20200604093225008.png" alt="image-20200604093225008" style="zoom:67%;" />



예시 ) 

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
		<%
			request.setAttribute("id", "abcde");
			request.setAttribute("pw", "12345");
			
			response.sendRedirect("RequestObj");
		%>
</body>
</html>
```

```java
// RequestObj.java
package com.javalec.ex;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RequestObj")
public class RequestObj extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RequestObj() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doGet");
		actionDo(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doPost");
		actionDo(request, response);
	}
	
	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("actionDo");
		
		String id = (String)request.getAttribute("id");
		String pw = (String)request.getAttribute("pw");
		
		response.setContentType("text/jhtml; charset=EUC-KR");
		PrintWriter writer = response.getWriter();
		writer.print("<html><head></head><body>");
		writer.print("RequestObj" + "<hr />");
		writer.print("id : " + id + "<br />");
		writer.print("pw : " + pw);
		writer.print("</body></html>");
		
	}
}
```

![image-20200604093731778](images/image-20200604093731778.png)

새로운 요청 객체를 생성하여 전달되기 때문에, JSP 에서 요청 객체에 설정한 값은 servlet 에서는 사라지고 null 값이 되는것을 확인할 수 있다. 









#   27-30강. MVC 패턴을 이용한 게시판 만들기 



### DB 생성 

```mssql
create table mvc_board(
	bId INT PRIMARY KEY, 
	bName VARCHAR(20), 
	bTitle VARCHAR(100), 
	bContent VARCHAR(300), 
	bDate DATE default sysdatetime(), 
	bHit INT DEFAULT 0, 
	bGroup INT, 
	bStep INT, 
	bIndent INT
); 
```

### Sequence 생성

<img src="images/image-20200605083031531.png" alt="image-20200605083031531" style="zoom:67%;" />



### FrontController 만들기 

```java
package com.javalec.ex.frontcontroller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.command.BCommand;
import com.javalec.ex.command.BContentCommand;
import com.javalec.ex.command.BDeleteCommand;
import com.javalec.ex.command.BListCommand;
import com.javalec.ex.command.BModifyCommand;
import com.javalec.ex.command.BReplyCommand;
import com.javalec.ex.command.BReplyViewCommand;
import com.javalec.ex.command.BWriteCommand;

@WebServlet("*.do")
public class BFrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BFrontController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doGet");
		actionDo(request, response); 
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doPost");
		actionDo(request, response); 
	}
	
	private void actionDo(HttpServletRequest req , HttpServletResponse res) throws ServletException, IOException{
		System.out.println("action DO");
		
		req.setCharacterEncoding("EUC-KR");
		
		String viewPage = null;  // 어떤 화면을 보여줄 지 .
		BCommand command = null; // 어떤 로직을 수행할지 결정하는 command 객체 
		
		String uri = req.getRequestURI(); 
		String conPath = req.getContextPath(); 
		String com = uri.substring(conPath.length()); 
		
		if(com.equals("/write_view.do")){
			viewPage = "write_view.jsp"; 
		}else if(com.equals("/write.do")){
			command = new BWriteCommand(); 
			command.execute(req, res); 
			viewPage = "list.do"; 
		}else if(com.equals("/list.do")){
			command = new BListCommand(); 
			command.execute(req,res); 
			viewPage = "list.jsp";
		}else if(com.equals("/content_view.do")){
			command = new BContentCommand(); 
			command.execute(req, res); 
			viewPage = "content_view.jsp"; 
		}else if(com.equals("/modify.do")){
			command = new BModifyCommand(); 
			command.execute(req, res); 
			viewPage = "list.do"; 
		}else if(com.equals("/delete.do")){
			command = new BDeleteCommand(); 
			command.execute(req,res); 
			viewPage = "list.do"; 
		}else if(com.equals("/reply_view.do")){
			command = new BReplyViewCommand(); 
			command.execute(req, res); 
			viewPage = "list.do"; 
		}else if(com.equals("/reply.do")){
			command = new BReplyCommand(); 
			command.execute(req, res); 
			viewPage = "list.do"; 
		}
		
		RequestDispatcher dispatcher = req.getRequestDispatcher(viewPage); 
		dispatcher.forward(req,res); 
	}
}
```



### Command 만들기 

#### BCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface BCommand {
	void execute(HttpServletRequest req, HttpServletResponse res);
}
```

#### BContentCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;
import com.javalec.ex.dto.BDto;

public class BContentCommand implements BCommand{

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		
		String bId = req.getParameter("bId");
		BDao dao = new BDao() ; 
		BDto dto = dao.contentView(bId);
		
		req.setAttribute("content_view",dto);
	}
}

```

#### BDeleteCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;


public class BDeleteCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		String bId = req.getParameter("bId");
		BDao dao = new BDao();
		dao.delete(bId);
	}
}
```

#### BListCommand.java

```java
package com.javalec.ex.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;
import com.javalec.ex.dto.BDto;

public class BListCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		
		BDao dao = new BDao();
		ArrayList<BDto> dtos = dao.list();
		req.setAttribute("list", dtos);
	}
}
```

#### BModifyCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;


public class BModifyCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		String bId = req.getParameter("bId");
		String bName = req.getParameter("bName");
		String bTitle = req.getParameter("bTitle");
		String bContent = req.getParameter("bContent");
		
		BDao  dao = new BDao();
		dao.modify(bId, bName, bTitle, bContent);
	}
}
```

#### BReplyCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.javalec.ex.dao.BDao;

public class BReplyCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		String bId = req.getParameter("bId");
		String bName = req.getParameter("bName");
		String bTitle = req.getParameter("bTitle");
		String bContent = req.getParameter("bContent");
		String bGroup = req.getParameter("bGroup");
		String bStep = req.getParameter("bStep");
		String bIndent = req.getParameter("bIndent");
		
		BDao dao = new BDao();
		dao.reply(bId, bName, bTitle, bContent, bGroup, bStep, bIndent);
	}
}
```

#### BReplyViewCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;
import com.javalec.ex.dto.BDto;

public class BReplyViewCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		String bId = req.getParameter("bId");
		BDao dao = new BDao();
		BDto dto = dao.reply_view(bId);
		
		req.setAttribute("reply_view", dto);
	}
}
```

#### BWriteCommand.java

```java
package com.javalec.ex.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javalec.ex.dao.BDao;

public class BWriteCommand implements BCommand{
	@Override
	public void execute(HttpServletRequest req, HttpServletResponse res) {
		// TODO Auto-generated method stub
		String bName = req.getParameter("bName");
		String bTitle = req.getParameter("bTitle");
		String bContent = req.getParameter("bContent");
		
		BDao dao = new BDao();
		dao.write(bName, bTitle, bContent);
	}
}
```





### DTO 만들기

```java
package com.javalec.ex.dto;

import java.sql.Timestamp;

public class BDto {

	int bId;
	String bName;
	String bTitle;
	String bContent;
	Timestamp bDate;
	int bHit;
	int bGroup;
	int bStep;
	int bIndent;
	
	public BDto() {
		// TODO Auto-generated constructor stub
	}
	
	public BDto(int bId, String bName, String bTitle, String bContent, Timestamp bDate, int bHit, int bGroup, int bStep, int bIndent) {
		// TODO Auto-generated constructor stub
		this.bId = bId;
		this.bName = bName;
		this.bTitle = bTitle;
		this.bContent = bContent;
		this.bDate = bDate;
		this.bHit = bHit;
		this.bGroup = bGroup;
		this.bStep = bStep;
		this.bIndent = bIndent;
	}

	// getter, setter 생략 
}

```



### DAO 만들기  

#### BDao() 

```java
public BDao() {
    // TODO Auto-generated constructor stub

    try {
        Context context = new InitialContext();
        dataSource = (DataSource) context.lookup("java:comp/env/jdbc/Oracle11g");
    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    }
}
```

#### write 함수 

```java
public void write(String bName, String bTitle, String bContent){
		Connection conn = null;
		PreparedStatement prstmt = null; 
		
		try{
			conn = dataSource.getConnection(); 
			String query = "insert into mvc_board(bId, bName, bTitle, bContent, bHit, bGroup, bStep, bIndent) values (next value for mvc_board_seq, ?,?,?,0,(select isnull(MAX(bId),0) from mvc_board)+1,0,0)"; 
			prstmt = conn.prepareStatement(query); 
			prstmt.setString(1, bName);
			prstmt.setString(2, bTitle);
			prstmt.setString(3, bContent);
			int rn = prstmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try {
				if(prstmt != null) prstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e2) {
				// TODO: handle exception
				e2.printStackTrace();
			}
		}
	}
```



#### list 함수 

```java
public ArrayList<BDto> list() {
    ArrayList<BDto> dtos = new ArrayList<BDto>();
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;

    try {
        connection = dataSource.getConnection();

        String query = "select bId, bName, bTitle, bContent, bDate, bHit, bGroup, bStep, bIndent from mvc_board order by bGroup desc, bStep asc";
        preparedStatement = connection.prepareStatement(query);
        resultSet = preparedStatement.executeQuery();

        while (resultSet.next()) {
            int bId = resultSet.getInt("bId");
            String bName = resultSet.getString("bName");
            String bTitle = resultSet.getString("bTitle");
            String bContent = resultSet.getString("bContent");
            Timestamp bDate = resultSet.getTimestamp("bDate");
            int bHit = resultSet.getInt("bHit");
            int bGroup = resultSet.getInt("bGroup");
            int bStep = resultSet.getInt("bStep");
            int bIndent = resultSet.getInt("bIndent");

            BDto dto = new BDto(bId, bName, bTitle, bContent, bDate, bHit, bGroup, bStep, bIndent);
            dtos.add(dto);
        }

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(resultSet != null) resultSet.close();
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
    return dtos;
}
```

#### contentView 함수 

```java
public BDto contentView(String strID) {
    upHit(strID);

    BDto dto = null;
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;

    try {

        connection = dataSource.getConnection();

        String query = "select * from mvc_board where bId = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, Integer.parseInt(strID));
        resultSet = preparedStatement.executeQuery();

        if(resultSet.next()) {
            int bId = resultSet.getInt("bId");
            String bName = resultSet.getString("bName");
            String bTitle = resultSet.getString("bTitle");
            String bContent = resultSet.getString("bContent");
            Timestamp bDate = resultSet.getTimestamp("bDate");
            int bHit = resultSet.getInt("bHit");
            int bGroup = resultSet.getInt("bGroup");
            int bStep = resultSet.getInt("bStep");
            int bIndent = resultSet.getInt("bIndent");

            dto = new BDto(bId, bName, bTitle, bContent, bDate, bHit, bGroup, bStep, bIndent);
        }

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(resultSet != null) resultSet.close();
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
    return dto;
}
```

#### upHit 함수 

```java
private void upHit( String bId) {
    // TODO Auto-generated method stub
    Connection connection = null;
    PreparedStatement preparedStatement = null;

    try {
        connection = dataSource.getConnection();
        String query = "update mvc_board set bHit = bHit + 1 where bId = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, bId);

        int rn = preparedStatement.executeUpdate();

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
}
```

#### modify 함수 

```java
public void modify(String bId, String bName, String bTitle, String bContent) {
    // TODO Auto-generated method stub

    Connection connection = null;
    PreparedStatement preparedStatement = null;

    try {
        connection = dataSource.getConnection();

        String query = "update mvc_board set bName = ?, bTitle = ?, bContent = ? where bId = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, bName);
        preparedStatement.setString(2, bTitle);
        preparedStatement.setString(3, bContent);
        preparedStatement.setInt(4, Integer.parseInt(bId));
        int rn = preparedStatement.executeUpdate();

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
}
```

#### delete 함수

```java
public void delete(String bId) {
    // TODO Auto-generated method stub
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try {

        connection = dataSource.getConnection();
        String query = "delete from mvc_board where bId = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, Integer.parseInt(bId));
        int rn = preparedStatement.executeUpdate();

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
}
```

#### reply_view 함수 

```java
public BDto reply_view(String str) {
    // TODO Auto-generated method stub
    BDto dto = null;

    Connection connection = null;
    PreparedStatement preparedStatement = null;
    ResultSet resultSet = null;
    try {

        connection = dataSource.getConnection();
        String query = "select * from mvc_board where bId = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, Integer.parseInt(str));
        resultSet = preparedStatement.executeQuery();

        if(resultSet.next()) {
            int bId = resultSet.getInt("bId");
            String bName = resultSet.getString("bName");
            String bTitle = resultSet.getString("bTitle");
            String bContent = resultSet.getString("bContent");
            Timestamp bDate = resultSet.getTimestamp("bDate");
            int bHit = resultSet.getInt("bHit");
            int bGroup = resultSet.getInt("bGroup");
            int bStep = resultSet.getInt("bStep");
            int bIndent = resultSet.getInt("bIndent");

            dto = new BDto(bId, bName, bTitle, bContent, bDate, bHit, bGroup, bStep, bIndent);
        }

    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }

    return dto;
}
```

#### reply 함수

```java
public void reply(String bId, String bName, String bTitle, String bContent, String bGroup, String bStep, String bIndent) {
    // TODO Auto-generated method stub

    replyShape(bGroup, bStep);

    Connection connection = null;
    PreparedStatement preparedStatement = null;

    try {
        connection = dataSource.getConnection();
        String query = "insert into mvc_board (bId, bName, bTitle, bContent, bGroup, bStep, bIndent) values (mvc_board_seq.nextval, ?, ?, ?, ?, ?, ?)";
        preparedStatement = connection.prepareStatement(query);

        preparedStatement.setString(1, bName);
        preparedStatement.setString(2, bTitle);
        preparedStatement.setString(3, bContent);
        preparedStatement.setInt(4, Integer.parseInt(bGroup));
        preparedStatement.setInt(5, Integer.parseInt(bStep) + 1);
        preparedStatement.setInt(6, Integer.parseInt(bIndent) + 1);

        int rn = preparedStatement.executeUpdate();
    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }

}
```

#### replyShape 함수 

```java
private void replyShape( String strGroup, String strStep) {
    // TODO Auto-generated method stub
    Connection connection = null;
    PreparedStatement preparedStatement = null;

    try {
        connection = dataSource.getConnection();
        String query = "update mvc_board set bStep = bStep + 1 where bGroup = ? and bStep > ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, Integer.parseInt(strGroup));
        preparedStatement.setInt(2, Integer.parseInt(strStep));

        int rn = preparedStatement.executeUpdate();
    } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
    } finally {
        try {
            if(preparedStatement != null) preparedStatement.close();
            if(connection != null) connection.close();
        } catch (Exception e2) {
            // TODO: handle exception
            e2.printStackTrace();
        }
    }
}
```



### 화면 만들기 (JSP)

#### write_view.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
		<table width="500" cellpadding="0" cellspacing="0" border="1">
			<form action="write.do" method="post">
				<tr>
					<td> 이름 </td>
					<td> <input type="text" name="bName" size = "50"> </td>
				</tr>
				<tr>
					<td> 제목 </td>
					<td> <input type="text" name="bTitle" size = "50"> </td>
				</tr>
				<tr>
					<td> 내용 </td>
					<td> <textarea name="bContent" rows="10" ></textarea> </td>
				</tr>
				<tr >
					<td colspan="2"> <input type="submit" value="입력"> &nbsp;&nbsp; <a href="list.do">목록보기</a></td>
				</tr>
			</form>
		</table>
</body>
</html>
```

#### list.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	
	<table width="500" cellpadding="0" cellspacing="0" border="1">
		<tr>
			<td>번호</td>
			<td>이름</td>
			<td>제목</td>
			<td>날짜</td>
			<td>히트</td>
		</tr>
		<c:forEach items="${list}" var="dto">
		<tr>
			<td>${dto.bId}</td>
			<td>${dto.bName}</td>
			<td>
				<c:forEach begin="1" end="${dto.bIndent}">-</c:forEach>
				<a href="content_view.do?bId=${dto.bId}">${dto.bTitle}</a></td>
			<td>${dto.bDate}</td>
			<td>${dto.bHit}</td>
		</tr>
		</c:forEach>
		<tr>
			<td colspan="5"> <a href="write_view.do">글작성</a> </td>
		</tr>
	</table>
	
</body>
</html>
```

#### reply_view.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<table width="500" cellpadding="0" cellspacing="0" border="1">
		<form action="reply.do" method="post">
			<input type="hidden" name="bId" value="${reply_view.bId}">
			<input type="hidden" name="bGroup" value="${reply_view.bGroup}">
			<input type="hidden" name="bStep" value="${reply_view.bStep}">
			<input type="hidden" name="bIndent" value="${reply_view.bIndent}">
			<tr>
				<td> 번호 </td>
				<td> ${reply_view.bId} </td>
			</tr>
			<tr>
				<td> 히트 </td>
				<td> ${reply_view.bHit} </td>
			</tr>
			<tr>
				<td> 이름 </td>
				<td> <input type="text" name="bName" value="${reply_view.bName}"></td>
			</tr>
			<tr>
				<td> 제목 </td>
				<td> <input type="text" name="bTitle" value="${reply_view.bTitle}"></td>
			</tr>
			<tr>
				<td> 내용 </td>
				<td> <textarea rows="10"  name="bContent">${reply_view.bContent}</textarea></td>
			</tr>
			<tr >
				<td colspan="2"><input type="submit" value="답변"> <a href="list.do" >목록</a></td>
			</tr>
		</form>
	</table>
	
</body>
</html>
```

#### content_view.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

	<table width="500" cellpadding="0" cellspacing="0" border="1">
		<form action="modify.do" method="post">
			<input type="hidden" name="bId" value="${content_view.bId}">
			<tr>
				<td> 번호 </td>
				<td> ${content_view.bId} </td>
			</tr>
			<tr>
				<td> 히트 </td>
				<td> ${content_view.bHit} </td>
			</tr>
			<tr>
				<td> 이름 </td>
				<td> <input type="text" name="bName" value="${content_view.bName}"></td>
			</tr>
			<tr>
				<td> 제목 </td>
				<td> <input type="text" name="bTitle" value="${content_view.bTitle}"></td>
			</tr>
			<tr>
				<td> 내용 </td>
				<td> <textarea rows="10" name="bContent" >${content_view.bContent}</textarea></td>
			</tr>
			<tr >
				<td colspan="2"> <input type="submit" value="수정"> &nbsp;&nbsp; <a href="list.do">목록보기</a> &nbsp;&nbsp; <a href="delete.do?bId=${content_view.bId}">삭제</a> &nbsp;&nbsp; <a href="reply_view.do?bId=${content_view.bId}">답변</a></td>
			</tr>
		</form>
	</table>
	
</body>
</html>
```



### 최종 완성 화면 



​	![image-20200605134905885](images/image-20200605134905885.png)