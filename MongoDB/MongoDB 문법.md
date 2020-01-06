## MongoDB 문법 비교 분석

- MongoDB는 `Json` 타입으로 데이터를 저장. 

  

- **Create & Alter 문 **

  ``` bash
  db.members.insert(); 
  ```

  ``` bash
  db.createCollection(name,[options]);
  ```

  name 은 생성하려는 컬렉션의 이름이며, option은 document 타입으로 구성된 해당 컬렉션의 설정 값. 

  

- **Insert 문 **

  ```bash
  db.members.save({mem_no : "123"});
  ```

  ```json
  db.members.insert({mem_no : "123"});
  ```

  

- Update Records 문 ** 

  ```bash
  db.members.update({name : 'tomas'}, { $set: {age :32 }});
  ```

  `$set` 을 해야 해당 필드만 변경됩니다.  만약 `$set` 을 넣지 않고 그냥 {age:32} 를 할 경우 tomas 의 다큐먼트가 지워지고 {age:32} 라는 객체로 통째로 바뀌게 됩니다. 

  

- **Select 문 **

  ``` json
  db.members.find(); 
  ```

  

- **Delect 문** 

  ``` json
  db.members.remove({mem_no:"123"});
  ```

  ```bash
  db.members.remove(); 
  ```
  
  