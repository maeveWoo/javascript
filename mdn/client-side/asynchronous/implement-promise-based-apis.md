## How to implement a promise-based API
Promise를 반환하는 API들을 어떻게 구현할까? 이는 Promise기반의 API를 사용하는 것보다 더 일반적인 경우이다.

일반적으로, Promise 기반의 API를 구현할때, 사용자는 비동기 연산으로 이벤트나, 일반적인 콜백이나, 메세지 전달 모델을 감싼다.

## alarm() API 구현하기
이번 예제에서, "alarm()"이라 불리는 Promise 기반의 알람 API를 구현할 것이다.
이 기능은, 깨울 사람의 이름을 아규먼트로 받을 것이고, 사람을 깨우기 전에, 밀리세컨내로 기다린다.
기다림 끝에, 이 기능은 일어나야되는 사람의 이름을 포함해서 "Wake up!"이라는 메시지는 보낼것이다.

### setTimeout() 쌈싸기
"alarm()"함수구현을 위해 "setTimeout()" API를 사용할 것이다.
이 "setTimeout()" API는 콜백함수를 아규먼트로 받는다. 그리고 전달받은 밀리세컨단위를 기다린다.

```html
<button id="set-alarm">Set alarm</button>
<div id="output"></div>
```

```javascript
const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
    window.setTimeout(() => {
       output.textContent = 'Wake up!'; 
    }, 1000);
}

button.addEventListener('click', setAlarm);
```

### Promise 생성자
우리의 "alarm()" 함수는 타이머가 만료될때, Promise객체는 완료되고 Promise객체를 반환할 것이다.

이 Promise는 "then()" 핸들러에 "Wake up!" 메세지를 전달할 것이다.
호출자가 음수의 값을 제공하면, Promise는 reject 될 것이다. 

여기서 핵심 컴포넌트는 "Promise()" 생성자이다. "Promise()" 생성자는 하나의 함수를 아규먼트로써 받는다.
이 함수는 "executor"라고 불린다. 새로운 Promise를 생성할 때, 사용자는 "executor"의 구현을 공급한다.

이 "executor" 함수는 스스로 2개의 아규먼트를 받는데, 이둘은 모두 함수이고, 일반적으로 "resolve"와 "reject"라고 불려진다.

사용자의 "executor" 구현에서, 기본 비동기함수를 호출한다.
만약, 비동기 함수가 성공하면, 사용자는 "resolve"를 호출하고, 실패하면 "reject"를 호출한다.

만약에 executor가 에러를 던지면, "reject"가 자동으로 호출된다.

```javascript
function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error('Alarm delay must not be negative');
        }
        window.setTimeout(() => {
           resolve(`Wake up, ${person}!`); 
        }, delay);
    });
}
```
이 항수는 새로운 Promise를 반환한다. 
- "delay"가 음수인지 체크, 맞으면 에러를 던진다.
- "window.setTimeout()"을 호출, 콜백과 "delay"를 전달. 콜백은 타이머가 만료되면 호출되고, 
"Wake up" 메세지를 전달하며, 콜백은 "resolve"를 호출한다.

### alarm() API 사용하기

```javascript
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)
    .then(message => output.textContent = message)
    .catch(error => output.textContent = `Couldn't set alarm: ${error}`);
});
```

### alarm() API에 async와 await 사용하기
alarm()은 Promise를 반환하기 때문에, "Promise.all()", "async"/"await"같은 Promise와 chaining할 수 있다.

```javascript
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});
```


