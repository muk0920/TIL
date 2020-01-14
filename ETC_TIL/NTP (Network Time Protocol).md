## NTP (Network Time Protocol)

### NTP 란 ???

​	네트워크로 연결되어 있는 컴퓨터들끼리 클럭 시각을 동기화하는데 사용되는 프로토콜. 



### NTP 의 장점 

 	1. 데이터의 손실 방지 
     - 동일한 문서를 작업 시 각각의 PC 의 시간이 다른 상태에서 문서를 저장하거나 수정하는 경우로 인한 데이터의 손실을 방지할 수 있다. 
	2. 로그에 대한 분석 효율 상승 
    - 로그의 시간이 서버 혹은 PC 의 시간 모두 각각 틀리면 신뢰도가 떨어지기 때문에 동기화를 해야한다. 
	3. 예약된 작업의 실행 불가 상황 방지 
    - 예약된 작업이 다른 PC 혹은 서버의 시간이 모두 다르다면 예약된 작업이 실행되지 않아 중요한 작업에 문제가 발생할 수도 있다. 



### NTP 의 단점

​	서버와 클라이언트 간의 연결이 되어있어야 시간을 동기화 할 수 있기때문에 일반적으로 외부의 NTP 서버를 참조한다. 이러한 직접적인 연결과정으로 인해 보안상으로 취햑한 부분이 발생한다. 

위의 문제점을 보안하기 위해 NTP 서버를 직접적으로 참조하지않고, 별도의 Time Server 를 이용하여 시간을 동기화한다.  