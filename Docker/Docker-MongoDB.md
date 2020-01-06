### Docker - MongoDB 설치 



1. 이미지 받아오기

   ``` bash
   $ docker pull mongo 
   ( == $ docker pull mongo:4.1 )
   ```

   이미지의 버전을 명시하지 않을 경우 가장 최신 버전의 이미지를 다운받는다. 

   

2. 기동

   MongoDB 의 기본 할당 포트는 27017. 

   호스트 pc 가 가지는 경로 `/home/test/mongodb/db` 

   컨테이너가 가지는 경로 `data/db` 

   `-auth` 옵션  : MongoDB 에서 사용하는 계정은 ID 와 패스워드 없이 사용하겠다는 옵션. 

   (볼륨 마운트는 윈도우에서 테스트가 안될 수도 있다. -  NFS 파일 시스템 때문에 )

   ```bash
   $ docker run --name mongodb_server -v /home/test/mongodb/db:data/db  \
   -d -p 16010:27017 mongo -auth
   
   7d3c81115b76b2a32871bd8b7dea666ab97053102fcd24641befe5d30c10fdec
   ```

   ```bash
   $ docker run -d --name mongodb-test -p 17017:27017 \
   -v /home/sa/data/mongod.conf:/etc/mongod.conf \
   -v /home/sa/data/db:/data/db mongo --config /etc/monod.conf
   ```

   `--config` 옵션 : 뒤의 경로 파일로 MongoDB 를 기동하라는 옵션. 

   

3. Bash 접근, Mongo 접속 

   ```bash
   $ docker exec -it mongodb_server bash
   ```

   `-it` 옵션 : 터미널 환경에다가 command 를 전달하겠다는 옵션. 

   컨테이너 이름 대신 컨테이너 ID로 대체해도 된다. 

   `bash` : 리눅스가 사용하는 bash shell 을 이용해 커맨드를 실행하겠다는 것이다. 

   ```bash
   root@xxx $ mongo
   
   MongoDB shell version v4.2.2
   ...
   >
   ```

   

4. 관리자 계정 생성 

   ```bash
   mongo > use admin
   ```

   

5. 관리자 로그인, 일반 계정 생성 

   ```bash
   mongo > db.createUser({
   user:"admin", pwd:"admin", roles: [{role : "userAdminAnyDatabase", db:"admin"}]
   })
   ```

   

6. ReplicaSet 설정 **( 실습 )**

   - MongoDB 추가 x 2 개 

   - Master )
     - rs.initiate(); 
     - rs.add("IPaddress:27017") ... 
     - db.isMaster(); 
     - DB 생성 및 추가 --> 확인 
   
7. ReplicaSet 재설정 ( Master 의 hostname 변경 )
   - mongo>  cfg = rs.conf()
   - mongo> cfg.members[0].host = "172.17.0.0.3:27017"
   - mongo> rs.reconfig(cfg)

---

   ### Docker - MongoDB RepliCaSet 실습

   


   - **MongoDB 컨테이너 2개 추가 생성 (mongodb_server_2, mongodb_server_3, ... )**
   
     생성 시 호스트 포트 번호는 다르게 설정해주어야 오류가 발생하지 않는다. 
  
     ```bash
     $ docker run --name mongodb_server_1 -d -p 16010:27017 mongo --replSet myapp
     ```
  
     ```bash
    $ docker run --name mongodb_server_2 -d -p 26010:27017 mongo --replSet myapp
     ```
  
     ```bash
     $ docker run --name mongodb_server_3 -d -p 36010:27017 mongo --replSet myapp
     ```

   

   - **Master - 레플리카셋 초기화 및 추가. **
   
     ```bash
     > rs.initiate() 
     
     {
             "info2" : "no configuration specified. Using a default configuration for the set",
             "me" : "b523a02453ff:27017",
             "ok" : 1,
             "$clusterTime" : {
                     "clusterTime" : Timestamp(1577930505, 1),
                     "signature" : {
                             "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                          "keyId" : NumberLong(0)
                     }
          },
             "operationTime" : Timestamp(1577930505, 1)
     }
     ```
   
     초기화 이후 컨테이너의 IP 주소를 이용하여 다른 컨테이너들을 Secondary 로 추가하는 작업을 진행한다. 
   
     ```bash
     myapp:PRIMARY> rs.add("172.17.0.4:27017");
     
     {
             "ok" : 1,
             "$clusterTime" : {
                     "clusterTime" : Timestamp(1577930864, 1),
                     "signature" : {
                             "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                             "keyId" : NumberLong(0)
                  }
             },
             "operationTime" : Timestamp(1577930864, 1)
     }
     
     ```
   
     ```bash
     myapp:PRIMARY> rs.add("172.17.0.5:27017");
     {
             "ok" : 1,
             "$clusterTime" : {
                     "clusterTime" : Timestamp(1577930963, 1),
                     "signature" : {
                             "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                             "keyId" : NumberLong(0)
                  }
             },
          "operationTime" : Timestamp(1577930963, 1)
     }
     
     ```
   
     위의 명령어가 올바르게 실행 되었는지는 `rs.isMaster()` 명령어를 통해 확인할 수 있다.  그러나 이 때 `rs.isMaster()` 명령어를 통해 확인해보면 Master 의 정보가 IP 주소가 아닌 HostName 으로 설정되어있다. 
     
     Secondary 가 Master 의 정보를 복제하는 과정에서는 수시로 Secondary 가 Master 의 IP 에 접근하여 DB 를 받아오는데, 현재 Master의 정보가 HostName 으로 되어있기 때문에 Secondary 에서는 Master 에서 생성하거나 수정한 DB를 볼 수 없다. 
     
     따라서 아래의 명령어를 실행하여 Master 의 정보를 IP 주소로 변경해야 한다. **(ReplicaSet 재설정)**
     
     ```bash
     myapp:PRIMARY> cfg = rs.conf();
     
     {
             "_id" : "myapp",
             "version" : 3,
             "protocolVersion" : NumberLong(1),
             "writeConcernMajorityJournalDefault" : true,
             "members" : [
                     {
                             "_id" : 0,
                             "host" : "b523a02453ff:27017",
                             "arbiterOnly" : false,
                             "buildIndexes" : true,
                             "hidden" : false,
                             "priority" : 1,
                             "tags" : {
     
                             },
                             "slaveDelay" : NumberLong(0),
                             "votes" : 1
                     },
                     {
                             "_id" : 1,
                             "host" : "172.17.0.4:27017",
                             "arbiterOnly" : false,
                             "buildIndexes" : true,
                             "hidden" : false,
                             "priority" : 1,
                             "tags" : {
     
                             },
                             "slaveDelay" : NumberLong(0),
                             "votes" : 1
                     },
                     {
                             "_id" : 2,
                             "host" : "172.17.0.5:27017",
                             "arbiterOnly" : false,
                             "buildIndexes" : true,
                             "hidden" : false,
                             "priority" : 1,
                             "tags" : {
     
                             },
                             "slaveDelay" : NumberLong(0),
                             "votes" : 1
                     }
             ],
             "settings" : {
                     "chainingAllowed" : true,
                     "heartbeatIntervalMillis" : 2000,
                     "heartbeatTimeoutSecs" : 10,
                     "electionTimeoutMillis" : 10000,
                     "catchUpTimeoutMillis" : -1,
                     "catchUpTakeoverDelayMillis" : 30000,
                     "getLastErrorModes" : {
     
                     },
                     "getLastErrorDefaults" : {
                             "w" : 1,
                             "wtimeout" : 0
                     },
                     "replicaSetId" : ObjectId("5e0d4f08dabc7f589efd37e0")
             }
     }
     ```
     
     위의 conf 에서 members 내의 첫번째 인덱스(id : 0 )의 host 이름을 컨테이너의 IP 주소로변경하자 !
     
     ```bash
     myapp:PRIMARY> cfg.members[0].host = "172.17.0.3:27017";
     
     172.17.0.3:27017
     ```
     
     ```bash
     myapp:PRIMARY> rs.reconfig(cfg);
     {
             "ok" : 1,
             "$clusterTime" : {
                     "clusterTime" : Timestamp(1577932842, 1),
                     "signature" : {
                             "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                             "keyId" : NumberLong(0)
                     }
             },
             "operationTime" : Timestamp(1577932842, 1)
     }
     ```
     
     `reconfig(cfg)` 명령어로 conf 의 정보를 변경할 수 있다. 이제 이 명령어를 사용하여 conf 내의 호스트를 변경한 후 `db.isMaster()` 로 확인하면 모두 IP 주소로 변경된 것을 확인할 수 있다. 

   

   

   - **Secondary  - DB 확인**
   
     ```bash
     > rs.slaveOk(); 
     ```
   
     위의 명령어를 실행하면, Master 에서 생성한 데이터 베이스의 정보를 Secondary 에서 확인할 수 있다. 




















- 데이터 베이스 생성 , 데이터 추가  -> 확인 

   ```bash
   $ mongo -u "admin" -p "admin" -authenticationDatabase "admin"
   mongo > use testdb db.createuser({user : "tester", pwd :"1234", roles:["dbAdmin", "readWrite"] })
   ```









##### 컨테이너의 IP 주소 확인하기

만약 `ifconfig` 명령어나 `ip addr show` 명령어가 동작하지 않을 경우 ip 를 알아내기 위해서는 `docker inspect` 명령어를 이용하여, 하단부에 IPAddress 를 찾을 수 있다. 

```bash
$ docker inspect 컨테이너ID

...
"Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.4",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
...
```







