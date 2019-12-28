## MongoDB



#### MongoDB 삽입 연산 Save 와 Insert 의 차이 

- save 연산은 삽입 시 _id 가 존재한다면 오류를 발생시키지 않고 그 값을 수정합니다. 그러나 이와 달리 insert() 연산은 _id 가 존재할 경우 오류가 발생하면서 삽입을 할 수 없습니다. 



EX ) 

- {ename : "sangwoo"} 라는 데이터를 employees 컬렉션에 insert 과 save 연산을 통해 삽입 

  ```json
  > db.employees.insert( {name : "sangwoo"} );
  
  WriteResult({ "nInserted" : 1 })
  ```
  
  ``` json
  > db.employees.save( {name : "sangwoo"} ); 
  
  WriteResult({ "nInserted" : 1 })
  ```

- find() 연산을 통해 삽입한 값들을 확인하면 `_id ( object id )` 가 자동으로 할당됨을 확인할 수 있습니다.

  ``` json
  > db.employees.find();
  
  { "_id" : ObjectId("5e06f9e5af2464908ef14ba7"), "name" : "sangwoo" }
  { "_id" : ObjectId("5e06f9f8af2464908ef14ba8"), "name" : "sangwoo" }
  ```

- 이제 insert 와 save 의 차이점을 비교하기 위해 위의 `_id` 중 하나에 삽입을 해봅니다.

  ``` json
  > db.employees.insert({"_id" :ObjectId("5e06f9f8af2464908ef14ba8"), name : "starkPark"} );
  
  WriteResult({
          "nInserted" : 0,
          "writeError" : {
                  "code" : 11000,
                  "errmsg" : "E11000 duplicate key error collection: test.employees index: _id_ dup key: { _id: ObjectId('5e06f9f8af2464908ef14ba8') }"
          }
  })
  ```

  ``` json
  > db.employees.save({"_id" : ObjectId("5e06f9e5af2464908ef14ba7"), name:"StarkPark"} );
  
  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  ```

  ``` json
  > db.employees.find();
  { "_id" : ObjectId("5e06f9e5af2464908ef14ba7"), "name" : "StarkPark" }
  { "_id" : ObjectId("5e06f9f8af2464908ef14ba8"), "name" : "sangwoo" }
  ```
  
  위에서 볼 수 있듯이 insert 연산은 `_id` 가 존재한다면 오류가 발생하고, save 연산은 값을 변경시키면서 삽입함을 알 수 있습니다. 







