# HTTP 프로토콜 



- HTTP ( Hypertext Transfer Protocol )

  - 인터넷상에서 데이터를 주고받기 위한 서버/클라이언트 모델을 따르는 프로토콜. 

  - 애플리케이션 레벨의 프로토콜로 TCP/IP 위에서 동작 

  - 하이퍼텍스트 기반으로(Hypertext) 데이터를 전송하겠다 = 링크기반으로 데이터에 접속하는 것을 의미.

  - **Connectless** 방식으로 작동 - 서버에 연결하고 요청해서 응답을 받으면 연결을 끊어버린다. 

    - 장점 : 블특정 다수를 대상으로 하는 서비스에 적합. ( 접속 유지를 최소한으로 하기 때문에 더 많은 유저의 요청을 처리할 수 있다. )

    - 단점 : 연결이 끊어지기 때문에 클라이언트의 이전 상태를 알수가 없다. ( **Stateless** - 통신이 끝나면 상태를 유지하지 않는 특징. ) 

      -> HTTP 요청은 상태를 가지고 있지 않기 때문에, 브라우저에서 서버로 나에 대한 정보를 가져오라는 요청을 보낼 때, 서버는 요청 자체만으로는 그 요청이 누구에게서 오는지 알 수 없어 응답을 보낼 수가 없다. 이 때 쿠키에 나에 대한 정보를 담아서 서버로 보내면 서버는 쿠키를 읽어 내가 누군지 파악을 한다. 

      

