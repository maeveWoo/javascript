## Introducing asynchronous JS
| 선행  | 컴퓨터 능력, JS 함수, 이벤트 핸들러를 포함한 핵심을 이해하기 적당한 |
|-----|----------------------------------------|
| 목표  | 비동기 JS에 익숙해지기 위해, 동기와 어떻게 다르고, 왜 필요한지  |

비동기 프로그래밍은 프로그램이 장기 실행 작업을 시작한 다음 작업이 완료될 때까지 기다릴 필요 없이 작업이 실행되는 동안 다른 이벤트에 계속 응답할 수 있도록 하는 기술이다.

많은 기능들은 브라우저를 통해 제공된다. 가장 흥미로운 부분은 잠재적으로 오랜 시간일 걸릴 수 있다. 예를 들어,
- fetch()와 만들어지는 HTTP 요청
- getUserMedia()와 사용자의 카메라 또는 마이크에 접근
- showOpenFilePicker()를 사용해, 사용자에게 선택된 파일 접근을 요청
따라서, 비동기 함수를 자주 구현할 필요가 없더라도 올바르게 사용해야 할 가능성이 매우 높다.

### 동기 프로그래밍
브라우저는 사용자가 작성한 순서대로 한 번에 한 줄씩 프로그램을 진행하고 각 지점에서 다름 줄로 넘어가기 전에 줄이 작읍을 마칠 때까지 기다린다.

각 행은 이전 행에서 수행된 작업에 따라 달라지기 때문에 이 작업을 수행해야 한다.

```javascript
function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}

const name = 'Miriam';
const greeting = makeGreeting(name);
console.log(greeting);
// "Hello, my name is Miriam!"
```
makeGreeting()은 동기 함수이다. 호출자는 함수가 반환된기 전에 함수가 작업을 완료할 때까지 기다려야 하기 때문이다.

### 장기 실행 동기 함수
동기 함수에 시간이 오래 걸린다면?

소수 생성하는 기능과 버튼이 몇 초가 걸린다면?

함수가 실행되는 동안 프로그램이 완전히 응답하지 않는다는 것을 알 수 있다.
사용자는 입력이나, 클릭같은 다른 작업을 할 수 없다.

우리가 원하는 프로그램 동작방식은
- 함수를 호출하여 장기 실행 작업 시작
- 함수가 작업을 시작하고, 즉시 반환하도록 하여 프로그램이 여전히 다른 이벤트에 응답할 수 있도록 한다.
- 작업이 최종적으로 완료되면 작업 결과를 알려준다.
이것이 비동기 함수가 우리에게 제공하는 것이며, 이 모듈의 나머지 부분에서는 JavaScript에서 구현되는 방법을 설명한다.

### 이벤트 핸들러
위의 비동기 함수에 대한 설명은 이벤트 핸들러를 떠올리게 할 수 있다. 
이벤트 핸들러는 실제로 비동기 프로그래밍의 한 형태이다. 

즉시가 아니라 이벤트가 발생할 때마다 호출되는 함수(이벤트 핸들러)를 제공한다.
"이벤트"가 "비동기 작업이 완료됨"이면 이벤트를 사용하여 비동기 함수 호출의 결과를 호출자에게 알리는 방법을 알 수 있다.

"XMLHttpRequest" API는 사용자가 HTTP 요청을 JS를 이용해 원격 서버에 요청할 수 있게 한다. 
비동기 API는 긴 시간이 걸릴 수 있다. 그리고, "XMLHttpRequest" 객체에 이벤트 리스너를 붙여서 요청의 진행과 이벤트 완료에대한 정보를 알 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>asynchronous</title>
</head>

<body>
<h1>asynchronous</h1>
<button id="xhr">Click to start request</button>
<button id="reload">Reload</button>

<pre readonly class="event-log"></pre>

<script>
    const log = document.querySelector('.event-log');
    
    document.querySelector('#xhr').addEventListener('click', () => {
        log.textContent = '';
        
        const xhr = new XMLHttpRequest();
        
        xhr.addEventListener('loadend', () => {
           log.textContent = `${log.textContent} Finished with status : ${xhr.status}`; 
        });
        
        xhr.open('GET', 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json');
        xhr.send();
        log.textContent = `${log.textContent} Started XHR request \n`;
    });
    
    document.querySelector('#reload').addEventListener('click', () => {
       log.textContent = '';
       document.location.reload();
    });
    
</script>
</body>
</html>
```
