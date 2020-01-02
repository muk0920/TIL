## Docker Swarm 



Docker Swarm --> 오케스트레이션 

 여러 Docker host 를 클러스터로 묶어주는 컨테이너 오케스트레이션 



| 이름    | 역할                                                         | 대응하는 명령어 |
| ------- | ------------------------------------------------------------ | --------------- |
| compose | 여러 컨테이너로 구성된 도커 어플리케이션을 관리 ( 주로 단일 호스트 ) | docker-compose  |
| swarm   | 클러스터 구축 및 관리 (주로 멀티 호스트)                     | docker swarm    |
| service | 스웜에서 클러스트 안의 서비스 (컨테이너 하나 이상의 집합)을 관리 | docker service  |
| stack   | 스웜에서 여러 개의 서비스를 합한 전체 어플리케이션을 관리    | docker stack    |



**Swarm 의 역할 **

![image-20200102171947547](images/image-20200102171947547.png)



교재 108p ~ 참고. 



docker-compose up 했을 때 암호 로그인을 해결할 때에는 컴퓨터 계정의 비밀번호를 입력해야한다. 

미리 마운트 시켜 놓기 

![image-20200102174705900](images/image-20200102174705900.png)





도커의 매니져 쉘로 접속하여 `docker swarm init` 명령어 실행. 이 때 bash 가 지원이 안될수도 있으니 접속시에 `docker exec -it manager sh` 로 접속. 



``` bash
/ # docker swarm init
Swarm initialized: current node (n7wfjxhy4qgowlf036l8vmg2b) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-59f2bjpnjndrn1ye93o7gzmf1nqj53l1pwbtxoyp67nwalt30u-83iwf4mhte8rcdvj7fapuhjj1 172.23.0.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```



위에서 `docker ---- 2377` 까지 복사한 이후에 worker 들을 아래와 같은 명령어로 붙여넣어서 등록 

```bash
$ docker exec -it worker01 docker swarm join --token SWMTKN-1-59f2bjpnjndrn1ye93o7gzmf1nqj53l1pwbtxoyp67nwalt30u-83iwf4mhte8rcdvj7fapuhjj1 172.23.0.3:2377

This node joined a swarm as a worker.
```

``` bash
$ docker exec -it worker02 docker swarm join --token SWMTKN-1-59f2bjpnjndrn1ye93o7gzmf1nqj53l1pwbtxoyp67nwalt30u-83iwf4mhte8rcdvj7fapuhjj1 172.23.0.3:2377

This node joined a swarm as a worker.
```

```bash
$ docker exec -it worker03 docker swarm join --token SWMTKN-1-59f2bjpnjndrn1ye93o7gzmf1nqj53l1pwbtxoyp67nwalt30u-83iwf4mhte8rcdvj7fapuhjj1 172.23.0.3:2377

This node joined a swarm as a worker.
```



위의 worker 등록이 정상적으로 되었는지 확인하는 명령어. 

```bash
$ docker exec -it manager docker node ls 

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
jlk3ot35lhwk6xqkxscjlf3xg     0eda6d670d78        Ready               Active                                  19.03.5
n7wfjxhy4qgowlf036l8vmg2b *   3f47a50123bb        Ready               Active              Leader              19.03.5
x9bfonhu4u2wb1bv8iec46irv     6235746f8ec9        Ready               Active                                  19.03.5
mziwi3fgjk6qlc0pn1ywfd8wu     f3097d2089b3        Ready               Active                                  19.03.5
```

매니져는 리더가 되어있고 나머지는 worker 로 등록되어있음을 확인할 수 있다. 





#### Docker in Docker -dind 

도커 컨테이너 안에서 도커 호스트를 실행 

![image-20200102172217168](images/image-20200102172217168.png)

registry 라는 이미지를 사용시 사용하고자 하는 도커 호스트에 레파지토리 저장소를 만들어 사용할 수 있다. 

manager : Worker 들이 가지고 있는 내용들을 관리해주는 작업을 담당. 





