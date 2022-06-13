# Worker 소개
워커는 여러 실행 쓰레드에서 어떤 과제들을 실행할 수 있도록 해준다.
사용자의 프로그램에서 긴시간이 걸리는 동기 과제가 있을때, 전체 윈도우는 완전히 반응할 수 없는 상태가된다.
근본적으로, 이 이유는 프로그램이 싱글-스레드이기 때문이다. 
쓰레드는 프로그램에 따라오는 일련의 도구이다. 싱글 스레드로 구성된 프로그램은 동시에 한가지 일만 처리할 수 있다.
그래서, 긴 시간동안 동작하는 동기 호출을 기다려야한다면, 이는 다른 작업은 할 수 없다.

워커는 사용자에게 다른 과제를 다른 스레드에서 실행할 수 있게할 수 있다. 그래서, 과제를 시작할 수 있고,
(사용자의 액션을 처리하는 것과같은)다른 작업을 계속진행할 수 있다.

멀티 스레드 코드는, 사용자의 스레드가 멈추거나, 다른 스레드가 멈출때, 다른 스레드가 실행할 기회를 갖일때를 알 수 없다.
만약, 이 두 스레드가 같은 변수에 접근했을 때, 언제든지 예상치 못한 변경될 수 있다. 그리고, 이 버그는 발견하기 어렵다.

웹에서, 이 문제를 피하기위해, 사용자의 메인 코드와 사용자의 워커코드는 각자 다른 변수레 직접접근하지 않는다.
워커와 메인코드는 완전히 분리되어 실행되고, 각자 다른 메시지를 보냄으로써 상호작용한다.

이 의미는 워커는 DOM에 접근할 수 없다는 의미이다.

세 종류의 worker가 있다.
- Dedicated worker
- Shared worker
- Service worker

이 글에선, 첫번째 워커만 정리하고, 나머지 두개는 짧게 훝는다

## web worker 사용하기

### 동기 소수 생성기
```javascript
function generatePrimes(quota) {
    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++ c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }
    const primes = [];
    const maximun = 1000000;
    
    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximun + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }
    return primes;
}

document.querySelector('#generate').addEventListener('click', () => {
   const quota = document.querySelector('#quota').value;
   const primes = generatePrimes(quota);
   document.querySelector('#output').textContent = `Finished generating ${quota} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
   document.querySelector('$user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
   document.location.reload();
});
```
이 예제에서, "generatePrimes()"를 호출한 뒤에, 프로그램은 완전히 반응이 없게 될것이다.

### 워커로 만든 소수 생성기
예제의 구성은 
- index.html
- style.css
- main.js
- generate.js

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="main.js" defer></script>
    <link href="style.css"rel="stylesheet">
  </head>

  <body>

    <label for="quota">Number of primes:</label>
    <input type="text" id="quota" name="quota" value="1000000">

    <button id="generate">Generate primes</button>
    <button id="reload">Reload</button>

    <textarea id="user-input" rows="5" cols="62">Try typing in here immediately after pressing "Generate primes"</textarea>

    <div id="output"></div>

  </body>

</html>
```

```css
textarea {
  display: block;
  margin: 1rem 0;
}
```

main.js
```javascript
const worker = new Worker('./generate.js);

document.querySelector('#generate').addEventListener('click', () => {
   const quota = document.querySelector('#quota').value;
   worker.postMessage({
       command: 'generate',
       quota: quota
   });
});

worker.addEventListener('message', message => {
    document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
   document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
   document.location.reload();
});
```
- 먼저, "Worker()"생성자를 이용해, 워커를 생성했다. worker 스크립트를 지정하는 URL을 넘겨줬다.
워커가 생성되자마자, 워커 스크립트는 실행될 것이다.
- 다음으로, 동기 버전에서 처럼, "Generate primes"에다 "click"이벤트 핸들러를 붙인다. 이젠, "generatePrimes()"함수를 부를 것이다. 
"worker.postMessage()"를 이용해, 워커에게 메세지를 보낸다. 이 메시지는 인자를 받을 수 있고, 이 경우 두개의 프로퍼티가 포함된 JSON을 전달한다.
  - "command" : 우리가 워커가 하길 원하는 것을 명확히한다. 
  - "quota" : 생성할 소수의 숫자
- 다음으로, "message" 이벤트 행들러를 워커에 붙인다. 워커의 작업이 끝나면, 전달할 수 있고, 어떤 결과의 데이터를 넘겨준다.
핸들러는 메시지의 "data"속성으로 부터 데이터를 받고, 출력 엘리먼트에 작성한다.
- 마지막으로, "Reload"버튼을 위해 "click"이벤트 핸들러를 구현한다. 

generate.js
```javascript
addEventListener("message", message => {
    if (message.data.command === 'generate') {
        generatePrimes(message.data.quota);
    }
});

function generatePrimes(quota) {
    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }
    
    const primes = [];
    const maximum = 1000000;
    
    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }
    
    postMessage(primes.length);
}
```
이 코드는 main 스크립트가 워커를 생성하자마자 실행된다.

워커는 먼저 main 스크립트로 부터 메세지를 듣기 시작한다. 이 동작은 워커에 있는 글로벌 함수인 "addEventListener()"를 사용한다.

"message" 이벤트 핸들러 내부에는, 이벤트의 속성 "data"는 메인 스크립트로부터 전달받은 인자의 복사본이 포함되어있다.

만약 메인 스크립트가 "generate" 커맨드를 전달하면, "generatePrimes()"를 호출하고, 메세지 이벤트에서 "quota" 값을 전달한다.

"generatePrimes()" 함수는 동기 버전같다. 값을 반환하길 기대하는 대신, 메인 스크립트에게 메세지를 전달한다.

"postMessage()" 함수를 사용할 때, "addEventListener()" 처럼, "postMessage()"는 워커에서 글로벌 함수이다.

이미 봤던것 처럼, 메인 스크립트는 이 메세지를 듣고, 메시지를 받으면, DOM을 업데이트 한다.


## 다른 워커
"dedicated worker"만 생성해보았다. 

다른 타입의 워커는
- shared worker는 다른 윈도우에서 실행중인 몇몇 다른 스크립트로부터 공유되어지는
- service worker는 프록시 서버처럼 동작한다. 사용자가 오프라인일때, 웹 애플리케이션은 캐싱된 리소스로 동작할 수 있다.
이는 Progressive Web Apps의 핵심 컴포넌트이다.
