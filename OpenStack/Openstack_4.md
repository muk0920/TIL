### Manual 설치 - (10.0.0.11)

https://docs.openstack.org/install-guide/ 의 좌측 Environment 를 순차적으로 진행. 



##### Host Networking

아래의 작업은 XShell 에서 manual (10.0.0.11) 계정을 생성 및 접속하여 진행한다. 

1. ```bash
   [root@controller ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
   
   # UUID = ... 				# 주석 처리 
   IPADDR = "10.0.0.11"		# 아이피주소 변경 
   ```

2. ```bash
   [root@controller ~]# systemctl restart network
   ```

3. ```bash
   [root@controller ~]# ip a
   ```

4. ```bash
   cat /etc/hosts
   
   # 아래와 같이 IP 변경
   127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
   ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
   10.0.0.11 controller
   10.0.0.31 compute1
   ```

   
   

##### Network Time Protocol ( NTP )

**NTP** 란 네트워크로 연결되어 있는 컴퓨터들끼리 클럭 시각을 동기화하는데 사용되는 프로토콜. 

1. ```bash
   [root@controller ~]# yum install chrony -y 
   ```

2. ```bash
   [root@controller ~]# vi /etc/chrony.conf
   
   # Use public servers from the pool.ntp.org project.
   # Please consider joining the pool (http://www.pool.ntp.org/join.html).
   server 0.centos.pool.ntp.org iburst
   server 1.centos.pool.ntp.org iburst
   #server 2.centos.pool.ntp.org iburst		# 주석
   #server 3.centos.pool.ntp.org iburst		# 주석
   server 10.0.0.100 iburst					# 추가
   ```

3.  NTP 설정 확인 작업 

   ```bash
   [root@controller ~]# date
   2020. 01. 10. (금) 09:41:07 KST
   
   [root@controller ~]# systemctl status chronyd
   ● chronyd.service - NTP client/server
      Loaded: loaded (/usr/lib/systemd/system/chronyd.service; enabled; vendor preset: enabled)
      Active: active (running) since 금 2020-01-10 09:06:26 KST; 34min ago
        Docs: man:chronyd(8)
              man:chrony.conf(5)
              ...
   1월 10 09:09:09 controller chronyd[754]: Selected source 106.247.248.106
   Hint: Some lines were ellipsized, use -l to show in full.
   ```

   ```bash
   [root@controller ~]# systemctl restart chronyd 		# chronyd 서비스 재시작
   ```

   ```bash
   [root@controller ~]# chronyc sources
   210 Number of sources = 3
   MS Name/IP address         Stratum Poll Reach LastRx Last sample               
   ===============================================================================
   ^? 10.0.0.100                    0   6     0     -     +0ns[   +0ns] +/-    0ns
   ^? 106.247.248.106               2   6     3     2    -82us[  -82us] +/-   23ms
   ^+ ec2-54-180-134-81.ap-nor>     2   6     7     2   +202us[ +195us] +/-   49ms
   ```

   100번한테 시간을 요청해 시간을 받아온다. 



##### OpenStack packages  (CentOS)

1. ```bash
   [root@controller ~]# yum repolist
   ```

2. ```bash
   [root@controller ~]# yum install python-openstackclient
   ```

3. ```bash
   [root@controller ~]# yum install openstack-selinux
   ```



##### SQL database

여러 서비스에 대한 메타 정보를 DB 로 관리. 

1. ```bash
   [root@controller ~]# yum install mariadb mariadb-server python2-PyMySQL
   ```

2. ```bash
   [root@controller ~]#vi /etc/my.cnf.d/openstack.cnf 
   
   # DB 를 시작하는데 필요한 Parameter 만 수정. mysqld 데몬 시작 시 아래 옵션으로 실행. 
   
   [mysqld]
   bind-address = 10.0.0.11 # 10.0.0.11 으로 들어오는 요청만 응답하겠다. 여러 인터페이스 중 특정 인터페이스를 지정하여 들어오는 request 를 처리함을 의미. 
   
   default-storage-engine = innodb
   innodb_file_per_table = on
   max_connections = 4096
   collation-server = utf8_general_ci
   character-set-server = utf8
   ```

3. ```bash
   [root@controller ~]# systemctl enable mariadb.service
   
   Created symlink from /etc/systemd/system/multi-user.target.wants/mariadb.service to /usr/lib/systemd/system/mariadb.service.
   ```

4. ```bash
   [root@controller ~]# systemctl start mariadb.service
   ```

5. ```bash
   [root@controller ~]# systemctl status mariadb.service
   
   mariadb.service - MariaDB 10.1 database server
      Loaded: loaded (/usr/lib/systemd/system/mariadb.service; enabled; vendor preset: disabled)
      Active: active (running) since 금 2020-01-10 09:57:56 KST; 1min 49s ago
   								....
   ```

6. ```bash
   [root@controller ~]# mysql_secure_installation 
   # root 비번 설정, 불필요한 보안상의 이슈 제거.
   # 비번 abc 123 으로 설정. 
   # 모든 설정 다 Yes . 
   ```

7. ```bash
   [root@controller ~]# mysql -uroot -pabc123
   
   Welcome to the MariaDB monitor.  Commands end with ; or \g.
   Your MariaDB connection id is 11
   							....
   MariaDB [(none)]>
   ```





##### Message Queue ( RabbitMQ 사용)



![image-20200110102246928](images/image-20200110102246928.png)

만약 메시지 큐를 사용하지 않는다면 , 보내는 입장에서는 상대방이 계속 받을 때 까지 계속 기다려야한다. 이러한 문제를 해결하기 위해 메시지 큐를 사용하고, 보내는 입장은 메시지 큐에 메시지를 요청하기만 하고 자기 할 일을 하면 된다. 

**메시지 큐** : 메시지 

​     직접 요청 방식 -> sync 방식														 큐에 요청서를 보내는 방식 -> async 방식



1. ```bash
   [root@controller ~]# yum install rabbitmq-server
   ```

2. ```bash
    [root@controller ~]# systemctl enable rabbitmq-server.service
    
   Created symlink from /etc/systemd/system/multi-user.target.wants/rabbitmq-server.service to /usr/lib/systemd/system/rabbitmq-server.service.
   ```

3. ```bash
   [root@controller ~]# systemctl start rabbitmq-server.service
   ```

4. ```bash
    # 비밀번호 설정 및 사용자 추가 
    [root@controller ~]# rabbitmqctl add_user openstack RABBIT_PASS
      
    Creating user "openstack"
   ```

5. ```bash
   [root@controller ~]# rabbitmqctl set_permissions openstack ".*" ".*" ".*"
   
   Setting permissions for user "openstack" in vhost "/"
   ```

6. ```bash
   [root@controller ~]# rabbitmqctl status
   
   Status of node rabbit@controller
   [{pid,12448},
    {running_applications,
        [{rabbit,"RabbitMQ","3.6.16"},
         {mnesia,"MNESIA  CXC 138 12","4.14.3"},
         {ranch,"Socket acceptor pool for TCP protocols.","1.3.2"},
   								.......
   ```



**비교 )**  all-in-one 으로 구성된 `10.0.0.100` 에서는 rabbit 이 게스트로 구성되어있다.  

```bash
$ grep rabbit /etc/*/*conf 
```

![image-20200110103128018](images/image-20200110103128018.png)





##### Memcached 



DB 의 엑세스에 대한 성능 저하를 개선하기 위해, 한 번 I/O 한 것을 캐쉬로 이용하는 것. 

1. ```bash
   [root@controller ~]# yum install memcached python-memcached
   ```

2. ```bash
   [root@controller ~]# vi /etc/sysconfig/memcached
   # OPTIONS 에 10.0.0.11 을 추가 
   
   PORT="11211"
   USER="memcached"
   MAXCONN="1024"
   CACHESIZE="64"
   OPTIONS="-l 127.0.0.1,::1,10.0.0.11" 		## ::1 은 IPv6 를 의미
   ```

3. ```bash
   [root@controller ~]# systemctl enable memcached.service
   [root@controller ~]# systemctl start memcached.service
   [root@controller ~]# systemctl status memcached.service
   ```

4. ```bash
   [root@controller ~]#  ss -nlp|grep 11211			# 11211 PORT 번호. 
   # Listen 이 있으면 성공. 
   tcp    LISTEN     0      128    10.0.0.11:11211                 *:*                   users:(("memcached",pid=13947,fd=28))
   tcp    LISTEN     0      128    127.0.0.1:11211                 *:*                   users:(("memcached",pid=13947,fd=26))
   tcp    LISTEN     0      128       [::1]:11211              [::]:*                   users:(("memcached",pid=13947,fd=27))
   ```

**비교 )**  `10.0.0.100`  -> 모든 IP 에 대해 허용  반면 `10.0.0.11` 은 특정 IP 에 대해서만 허용 

```bash
[root@controller ~]# ss -nlp|grep 11211

udp    UNCONN     0      0         *:11211                 *:*                   users:(("memcached",pid=1584,fd=18),("memcached",pid=1584,fd=17))
tcp    LISTEN     0      128       *:11211                 *:*                   users:(("memcached",pid=1584,fd=16))
```





##### Install OpenStack services



##### Keystone - prerequisites (사전작업)

https://docs.openstack.org/keystone/rocky/install-keystone-rdo.html



1. ```bash
   [root@controller ~]# mysql -uroot -p
   ```

2. ```mysql
   MariaDB [(none)]> CREATE DATABASE keystone;
   ```

3. ```mysql
   MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' \
       -> IDENTIFIED BY 'KEYSTONE_DBPASS';
   Query OK, 0 rows affected (0.01 sec)
   
   MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' \
       -> IDENTIFIED BY 'KEYSTONE_DBPASS';
   Query OK, 0 rows affected (0.01 sec)
   ```

4. 키스톤의 conf 파일에 정보가 다 들어가있기 때문에 일반 사용자들이 볼 수 없도록 read 권한을 없어야한다. 

   ```bash
   [root@controller ~]# ls -l /etc/keystone/keystone.conf
   -rw-r-----. 1 root keystone 120342  1월  8 14:28 /etc/keystone/keystone.conf
   ```

5. ```bash
   [root@controller ~]# vi /etc/keystone/keystone.conf
   
   # 741 번 하단에 아래 문장 추가
   connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@controller/keystone
   # 2829 라인 주석 해제
   provider = fernet		
   ```

6. ```bash
   # 아래 명령어를 이용하여 테이블을 생성 
   [root@controller ~]# su -s /bin/sh -c "keystone-manage db_sync" keystone
   ```

7. ```bash
   # mysql DB table 이 위치하는 디렉터리에 테이블이 잘 생성되었는지 확인
   [root@controller ~]# ls /var/lib/mysql/keystone
   access_token.frm                 group.frm              policy.ibd                  service.frm
   access_token.ibd                 group.ibd              policy_association.frm      service.ibd
   application_credential.frm       id_mapping.frm         policy_association.ibd      service_provider.frm
   application_credential.ibd       id_mapping.ibd         project.frm                 service_provider.ibd
   application_credential_role.frm  identity_provider.frm  project.ibd                 system_assignment.frm
   application_credential_role.ibd  identity_provider.ibd  project_endpoint.frm        system_assignment.ibd
   assignment.frm                   idp_remote_ids.frm     project_endpoint.ibd        token.frm
   assignment.ibd                   idp_remote_ids.ibd     project_endpoint_group.frm  token.ibd
   config_register.frm              implied_role.frm       project_endpoint_group.ibd  trust.frm
   config_register.ibd              implied_role.ibd       project_tag.frm             trust.ibd
   consumer.frm                     limit.frm              project_tag.ibd             trust_role.frm
   consumer.ibd                     limit.ibd              region.frm                  trust_role.ibd
   credential.frm                   local_user.frm         region.ibd                  user.frm
   credential.ibd                   local_user.ibd         registered_limit.frm        user.ibd
   db.opt                           mapping.frm            registered_limit.ibd        user_group_membership.frm
   endpoint.frm                     mapping.ibd            request_token.frm           user_group_membership.ibd
   endpoint.ibd                     migrate_version.frm    request_token.ibd           user_option.frm
   endpoint_group.frm               migrate_version.ibd    revocation_event.frm        user_option.ibd
   endpoint_group.ibd               nonlocal_user.frm      revocation_event.ibd        whitelisted_config.frm
   federated_user.frm               nonlocal_user.ibd      role.frm                    whitelisted_config.ibd
   federated_user.ibd               password.frm           role.ibd
   federation_protocol.frm          password.ibd           sensitive_config.frm
   federation_protocol.ibd          policy.frm             sensitive_config.ibd
   
   ```

8. ```bash
   # 토큰 자체를 암호화하기 위해서 사용하는 메소드
   
   [root@controller ~]#  keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
   
   [root@controller ~]# keystone-manage credential_setup --keystone-user keystone --keystone-group keystone
   ```

9. ```bash
   # 키스톤에 대한 엔드포인트를 등록
   [root@controller ~]# keystone-manage bootstrap --bootstrap-password ADMIN_PASS \
   >   --bootstrap-admin-url http://controller:5000/v3/ \
   >   --bootstrap-internal-url http://controller:5000/v3/ \
   >   --bootstrap-public-url http://controller:5000/v3/ \
   >   --bootstrap-region-id RegionOne
   ```

   `10.0.0.100의 keystonerc_admin` 에서 엔드포인트의 목록을 확인 

   `public`  :  stack1 이나 mgr1 등의 사용자의 엔트포인트

   `internal` : 내부 서비스들 간의 엔드포인트

   `admin` : 관리 목적의 엔드포인트

   ```bash
   [root@controller ~(keystone_admin)]# openstack catalog list
   
   +-----------+--------------+---------------------------------------------------------+
   | Name      | Type         | Endpoints                                                 
   +-----------+--------------+---------------------------------------------------------+
   | keystone  | identity     | RegionOne                                                 
   |           |              |   admin: http://10.0.0.100:35357/v3                       
   |           |              | RegionOne                                                 
   |           |              |   internal: http://10.0.0.100:5000/v3                     
   |           |              | RegionOne                                                 
   |           |              |   public: http://10.0.0.100:5000/v3                       +-----------+--------------+---------------------------------------------------------+
   ```



##### Keystone - configure the apache HTTP server 

1. ```bash
   [root@controller ~]# vi /etc/httpd/conf/httpd.conf
   
   # 95 번 라인 하단에 추가 
   ServerName controller
   ```

2. ```bash
   [root@controller ~]# ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/
   ```

3. ```bash
   [root@controller ~]# systemctl enable httpd.service
   Created symlink from /etc/systemd/system/multi-user.target.wants/httpd.service to /usr/lib/systemd/system/httpd.service.
   
   [root@controller ~]# systemctl start httpd.service
   [root@controller ~]# systemctl status httpd.service
   ```

4.  keystone 을 이용하여 CLI 환경에서 작업하기 위해서는 환경 변수 설정을 해줘야한다.

   ```bash
   [root@controller ~]#  export OS_USERNAME=admin
   [root@controller ~]#  export OS_PASSWORD=ADMIN_PASS
   [root@controller ~]#  export OS_PROJECT_NAME=admin
   [root@controller ~]#  export OS_USER_DOMAIN_NAME=Default
   [root@controller ~]#  export OS_PROJECT_DOMAIN_NAME=Default
   [root@controller ~]#  export OS_AUTH_URL=http://controller:5000/v3
   [root@controller ~]#  export OS_IDENTITY_API_VERSION=3
   ```

5. ```bash
   [root@controller ~]# openstack user list
   +----------------------------------+-------+
   | ID                               | Name  |
   +----------------------------------+-------+
   | 7491c9fef03a494185cfc5307f9fdf03 | admin |
   +----------------------------------+-------+
   
   ```



##### Create a domain, projects, user and roles 



1. ```bash
   [root@controller ~]# openstack domain create --description "An Example Domain" example
   +-------------+----------------------------------+
   | Field       | Value                            |
   +-------------+----------------------------------+
   | description | An Example Domain                |
   | enabled     | True                             |
   | id          | 66f848f80ad3428d97af91bddbca1db6 |
   | name        | example                          |
   | tags        | []                               |
   +-------------+----------------------------------+
   ```

2. ```bash
   [root@controller ~]# openstack project create --domain default --description "Service Project" service
   +-------------+----------------------------------+
   | Field       | Value                            |
   +-------------+----------------------------------+
   | description | Service Project                  |
   | domain_id   | default                          |
   | enabled     | True                             |
   | id          | a9801c704adb46e5b47ab02396de734f |
   | is_domain   | False                            |
   | name        | service                          |
   | parent_id   | default                          |
   | tags        | []                               |
   +-------------+----------------------------------+
   
   ```

3. ```bash
   [root@controller ~]# openstack project create --domain default --description "Demo Project" myproject
   +-------------+----------------------------------+
   | Field       | Value                            |
   +-------------+----------------------------------+
   | description | Demo Project                     |
   | domain_id   | default                          |
   | enabled     | True                             |
   | id          | 7a33a91ff64842868e4e5a169aea2a1e |
   | is_domain   | False                            |
   | name        | myproject                        |
   | parent_id   | default                          |
   | tags        | []                               |
   +-------------+----------------------------------+
   ```

4. ```bash
   [root@controller ~]# openstack user create --domain default --password abc123 myuser
   +---------------------+----------------------------------+
   | Field               | Value                            |
   +---------------------+----------------------------------+
   | domain_id           | default                          |
   | enabled             | True                             |
   | id                  | 7fd0a764421d444daffc851a2565ff76 |
   | name                | myuser                           |
   | options             | {}                               |
   | password_expires_at | None                             |
   +---------------------+----------------------------------+
   ```

5. ```bash
   [root@controller ~]# openstack role create myrole
   +-----------+----------------------------------+
   | Field     | Value                            |
   +-----------+----------------------------------+
   | domain_id | None                             |
   | id        | d51e882898d6456d8bc4d7fb23105d5d |
   | name      | myrole                           |
   +-----------+----------------------------------+
   ```

6. ```bash
   [root@controller ~]# openstack role add --project myproject --user myuser myrole
   
   # 현재 프로젝트에 myrole 을 assign
   ```



##### Keystone - Create openstack client environment scripts



`PS1` : Shell 에서 프롬프트 모양을 변경하는 환경변수. 

1. 현재 메뉴얼에서는 PS1 이 없기 때문에 Shell 프롬프트의 모양이 변하지 않는다. 따라서 `10.0.0.100` 의 `cat keystonerc_admin` 의 `PS1` 부분을 복사하여 메뉴얼 부분의 아래 admin-openrc 에 추가해준다. 

   ```bash
   [root@controller ~]# vi admin-openrc
   
   export OS_PROJECT_DOMAIN_NAME=Default
   export OS_USER_DOMAIN_NAME=Default
   export OS_PROJECT_NAME=admin
   export OS_USERNAME=admin
   export OS_PASSWORD=ADMIN_PASS
   export OS_AUTH_URL=http://controller:5000/v3
   export OS_IDENTITY_API_VERSION=3
   export OS_IMAGE_API_VERSION=2
   export PS1='[\u@\h \W(keystone_admin)]\$ '	# 10.0.0.100 에서 복사해서 추가.
   ```

2. ```bash
   [root@controller ~]# vi demo-openrc
   
   export OS_PROJECT_DOMAIN_NAME=Default
   export OS_USER_DOMAIN_NAME=Default
   export OS_PROJECT_NAME=myproject
   export OS_USERNAME=myuser
   export OS_PASSWORD=abc123		# abc123 으로 변경 
   export OS_AUTH_URL=http://controller:5000/v3
   export OS_IDENTITY_API_VERSION=3
   export OS_IMAGE_API_VERSION=2
   export PS1='[\u@\h \W(keystone_myuser)]\$ '	# admin -> user 로 변경 
   ```

3. ```bash
   [root@controller ~]# . admin-openrc
   [root@controller ~(keystone_admin)]# openstack token issue
   +------------+--------------------------------------------------------------------+
   | Field      | Value                                                                   +------------+----------------------------------------------------------------------+
   | expires    | 2020-01-10T05:30:37+0000                                               
   | id         | gAAAAABeF_3tsX9pJZKjIMlksL5JK_l-DK5RiraH7KEuocr8nKM1hspKYXLb4RiHDC1ryyp-go9dOWVbWJ_4hEfJw8z6PIX1pQrlz_ihBmITrm6L75UAcNP9tTK5oDiD6OrQg6aIH_sVnBe1n4fzUxyFKNiHsKHOCRNgjWodBEBJJCPnkr7toE0 |
   | project_id | f5568fee7ebf46baa9239902b278710e                                       
   | user_id    | 7491c9fef03a494185cfc5307f9fdf03                                       
   +------------+---------------------------------------------------------------------+
   ```

4. ```bash
   [root@controller ~(keystone_admin)]# . demo-openrc
   [root@controller ~(keystone_myuser)]# openstack token issue
   +------------+-----------------------------------------------------------------------+
   | Field      | Value                                                                   
   +------------+-----------------------------------------------------+
   | expires    | 2020-01-10T05:30:49+0000                                               
   | id         | gAAAAABeF_35OEObf0Ux0vx10MoNPSVlaG496KTaCz1tL22EgnJugxKYjEjadywkGOePfrpNE1igqi8ezIcRC-SfIt4zCwg0X2ZYM_gmqrhrtUmyGLK5lm0Y91RYiR9ameyiw2VhiDGVSqJxRl-ozr9Fz-ftiWWgrsvsZsFUh8w2N8W0bNPJ4q4 |
   | project_id | 7a33a91ff64842868e4e5a169aea2a1e                                       
   | user_id    | 7fd0a764421d444daffc851a2565ff76                                       
   +------------+--------------------------------------------------------------------+
   ```



---

---

## Image Service ( Galance )



```bash
[root@controller ~(keystone_admin)]# glance image-list		# 서비스 커맨드의 CLI 는 - 필요
+--------------------------------------+------------+
| ID                                   | Name       |
+--------------------------------------+------------+
| 9f60ddf3-c70e-44f3-a8a7-24e7a5a3098c | class      |
| 7bafedce-f1d1-4885-8e22-fd424b6a03bb | class-snap |
+--------------------------------------+------------+
```

```bash
[root@controller ~(keystone_admin)]# openstack image list
+--------------------------------------+------------+--------+
| ID                                   | Name       | Status |
+--------------------------------------+------------+--------+
| 9f60ddf3-c70e-44f3-a8a7-24e7a5a3098c | class      | active |
| 7bafedce-f1d1-4885-8e22-fd424b6a03bb | class-snap | active |
+--------------------------------------+------------+--------+
```





##### Prerequisites

1. ```bash
   [root@controller ~(keystone_myuser)]# mysql -u root -p
   Enter password: 
   ```

2. ```bash
   MariaDB [(none)]>  CREATE DATABASE glance;
   Query OK, 1 row affected (0.00 sec)
   ```

3. ```bash
   MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' \
       ->   IDENTIFIED BY 'GLANCE_DBPASS';
   Query OK, 0 rows affected (0.00 sec)
   
   MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' \
       ->   IDENTIFIED BY 'GLANCE_DBPASS';
   Query OK, 0 rows affected (0.00 sec)
   ```

4. ```bash
   [root@controller ~(keystone_myuser)]# . admin-openrc
   ```

5. ```bash
   [root@controller ~(keystone_admin)]# openstack user create --domain default --password GLANCE_PASS glance
   +---------------------+----------------------------------+
   | Field               | Value                            |
   +---------------------+----------------------------------+
   | domain_id           | default                          |
   | enabled             | True                             |
   | id                  | 68c669eb2a884c71977ea046e206a81a |
   | name                | glance                           |
   | options             | {}                               |
   | password_expires_at | None                             |
   +---------------------+----------------------------------+
   ```

   만약 위의 과정이 오류가 났을 경우 `openstack user set --domain default --password GLANCE_PASS glance` 를 이용하여 비밀번호를 새롭게 설정한다. 

6. ```bash
   # role assign 
   
   [root@controller ~(keystone_admin)]# openstack role add --project service --user glance admin
   ```

7. ```bash
   # 서비스 생성 
   [root@controller ~(keystone_admin)]# openstack service create --name glance --description "OpenStack Image" image
   +-------------+----------------------------------+
   | Field       | Value                            |
   +-------------+----------------------------------+
   | description | OpenStack Image                  |
   | enabled     | True                             |
   | id          | a6139cbef8a44551983f07c780da28b8 |
   | name        | glance                           |
   | type        | image                            |
   +-------------+----------------------------------+
   ```

8.  ```bash
   # 서비스 등록 ( endpoint 3개 반복해서 등록 -public , internal, admin )
   ```

   ```bash
   [root@controller ~(keystone_admin)]# openstack endpoint create --region RegionOne \
   >   image public http://controller:9292
   
   +--------------+----------------------------------+
   | Field        | Value                            |
   +--------------+----------------------------------+
   | enabled      | True                             |
   | id           | f188e5215a504a1fa9486892bccf7c4d |
   | interface    | public                           |
   | region       | RegionOne                        |
   | region_id    | RegionOne                        |
   | service_id   | a6139cbef8a44551983f07c780da28b8 |
   | service_name | glance                           |
   | service_type | image                            |
   | url          | http://controller:9292           |
   +--------------+----------------------------------+
   ```

   ```bash
   [root@controller ~(keystone_admin)]# openstack endpoint create --region RegionOne \
   >   image internal http://controller:9292
   +--------------+----------------------------------+
   | Field        | Value                            |
   +--------------+----------------------------------+
   | enabled      | True                             |
   | id           | 9539ee7730384f8999fb3df89568f353 |
   | interface    | internal                         |
   | region       | RegionOne                        |
   | region_id    | RegionOne                        |
   | service_id   | a6139cbef8a44551983f07c780da28b8 |
   | service_name | glance                           |
   | service_type | image                            |
   | url          | http://controller:9292           |
   +--------------+----------------------------------+
   ```

   ```bash
   [root@controller ~(keystone_admin)]# openstack endpoint create --region RegionOne \
   >   image admin http://controller:9292
   +--------------+----------------------------------+
   | Field        | Value                            |
   +--------------+----------------------------------+
   | enabled      | True                             |
   | id           | 57bdb083281545aeae695d16440454db |
   | interface    | admin                            |
   | region       | RegionOne                        |
   | region_id    | RegionOne                        |
   | service_id   | a6139cbef8a44551983f07c780da28b8 |
   | service_name | glance                           |
   | service_type | image                            |
   | url          | http://controller:9292           |
   +--------------+----------------------------------+
   ```



##### Install and configure components

1. ```bash
   [root@controller ~(keystone_admin)]# yum install openstack-glance -y
   ```

2. ```bash
   [root@controller ~(keystone_admin)] vi /etc/glance/glance-api.conf
   
   #1900번 라인 하단에 추가.[database]
   connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance
   
   # 3472 라인 하단에 추가. [keystone_authtoken]
   www_authenticate_uri  = http://controller:5000
   auth_url = http://controller:5000
   memcached_servers = controller:11211
   auth_type = password
   project_domain_name = Default
   user_domain_name = Default
   project_name = service
   username = glance
   password = GLANCE_PASS
   
   # 4422 라인 주석 해제. [paste_deploy]
   flavor = keystone
   
   # 2007 라인 하단에 추가. [glance_store]
   # 파일 저장소 유형을 http 형태로 업로드해서 저장. 
   # 로컬 디렉터리에는 기본 파일로 저장. 데이터를 /var/lib/glance/images/ 에 저장.
   stores = file,http
   default_store = file
   filesystem_store_datadir = /var/lib/glance/images/
   ```

   확인 ) `10.0.0.100` 에서 `/var/lib/glance/images/ ` 를 확인하면 아래와 같이 저장되어있다. 

   ```bash
   [root@controller ~(keystone_admin)]# cd /var/lib/glance/images/
   
   [root@controller images(keystone_admin)]# ls -l
   합계 34336
   -rw-r-----. 1 glance glance 21889024  1월  9 14:33 7bafedce-f1d1-4885-8e22-fd424b6a03bb
   -rw-r-----. 1 glance glance 13267968  1월  9 09:55 9f60ddf3-c70e-44f3-a8a7-24e7a5a3098c
   ```

3. ```bash
   [root@controller ~(keystone_admin)]# vi /etc/glance/glance-registry.conf
   
   # 1146번 라인 하단에 추가. [database]
   connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance
   
   # 1253 라인 하단에 추가. [keystone_authtoken]
   www_authenticate_uri = http://controller:5000
   auth_url = http://controller:5000
   memcached_servers = controller:11211
   auth_type = password
   project_domain_name = Default
   user_domain_name = Default
   project_name = service
   username = glance
   password = GLANCE_PASS
   
   # 2175 라인 주석 해제. [paste_deploy]
   flavor = keystone
   ```

4. ```bash
   [root@controller ~(keystone_admin)]#  su -s /bin/sh -c "glance-manage db_sync" glance
   ```

   위의 명령어를 실행하고 `/var/lib/mysql/glance ` 를 확인하여 아래와 같이 나와야한다. 

   ```bash
   [root@controller ~(keystone_admin)]# ls /var/lib/mysql/glance
   alembic_version.frm   image_properties.ibd                  metadef_namespaces.ibd      metadef_tags.ibd
   alembic_version.ibd   image_tags.frm                        metadef_objects.frm         migrate_version.frm
   db.opt                image_tags.ibd                        metadef_objects.ibd         migrate_version.ibd
   image_locations.frm   images.frm                            metadef_properties.frm      task_info.frm
   image_locations.ibd   images.ibd                            metadef_properties.ibd      task_info.ibd
   image_members.frm     metadef_namespace_resource_types.frm  metadef_resource_types.frm  tasks.frm
   image_members.ibd     metadef_namespace_resource_types.ibd  metadef_resource_types.ibd  tasks.ibd
   image_properties.frm  metadef_namespaces.frm                metadef_tags.frm
   ```

5. ```bash
   [root@controller ~(keystone_admin)]# systemctl enable openstack-glance-api.service openstack-glance-registry.service
   
   Created symlink from /etc/systemd/system/multi-user.target.wants/openstack-glance-api.service to /usr/lib/systemd/system/openstack-glance-api.service.
   Created symlink from /etc/systemd/system/multi-user.target.wants/openstack-glance-registry.service to /usr/lib/systemd/system/openstack-glance-registry.service.
   ```

   ```bash
   [root@controller ~(keystone_admin)]# systemctl start openstack-glance-api.service openstack-glance-registry.service
   ```

   ```bash
   [root@controller ~(keystone_admin)]# yum install -y openstack-utils
   ```

   위의 과정을 모두 하고 아래와 같이 Glance Service `api` 와 `registry`  가 `active` 상태임을 확인한다. 

   ```bash
   [root@controller ~(keystone_admin)]# openstack-status
   
   == Glance services ==
   openstack-glance-api:                   active
   openstack-glance-registry:              active
   									......
   ```



##### Glance 서비스 테스트

1. 사용가능한 서버 이미지를 Glance 서비스에 업로드하기위해 기존의 웹사이트에서 제공하는 이미지 파일을 먼저 다운로드 해야한다. 우리는 `wget` 명령어를 이용하기 위해 먼저 `wget` 패키지를 설치한다. 

   ```bash
   [root@controller ~(keystone_admin)]# yum install -y wget
   ```

   그리고 아래의 사이트에서 `cirros-0.3.5-x86 64-disk.img` 파일의 링크를 복사하여 `wget` 명령어를 이용하여 다운로드 한다. 

   https://download.cirros-cloud.net/0.3.5/

   https://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img

   ```bash
   [root@controller ~(keystone_admin)]# wget https://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   ```

   이미지 파일 다운로드 확인. 

   ```bash
   [root@controller ~(keystone_admin)]# ls
   admin-openrc  anaconda-ks.cfg  cirros-0.3.5-x86_64-disk.img  demo-openrc  stack1  관리  내부
   [root@controller ~(keystone_admin)]# file cirros-0.3.5-x86_64-disk.img 
   cirros-0.3.5-x86_64-disk.img: QEMU QCOW Image (v2), 41126400 bytes
   ```

2. Glance 서비스에 이미지 생성 

   ```bash
   [root@controller ~(keystone_admin)]# openstack image create "cirros" \
   --file cirros-0.3.5-x86_64-disk.img  \
   --disk-format qcow2 --container-format bare \
   --public
   
   # Glance 서비스에서 사용할 이름으로 'cirros' 를 지정.
   # KMU/QEMU 가 사용하는 디스크 포맷과 기본 컨테이너의 포맷을 지정. 
   # public 옵션은 공개적으로 접근이 가능하다는 것을 의미.
   # 이 때 public 을 하기 위해서는 admin 권한이어야한다.  
   ```

3. Glance 서비스의 이미지 생성 확인 

   ```bash
   [root@controller ~(keystone_admin)]# openstack image list
   +--------------------------------------+--------+--------+
   | ID                                   | Name   | Status |
   +--------------------------------------+--------+--------+
   | 77364a4a-8636-4505-abe6-7e6ab4831f80 | cirros | active |			# active 임을 확인
   +--------------------------------------+--------+--------+
   ```

   ```bash
   [root@controller ~(keystone_admin)]# ls -l /var/lib/glance/images/
   합계 12960
   -rw-r-----. 1 glance glance 13267968  1월 10 15:13 77364a4a-8636-4505-abe6-7e6ab4831f80
   ```

   





`all-in-one ( 10.0.0.100 )` 에서 아래와 같이 작업. 디렉터리는 `cd  ` 를 이용하여 home 으로 이동한 후 작업

```bash
# manual (10.0.0.11) 안의 ci 로 시작하는 모든 파일을 현재 위치로 복사 
[root@controller images(keystone_admin)]# cd 
[root@controller ~(keystone_admin)]# scp 10.0.0.11:/root/ci* .

The authenticity of host '10.0.0.11 (10.0.0.11)' can't be established.
ECDSA key fingerprint is SHA256:d1ymkTtNZIe7LzZg7ymfzqbZUd4msFrU8LL/8CKZfek.
ECDSA key fingerprint is MD5:78:d7:c2:f3:03:0d:96:8f:6f:66:d5:a1:93:24:e3:23.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.11' (ECDSA) to the list of known hosts.
root@10.0.0.11's password: 
cirros-0.3.5-x86_64-disk.img                                                    100%   13MB  42.7MB/s   00:00    
```

```bash
# 이미지에 대한 세부 정보 확인 명령어. 

[root@controller ~(keystone_admin)]# qemu-img info cirros-0.3.5-x86_64-disk.img 
image: cirros-0.3.5-x86_64-disk.img
file format: qcow2
virtual size: 39M (41126400 bytes)
disk size: 13M
cluster_size: 65536
Format specific information:
    compat: 0.10
    refcount bits: 16
```

```bash
# vm 이미지로 convert 가능하다.( img 파일을 vmdk 파일로 convert 하여 저장하겠다. ) 
[root@controller ~(keystone_admin)]# qemu-img convert -O vmdk  cirros-0.3.5-x86_64-disk.img cirros-0.3.5-x86_64-disk.vmdk
```

```bash
[root@controller ~(keystone_admin)]# ls -l ci*
-rw-r--r--. 1 root root 13267968  1월 10 15:28 cirros-0.3.5-x86_64-disk.img
-rw-r--r--. 1 root root 21561344  1월 10 15:30 cirros-0.3.5-x86_64-disk.vmdk
```



```bash
[root@controller ~(keystone_admin)]# ss -nlp|grep 9292
tcp    LISTEN     0      128       *:9292                  *:*                   users:(("glance-api",pid=22668,fd=4),("glance-api",pid=22667,fd=4),("glance-api",pid=22616,fd=4))

#glance-api 프로세스가 9292 포트를 열어두고, Glance request 를 대기하고 있다. 
#Nova 쪽에서 사용 요청이 들어오면 사용할 수 있게끔 파일 서비스를 해준다. 
```



###### 윈도우에서 vmdk 파일로 convert 잘 됐는지 확인하는 작업 

0. `/win` 디렉터리에 마운트 하고, `/share` 디렉터리에 vmdk 파일을 복사한다. 

   ```bash
   [root@controller ~(keystone_admin)]# vmhgfs-fuse /win   # win 에 마운트 
   
   [root@controller ~(keystone_admin)]# df -h
   Filesystem           Size  Used Avail Use% Mounted on
   								......
   vmhgfs-fuse          931G  143G  789G  16% /win
   
   # share 디렉터리로 복사. 
   [root@controller ~(keystone_admin)]# cp cirros-0.3.5-x86_64-disk.vmdk /win/share
   ```

1. `C:` -> `openstack` -> `cirros` 디렉터리 생성. 

2. 위의 작업에서` /share` 로 복사한 `cirros-0.3.5-x86_64-disk.vmdk`파일을 `cirros` 디렉터리 밑으로 복사 

3. 복사한 이미지를 이용하여 새로운 가상머신 생성. (확인 용도이기때문에 메모리 64MB 로 진행)

![image-20200110154234273](images/image-20200110154234273.png)

![image-20200110155234677](images/image-20200110155234677.png)

![image-20200110155254497](images/image-20200110155254497.png)

4. 가상머신이 잘 생성 되면 `vmdk` 가 잘 Convert 되었다는 것을 알 수 있다. 

   ![image-20200110155331562](images/image-20200110155331562.png)





**메뉴얼(10.0.0.11)에서 진행 **

`cloud.centos.org/centos/7/images/`  -> 아래 파일의 링크를 복사해서 `wget` 명령어를 이용하여 제공된 클라우드 이미지를 다운로드 

![image-20200110160815504](images/image-20200110160815504.png)

```bash
[root@controller ~(keystone_admin)]# wget http://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud-1508.qcow2c
```



```bash
openstack image create "centos7" --file CentOS-7-x86_64-GenericCloud-1508.qcow2c --disk-format qcow2 --container-format bare --public
```



```bash
# 인스턴스 정보를 확인할 수 있다. 
# virsh 는 CLI 의 콘솔로 접근하는 기능을 제공. 
[root@controller ~(keystone_admin)]# virsh list --all
```



---



**all-in-one (10.0.0.100)** 에서 작업 

https://docs.openstack.org/nova/rocky/install/controller-install-rdo.html

```bash
# 포트가 열렸는지 확인하는 명령어. 
$ ss -nlp|grep 포트번호

[root@controller ~]# ss -nlp|grep 8774
tcp    LISTEN     0      128       *:8774                  *:*                   users:(("nova-api",pid=3130,fd=6),("nova-api",pid=3128,fd=6),("nova-api",pid=3121,fd=6),("nova-api",pid=3120,fd=6),("nova-api",pid=1563,fd=6))

```

keystone : 5000번 포트 

horizon : 80 포트 

이름이 전부 http . 같은 프로세스인데 포트로 서비스가 구분이 된다. 



콘솔 연결이 안 될 경우 `/etc/nova/nova.conf` 파일의  `server_proxyclient_address = $my_ip` 가 잘못 설정됐을 가능성이 있다. 



---



#### Console 을 이용하여 Instance 에 직접 접근하기



대쉬보드에서 stack1 로 로그인 이후 class-instance  인스턴스를 시작한다. 

그리고 controller(10.0.0.100) 에서 `ps -ef ` 명령어를 이용하여 서비스 중인 가상 머신에 대한 정보를 확인한다. 

```bash
[root@controller ~]# ps -ef|grep kvm
qemu      47827      1 53 16:51 ?        00:00:02 /usr/libexec/qemu-kvm -name guest=instance-00000001,debug-threads=on -S -object secret,id=masterKey0,format=raw,file=/var/lib/libvirt/qemu/domain-1-instance-00000001/master-key.aes -machine pc-i440fx-rhel7.6.0,accel=tcg,usb=off,dump-guest-core=off -m 64 -realtime mlock=off -smp 1,sockets=1,cores=1,threads=1 -uuid 414426ac-4c1e-42f7-925c-98ab62acea1f -smbios type=1,manufacturer=RDO,product=OpenStack Compute,version=18.2.3-1.el7,serial=1637a6f7-b180-43f3-aa4e-156aa86673ab,uuid=414426ac-4c1e-42f7-925c-98ab62acea1f,family=Virtual Machine -no-user-config -nodefaults -chardev socket,id=charmonitor,fd=26,server,nowait -mon chardev=charmonitor,id=monitor,mode=control -rtc base=utc -no-shutdown -boot strict=on -device piix3-usb-uhci,id=usb,bus=pci.0,addr=0x1.0x2 -drive file=/var/lib/nova/instances/414426ac-4c1e-42f7-925c-98ab62acea1f/disk,format=qcow2,if=none,id=drive-virtio-disk0,cache=none -device virtio-blk-pci,scsi=off,bus=pci.0,addr=0x4,drive=drive-virtio-disk0,id=virtio-disk0,bootindex=1,write-cache=on -netdev tap,fd=28,id=hostnet0 -device virtio-net-pci,host_mtu=1450,netdev=hostnet0,id=net0,mac=fa:16:3e:64:43:b2,bus=pci.0,addr=0x3 -add-fd set=2,fd=30 -chardev pty,id=charserial0,logfile=/dev/fdset/2,logappend=on -device isa-serial,chardev=charserial0,id=serial0 -device usb-tablet,id=input0,bus=usb.0,port=1 -vnc 0.0.0.0:0 -k en-us -device cirrus-vga,id=video0,bus=pci.0,addr=0x2 -device virtio-balloon-pci,id=balloon0,bus=pci.0,addr=0x5 -sandbox on,obsolete=deny,elevateprivileges=deny,spawn=deny,resourcecontrol=deny -msg timestamp=on
root      47839  45837  0 16:51 pts/0    00:00:00 grep --color=auto kvm
```



```bash
# admin 에서는 인스턴스가 안보이기 때문에 stack 으로 바꿔준 이후에 list 를 확인 

[root@controller ~]# . keystonerc_stack1
[root@controller ~(keystone_stack1)]# nova list
+--------------------------------------+----------------+---------+------------+---------
| ID                                   | Name           | Status  | Task State | Power State | Networks                       |
+--------------------------------------+----------------+---------+------------+--------
| 4d58fb7e-fa44-44b0-823a-43e96985aa3f | class-snap     | SHUTOFF | -          | Shutdown    | init1=192.168.0.2, 10.0.0.217  |
| 414426ac-4c1e-42f7-925c-98ab62acea1f | class_instance | ACTIVE  | -          | Running     | init1=192.168.0.12, 10.0.0.211 |
+--------------------------------------+----------------+---------+---------------------+
```

```bash
# 인스턴스의 상태를 확인하는 명령어. 

[root@controller ~(keystone_stack1)]# virsh list --all
 Id    이름                         상태
----------------------------------------------------
 1     instance-00000001              실행중
 -     instance-00000002              종료
```

```bash
# virsh 는 CLI 의 콘솔로 접근하는 기능을 제공. 인스턴스에 콘솔로 직접 접근 

[root@controller ~(keystone_stack1)]# virsh console 1 
도메인 instance-00000001에 연결되었습니다
Escape character is ^]

login as 'cirros' user. default password: 'cubswin:)'. use 'sudo' for root.
class-instance login: cirros
Password: 
$ lsblk
NAME   MAJ:MIN RM    SIZE RO TYPE MOUNTPOINT
vda    253:0    0      1G  0 disk 
`-vda1 253:1    0 1011.9M  0 part /
$ exit
```

exit 한 이후에도 console 1 에 붙어있는 상태다. 따라서 `Ctrl + ]` 를 이용하여 붙어있는 상태를 해제해야한다. 

```bash
login as 'cirros' user. default password: 'cubswin:)'. use 'sudo' for root.
class-instance login: 		# 현재 console 1 에 붙어있는 상태 
[root@controller ~(keystone_stack1)]# 	# Ctrl + ]  을 이용하여 붙어있는 상태를 해제한 이후.
```







---

#### Mission ( 수업 시간 과제 ) 

#### 	새로운 가상머신 compute 생성하고 IP 와 Hostname 을 변경해라



- 가상머신 cpu 2 개   / Memory  2G  

- IP 변경 

```bash
$ vi /etc/sysconfig/network-scripts/ifcfg-ens33

# UUID 주석 처리 
# IPADDR 은 10.0.0.101 로 변경 (100 이 존재하기때문에 충돌)
```

![image-20200110173908626](images/image-20200110173908626.png)

```bash
$ systemctl restart network
$ ip a
```

![image-20200110174226980](images/image-20200110174226980.png)



- Hostname 변경 

```bash
$ hostname
controller 

$ hostname compute1  # compute1 로 호스트 이름 변경 
$ hostname 
compute1
```



- XShell 을 이용하여 Compute1 에 접속 

  ![image-20200110174602647](images/image-20200110174602647.png)