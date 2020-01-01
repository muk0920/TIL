#### Docker 이미지 생성 

- 컨테이너 상태를 그대로 이미지로 저장. 

- Application file + Docker file 

![image-20191231145144067](images/image-20191231145144067.png)





#### Docker 테스트_1

`visual code` 파일을 열어서 `day02` 디렉터리를 생성하고 그 안에 `Dockerfile` 파일 생성. 

code Dockerfile 에서 아래 라인만 추가하고 저장한 이후에 테스트 해보자. 

``` dockerfile
FROM alpine:3.7
```



```bash
$ docker build -t fromtest:0.1 .

Sending build context to Docker daemon  2.048kB
Step 1/1 : FROM alpine:3.7
3.7: Pulling from library/alpine
...
Successfully tagged fromtest:0.1
...
```

현재 `Dockerfile` 의 실행 라인이 1줄이기 때문에 step 이 1밖에 없음을 확인할 수 있다. 



다시 code Dockerfile 에서 아래 라인으로 명령어를 수정한 후 테스트. 

```dockerfile
FROM alpine:3.7

RUN mkdir /mydata
RUN echo "Hello, Docker !"
```



```bash
$ docker build -t fromtest:0.1 .

Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM alpine:3.7
 ---> 6d1ef012b567
Step 2/3 : RUN mkdir /mydata
 ---> Running in 32312833bd27
Removing intermediate container 32312833bd27
 ---> 2caf7f27a2c9
Step 3/3 : RUN echo "Hello, Docker !"
 ---> Running in b3c34a2a768c
Hello, Docker !
Removing intermediate container b3c34a2a768c
...
```

명령어의 라인 수가 늘어났기 때문에 step 의 수가 늘어났음을 확인할 수 있으며, step3 에서 echo 명령어가 실행됨을 확인할 수 있다. 



#### Docker 테스트_2

1. Dockerfile 을 아래와 같이 수정한다. 그리고 `ADD` 명령어를 수행하기 위해서는 `test.sh` 파일이 존재해야하기 때문에 `visual code` 를 이용하여 생성해준다. 

   `ADD` 명령어 : 호스트에 존재한는 파일을 컨테이너 안으로 복사. 

   ![image-20191231152211764](images/image-20191231152211764.png)

   

2. ``` bash
   $ docker build -t addtest:0.1 .
   ```

   

3. ``` bash
   $ docker run -it --name addtest addtest:0.1
   
   / # 
   ```



4. ```bash
   / # cd mydata/
   /mydata # ls
   test.sh
   ```

   위의 결과에서 알 수 있듯이 `ADD` 명령어를 수행한 결과를 확인할 수 있다. 



#### Docker 테스트_3

1. Dockerfile 을 아래와 같이 수정 .

   ![image-20191231153604981](images/image-20191231153604981.png)



2. ``` bash
   $ docker build -t entrytest:0.1 .
   ```

3. ```bash
   $ docker run -it --name entrytest entrytest:0.1
   
   Hello, Docker & Kubenates
   ```



#### Docker 테스트_4

1. Dockerfile 을 아래와 같이 수정. 

   ```Dockerfile
   FROM alpine:3.7
   
   CMD [ "ping", "www.google.com" ]
   ```

   

2. ```bash
   $ docker build -t pingtest .
   ```

   

3. ``` bash
   $ docker run --name pingtest pingtest
   
   PING www.google.com (172.217.174.100): 56 data bytes
   64 bytes from 172.217.174.100: seq=0 ttl=37 time=30.338 ms
   64 bytes from 172.217.174.100: seq=1 ttl=37 time=31.978 ms
   64 bytes from 172.217.174.100: seq=2 ttl=37 time=31.393 ms
   ```



**busy box** : 리죽스 상에서 자주 사용되는 명령어들만 모은 압축파일로서, 도커 이미지를 만들 때 테스트 용도로 많이 사용. 속도가 매우 빠르다. 

**alpine** : 가볍고 보안성을 목적으로 개발된 리눅스배포판. 용량이 적은 초소형 리눅스로 되어있어 도커에서 사용 가능한 이미지 파일

