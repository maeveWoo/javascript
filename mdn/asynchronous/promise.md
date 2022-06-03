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

fetchPromise.then(response => {
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
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        console.log(json[0].name);
    });
```

### 에러 잡기

"fetch()" API는 많은 이유의 에러를 던질 수 있다. (예를 들어, 네트워크 연결이 없거나, URL이 잘못됬거나.. 등)
그리고 만약 서버가 에러를 반환하면, 사용자가 에러를 던질 수 있다.

에러를 처리하기 위해서, Promise객체는 "catch()"메서드를 제공한다. 얘는 "then()"과 비슷하다.
"catch()"메서드는 호출해서 핸들러 함수에서 전달할 수 있다.
그러나,비동기 연산이 성공되면, 핸들러가 "then()"에 전달되어 호출되고, 실패할 경우 핸들러는 "catch()"로 전달되어 호출된다.

만약 promise 체인의 끝에 "catch()"를 추가하면, 어떤 비동기 함수 호출의 실패가 있다먄 "catch()"가 호출된다.
따라서, 사용자는 많은 연속적인 비동기 함수호출오 연산을 구현할 수 있다. 그리고, 한 장소에서 전체 에러를 다룰 수 있다.

연습해보장

```javascript
const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        console.log(json[0].name);
    })
    .catch(error => {
        console.error(`Could not get products: ${error}`);
    });
```

### Promise 전문용어

Promise는 구체적인 전문용어와 함께하는데, 이를 명확히하는것은 가치가 있다.

먼저, Promise는 세가지 상태가 있을 수 있다.

1. pending : Promise가 생성이되면, Promise와 연관된 비동기함수는 아직 성공이나 실패하지 않았다.
   이는 "fetch()" 호출이 반환되지않은 상태이고, 요청이 만들어지는 중이다.
2. fulfilled : 비동기함수가 성공했다. Promise가 fulfilled일때, Promise의 "then" 핸들러가 호출된다.
3. rejected : 비동기함수가 실패했다. Promise가 거절되면, Promise의 "catch()" 핸들러가 호출된다.

"성공", "실패"의 의미는 API에 달려있다.,예를 들어, "fetch()"에서 404 Not Found 같은 에러를 서버가 반환하면, 요청이 성공했다고 판단하지만.
네트워크 에러가 보내진 요청을 막는다면, 성공이라 판단하지 않는다.

가끔 "fulfilled"와 "rejected" 모두를 칭하기 위해서 "settled"라는 용어를 사용한다.

Promise는 "settled"이거나, "locked in" 상태일때, 다른 Promise의 상태를 따라가기 위해 해체된다.

### 여러 Promise 연결하기

사용자가 많은 비동기 함수로 구성된 연산이 필요로할때, Promise 체인을 쓴다. 그리고 사용자는 각각의 Promise는 다음 Promise를 시작하기 전에 완료되야한다.
그러나 아마도 사용자는 비동기 함수 호출을 결합하는 방법을 필요로 할 수 있다. Promise API는 이 기능을 지원해준다.

가끔, 시용자는 모든 Promise가 fulfill 상태일때가 필요하다. 그러나 Promise들은 각자에게 의존하지 않는다.

이런 경우에, 모두 함께 시작한 다음 모두 완료(fulfill)되면 알려지는게 더 효율적이다.
이 "Promise.all()" 메서드는 사용자가 필요한 것이다. "Promise.all()"은 "Promise"의 배열을 받아서, 하나의 Promise를 반환한다.

"Promise.all()"로 반환되는 Promise는

- 배열에서 모든 Promise가 fulfilled 상태일때, 완성(fulfilled)된다. 이 경우, "then()" 핸들러는 모든 응답의 배열과 호출되고, 마찬가지로 Promise는 "all()"로 전달된다.
- 만약 배열의 어느 Promise 든, 거절이 되면 "catch()" 핸들러는 거절된 Promise를 통해 던져진 에러와 함께 호출된다.

```javascript
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( responses => {
        for ( const response of responses ) {
            console.log(`${response.url}: ${response.status}`);
        }  
    })
    .catch( error => {
        console.error(`Failed to fetch: ${error}`);
    });
```
위 예제는 3개의 다른 URL에 "fetch()"요청을 만든다. 만약 저들이 전부 성공하면, 각각의 응답상태를 기록할 것이다. 만약 어떠한 실패가 생기먄, 실패를 기록한다.

비록, 두번째 요청이 404를 반환해도 모든 요청이 완료된다. 출력은 아래와 같다.
```
https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json: 200
https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found: 404
https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json: 200
```

다음과 같이 잘못된 형식의 URL로 동일한 코드를 시도하면,
```javascript
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( response => {
        for (const reponse of reponses) {
            console.log(`${response.url}: ${response.status}`);
        } 
    })
    .catch( error => {
       console.error(`Failed to fetch: ${error}`); 
    });
```
예상했듯이 "catch()" 핸들러가 실행되고 아래와 비슷한 결과물을 볼 수 있다.
```
Failed to fetch: TypeError: Failed to fetch
```

사용자는 하나하나를 고려하지 않는, 완료된 Promise 세트하나가 필요할 수 있다. 이 경우 "Promise.any()"를 쓴다.
"Promise.all()"와 비슷하게, Promise의 배열중 어떤 Promise가 fulfiled 상태이자마자 완료되기를 기대한다. 배열의 모든 Promise가 reject되면, rejected가 된다.

```javascript
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
    .then( response => {
        console.log(`${response.url}: ${response.status}`);
    })
    .catch( error => {
        console.error(`Failed to fetch: ${error}`);
    })
```
이 경우, 어떤 요청이 첫번쨰로 완려될지는 알 수 있다.

여러 "Promise"의 결합을 위한 두가지 추가기능이다. [Promise 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)에서 추가로 알아보자.

### async와 await
"async" 키워드는 비동기 Promise 기반 코드와 함께 사용자에게 더 쉬운 방법을 제공한다.
"async"를 함수의 시작부에 추가하면, 비동기 함수가 만들어진다.
```javascript
async function myFunction() {
    // This is an async function
}
```
Promise를 반환하는 함수를 호출하기 전에, 비동기 함수 내부에서 "await" 키워드를 사용할 수 있다.
"await"가 있는 코드를 Promise가 완료될때까지 기다리게 만든다. 이때 Promise의 완료된 값이 반환되거나, 거부된 값이 던져진다.

이는 사용자가 동기 코드처럼보이는, 비동기 코드를 작성할 수 있게 한다.
예시를 보자.
```javascript
async function fetchProducts() {
    try {
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await reponse.json();
        console.log(json[0].name);
    } catch (error) {
        console.log(`Could not get products: ${error}`);
    }
}
```
호출자는 "Promise"를 받는 대신, "await fetch()"를 호출은, 완전히 완료된 "Response"객체를 받는다."fetch()"가 동기 함수인것처럼

기록할 것은, 비동기 함수는 항상 Promise를 반환한다는 것이다. 아래 예시를 보자.

```javascript
async function fetchProducts() {
    try {
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}

const json = fetchProducts();
console.log(json[0].name); // json is a Promise object, so this will not work
```
아래와 같은 작업이 필요할 수 도 있다.

```javascript
async function fetchProducts() {
    try {
        const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}

const jsonPromise = fetchProducts();
jsonPromise.then(json => console.log(json[0].name));
```
사용자는 다른 Promise체인 사용을 하는 곳에서 "async" 함수를 많이 사용할 것이다.
그리고 "async","await"는 Promise를 더 직관적으로 사용할 수 있게해준다.

Promise 체인같이, "await"는 비동기 연산을 단계적으로 완성되게 할 수 있다는 것을 명심해라.
만약, 다름 연산이 다음연센에 의존할 때, 이 작업이 필요하지만, 이와 같은 경우가 아니라면, "Promise.all()"이 성능이 더 좋다.

### 결론
Promise는 최신 JS에서 비동기 프로그래밍의 근간이다. 얘는 표현하기 더 쉽게만들고, 비동기 연산의 연속을 깊고 복잡한 콜백없이 사용할 수 있다.
그리고, 동기 "try...catch"구문과 비슷하게 에러를 다룰 수 있는 스타일을 제공한다.

"async"와 "await" 키워드는 Promise 체인을 명확하게 생성할 필요 없이, 연속적인 비동기 함수 호출의 반복을 더 쉽게 만들 수 있게해준다.
그리고 코드를 비동기 코드처럼 보이게 할 수있다.

Promise는 Opera Mini, IE11와 이전버전을 제외하고, 최신 브라우저는 모두 지원된다. 
