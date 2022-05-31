## How to use promises
Promise는 최근 JS에서 비동기 프로그래밍의 기초다.
Promise는 비동기 함수를 통해 객체를 반환하는데, 이 객체는 연산의 최신 상태를 표현한다.
Promise가 호출자에게 반되는 순간, 연산자는 종종 끝나지 않았다. 하지만, promise 객체는 연산의 성공 혹은 실패 발생을 다루는 메서드를 제공한다.

Promise 기반의 API와 비동기 함수는 연산을 사작하고, Promise 객체를 반환한다.
사용자는 Promise 객체에 핸들러를 붙일 수 있고, 연산이 실패 또는 성공했을 때, 다룰 수 있다.

### fetch() API 사용하기
HTTP 요청을 만들 것이다. HTTP 요청에서, 원격 서버에 요청 메시지를 보내고, 응답을 반환할 것이다.

이 경우, 서버로부터 JSON파일을 얻기위해 요청을 보낼 것이다. 

Intro에서 사용한 XMLHttpRequest API 대체품인, 최신 Promise 기반의 fetch() API를 사용한다.

```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then( response => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request...");
```
1. fetch() API 호출을 하고, fetchPromise 변수에 반환값을 할당한다.
2. 즉시, fetchPromise 변수를 로깅한다. 출력값은 다음과 같이 생겼을 것이다.
```Promise { <state>: "pending" }```, "Promise"객체를 갖고있다고 보여주며, "pending" 상태를 갖고있다.
"pending" 상태의 의미는 fetch 연산이 아직 진행 중임을 표시한다.
3. Promise의 "then()" 메소드로 핸들러 함수를 전달한다. fetch 연산자가 성공하면, Promise는 사용자의 핸들러를 호출하고, Response 객체를 전달한다.
이 Response 객체는 서버의 응답을 갖는다.
4. 메시지를 로깅한다.

아웃풋을 살짝 보장
```
Promise { <state>: "pending" }
Started request...
Received response: 200
```
"Started request..."는 응답을 받기전에 로깅된걸 보자. 동기함수와 다르게, "fetch()"는 요청이 진행되는 동안 반환한다.
사용자의 프로그램이 응답가능하게 유지한다. 응답은 200 OK 상태 코드를 보여주고, 이는 요청이 성공했다는 의미이다.

"XMLHttpRequest" 객체에 이벤트 핸들러를 붙인 예제와 많이 비슷할지 모른다.
요거 대신, 핸들러를 반환된 promise의 메서드인 "then()"에 전달했다.

### Chaining promises
"fetch()" API에서 "Response"객체를 한번받으면, 응답 데이터를 받기위해 사용자는 다른 함수를 호출해야한다.

이 예제에서, JSON 형태의 응답 데이터를 원한다. 그래서, 우리는 Response 객체의 "json()" 메서드를 호출한다.
얘는 "json()"도 역시 비동기로 호출된다. 그래서, 이 경우는 두개의 성공한 비동기 함수를 호출해야한다.

```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise.then(response => {
   const jsonPromise = response.json();
   jsonPromise.then(json => {
      console.log(json[0].name); 
   });
});
```
위 코드는 callback hell 과 비슷하다.

Promise의 우아한 특징은, "then()"은 Promise 자신을 반환한다. 이 반환값은 함수의 결과값으로 전달되어 완성된다.
이 의미는 서용자가 아래처럼 코드를 수정할 수 있다.
```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
    .then(response => {
        return response.json();
    })
    .then(json => {
       console.log(json[0].name); 
    });
```
첫번쨰 "then()"내부에 두번째 "then()"을 호출하는 대신에, 사용자는 "json()"을 통해 Promise를 반환할 수 있다.
그리고, 두번째 "then()"을 반환값에서 호출할 수 있다. 

이를 "Promise chaining"이라고 부르고, 이는 사용자가 연이은 비동기 함수 호출이 필요할 때, 들여쓰기 레빌의 무한 증가를 피하게 해준다.

나아가서, 사용자가 요청을 읽으려고 시도하기 전에, 서버가 요청을 받고, 처리되었는지를 체크해야한다.
아래 예제는 응답의 status 코드를 체크를 하고, "OK"가 아니면, 에러를 던진다.
```javascript
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
    .then( response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then( json => {
       console.log(json[0].name); 
    });
```

### 에러 잡기
"fetch()" API는 많은 이유의 에러를 던질 수 있다. (예를 들어, 네트워크 연결이 없거나, URL이 잘못됬거나.. 등)
그리고 만약 서버가 에러를 반환하면, 사용자가 에러를 던질 수 있다.

에러를 처리하기 위해서, Promise객체는 "catch()"메서드를 제공한다. 얘는 "then()"과 비슷하다.
"catch()"메서드는 호출해서 핸들러 함수에서 전달할 수 있다.
그러나, 핸들러가 "then()"
