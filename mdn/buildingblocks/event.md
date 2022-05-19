# Event 입문
이벤트란 사용자가 프로그래밍하고 있는 시스템에서 일어나는 사건(action) 혹은 발생(occurrence)이다.

이는 여러분이 원한다면 그것들이 어떠한 방식으로 응답할 수 있도록 시스템에 알려주는 것이다.

## 일련의 운 좋은 사건들
웹의 경우에, 이벤트는 브라우저 윈도우 내에서 발생되고, 해당 브라우저의 특정 요소에 의존(attach)하는 경향이 있다.

이 이벤트는 현재 브라우저 탭에서 HTML이 로드된 하나 또는 한 세트의 요소들일 것이다.

많은 다른 타입의 발생할 수 있는 이벤트들이 있다.

예를들어
- 사용자의 선택, 클릭, 특정 요소에 커서를 올리는 행위들.
- 사용자의 키보드 입력.
- 사용자의 브라우저 화면 사이즈 조작 또는 닫기.
- 웹 페이지의 로딩이 끝남.
- form이 제출됨.
- 비디어가 재생, 멈춤 또는 끝났을때.
- 에러가 발생했을 때.

[MDN event reference](https://developer.mozilla.org/en-US/docs/Web/Events) 참고하자.

이벤트에 반응하기 위해서는 사용자는 이벤트 핸들러를 붙여야한다. 

이벤트 헨들러는 이벤트가 발생할때 실행되는 코드블럭(대게, 프로그래머가 만든 JS 함수이다.)이다.
이러한 코드블럭이 이벤트에 반응해 실행되도록 정의될때, 이벤트 핸들러에 등록한다(register)라고 말한다.

이벤트 핸들러는 가끔 이벤트 리스너로 불려진다. 은밀히 말하면 리스너와 핸들러는 함께 동작하지만, 두루두루 묶여서 사용된다.

이벤트 리스너는 이벤트 상황을 듣고 핸들러는 이를 반응하여 실행되는 코드다.

웹 이벤트는 JS언어의 코어 파트가 아니다. 브라우저에 내장된 API의 일부로 정의된다.

### 웹페이지에서만?
이벤트는 JS에만 있는게 아니다. 

대부분의 프로그래밍 언어는 이벤트 모델의 종류를 갖고 있다. 그리고 그 이벤트 모델은 종종 JS의 방법과 다르게 동작한다.

사실 웹 페이지를 위한 JS의 이벤트 모덜은 다른 환경에서 사용되는 JS이벤트 모댈과 차이가 있다.

예를 들어, Node.js는 서버사이드 어플리케이션과 네트워크를 만들기위해 JS를 사용할 수 있는 유명한 놈이다.

Node.js의 이벤트 모델은 이벤트를 리스너가 듣게 하고, 발생기로 이벤트를 주기적으로 발생하는데에 의존한다.

ㅡ 별 큰차이가 없다고 느낄 수 있지만, 코드는 꾀 다르다. "on()"같은걸 이벤트 리스너에 등록하기 위해 사용하고, 한번 실행된 후 등록해지를 위해 "once()"를 이벤트 리스너 등록에 사용한다.
HTTP 연결 이벤트 문서는 좋은 예시를 제공한다.

또한, WebExtension이라 불리는 크로스 브라우저에 추가할 수 있는 브라우저 기능 향상을 만들 수 있다.

이벤트는 웹 이벤트 모델과 비슷하지만, 약간 다르다. 

이벤트 리스너의 속성들은 "camel-case"이고, "addListener"함수에 결합해야 한다.

## addEventListener() 사용하기
웹 페이지에 이벤트 핸들러를 추가하기 위해 권장되는 메커니즘은 "addEventListener()"이다.

```javascript
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
});
```

addEventListener()에 등록하는 핸들러 함수를 별도의 명명된 함수로 만드는 것이 좋다. 가독성을 위해서.
```javascript
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function changeBackground() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', changeBackground);
```

### 다른 이벤트 듣기
"click"을 아래 다른 값으로 바꿔보자.
- focus, blur 
- dbclick : double-clicked됬을 때 이벤트 핸들러 실행.
- mouseover, mouseout

"click"같은 이벤트는 어떤 요소에도 있다. 다른 이벤트는 더 구체적고 특정 상황에서 유용하다.

### 리스너 삭제
addEventListener()를 이용해 이벤트를 추가했다면, "removeEventListener()" 메소드를 사용해 이 이벤트를 지울 수 있다.

```javascript
btn.removeEventListener('click', changeBackground);
```

이벤트 핸들러는 AbortSignal을 addEventListener()에게 전달하면서 지워질 수 있다. 그리고, 나중에 AbortSignal을 소유하고있는 컨트롤러에 abort()를 호출한다.

예제를 보자, 우리는 AbortSignal로 지울 수 있는 이벤트 헨들러를 추가하자.
```javascript
const controller = new AbortController();

btn.addEventListener('click', () => {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}, { signal: controller.signal }); // pass an AbortSignal to this handler

```
그다음, 코드로 생성된 이벤트 핸들러는 다음과 같이 제거할 수 있다.
```javascript
controller.abort(); // removes any/all event handlers associated with the controller
```

거대하고, 복잡한 프로그램일수록 사용하지 않는 오래된 이벤트는 치워야 효율이 향상된다. 

이벤트 핸들러를 지울 수 있는 것은 사용자가 같은 버튼을 다른 상황에서 다른 동작을 수행하도록 할 수 있다.

### 하나의 이벤트에 여러 리스너 붙이기
addEventListener()를 한번 이상 호출하면서, 하나의 이벤트에 다른 핸들러를 제공할 수 있다.

```javascript
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
```
이제 두 함수는 myElement가 클릭되면 호출될 것이다.

### Learn more
addEventListener()는 다른 강력한 특장과 옵션이 있다.

[addEventListener() 자세히 보기](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
[removeEventListener() 자세히 보기](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

## 다른 이벤트 리스너의 메커니즘
핸들러에 이벤트를 등록하기 위해 "addEventListener()" 사용을 추천했다. 이는 가장 강력한 메소드이고 복잡한 상황에서 가장 확장에 용이하다.

그러나, 이벤트를 핸들러에 등록하는 다른 두가지이 있다.(아마 봤을 지도 모르지만) : 이벤트 핸들러의 속성들과 인라인 이벤트 헨들러가 그것

### 이벤트 핸들러 속성들
Object들은 이벤트를 실행할 수 있고 "on"과 이벤트 이름이 따라 붙는 속성을 갖는다.

예를들어, "onclick" 프로퍼티를 갖는 요소들이 있다. 이는 이벤트 핸들러 속성이라 불린다.

이벤트를 수신하기 위해, 사용자는 핸들러 함수를 속성에 할당할 수 있다.

```javascript
const btn = document.querySelector('button');

function randon(number) {
    return Math.floor(Math.random() * (number + 1));
}

btn.onclick = () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
}
```
이 코드 역시, 익명함수 말고 이름붙인 함수를 사용할 수 있다.

```javascript
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.onclick = bgChange;
```
:warning: 프로퍼티에 이벤트 핸들러를 할당하면, 하나의 이벤트에 둘이상의 핸들러를 붙일 수 없다.

```javascript 
// X
element.onclick = function1;
element.onclick = function2;
```
:warning: 속성의 기본적인 특성에 따라 이후에 속성을 설정하여면 이전 속성을 덮어쓴다. 이벤트 핸들러도 마찬가지.

### 인라인 이벤트 핸들러 - 쓰지마라
```html
<button onclick="bgChange()">Press me</button>
```

```javascript
function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```
웹에서 이벤트 핸들러를 등록하는 가장 초기 방법은 이벤트 핸들러 HTML 속성과 관련된 것이다.

이건 이제 나쁜 습관으로 간주된다. HTML과 JS를 혼용하는 것은 가독성을 떨어뜨리고, 빠르게 관리할 수 없고 비효율적이다.

단일 파일에서도 인라인 이벤트 핸들러는 쓰지마라. 유지보수를 폭밮시키고 싶음 쓰던가.

## 이벤트 Object
가끔 이벤트 헨들러 함수내에서, "event", "evt", "e"같은 이름의 특정 파라미터를 볼 수 있을 것이다.

이놈들은 이벤트 객체(event object)로 불린다. 이벤트 객체는 자동으로 추가적인 특징과 정보를 제공하기 위해 이벤트 핸들러에 전달된다.

```javascript
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

function bgChange(e) {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

btn.addEventListener('click', bgChange);
```
함수안에 e, 이벤트 객체가 포함된걸 볼 수 있다. 그리고, 이 이벤트는 "e.target"에 background color style를 세팅한다.

이벤트 객체의 속성인 "target"은  항상 이벤트가 발생한 요소에 대해 참조한다.

> :note: [Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)

"e"/"evt"/"event"는 가장 일반적으로 개발자사이에서 많이 쓰인다. 뭐든지 일관성 있게 사용하자.

### 이벤트 객체의 추가 속성
대부분의 이벤트 객체는 이벤트 객체에서 사용할 수 있는 표준 프로퍼티 세트와, 메소드를 갖는다.

예를들어, "keydown" 이벤트는 키보드 키를 눌릴때 발생한다. 이 이벤트 객체는 "KeyboardEvent"이다. 이는 이벤트 오브젝트에서 "key" 프로퍼티에 구체화 되었다.

```javascript
const textBox = document.querySelector("#textBox");
const output = document.querySelector("#output");
textBox.addEventListener('keydown', event => output.textContent = `You pressed "${event.key}".`);
```

## 기본 동작 방지
가끔, 사용자는 기본적으로 동작하는 이벤트를 방지할 상황이 온다.

예를들어 입력 폼에서, 사용자의 입력 값에 빈약한 입력 정보에대해 "submit"이벤트가 실행될 때 테스트할 수 있다.

예제는 text 필드가 공백인지 검사한다. 만약 공백이라면, 우리는 이벤트 객체에 "preventDefault()" 함수를 호출한다.

그럼, 제출동작이 중단된다. 그리고, 에러 메세지를 보여준다.

```javascript
const form = document.querySelector('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const para = document.querySelector('p');

form.addEventListener('submit', e => {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
});
```
스페이스나, 잘못된 입력값에대한 유효성검사는 생략했다.

## 이벤트 버블링과 캡처
이벤트 버블링 및 캡처는 브라우저가 중첩 요소를 대상으로 하는 이벤트를 처리하는 방법의 단계를 설명하는 용어이다.

### 상위 요소에 리스너 설정
```html
<div id="container">
    <button>Click me!</button>
</div>
<pre id="output"></pre>
```
```javascript
const output = document.querySelector('#output');
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector('#container');
container.addEventListener('click', handleClick);
```
버튼을 클릭하면, 부모가 클릭 이벤트를 발생시키는 것을 볼 수 있다.

 ```<div>``` 내부에 버튼이 있으므로, 버튼을 클릭했을때, 마찬가지고 내부 요소들도 암시적으로 클릭된다.

### 버블링 예제
```html
<body>
  <div id="container">
    <button>Click me!</button>
  </div>
  <pre id="output"></pre>
</body>
```
```javascript
const output = document.querySelector('#output');
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector('#container');
const button = document.querySelector('button');

document.body.addEventListener('click', handleClick);
container.addEventListener('click', handleClick);
button.addEventListener('click', handleClick);
```
버튼을 클릭하면, div, button, body 요소 모두 이벤트가 발생한다.

발생 순서는
- button 먼저 실행
- 다음으로 button의 부모인 div 따라감
- 다음으로 div의 부모인 body 따라감

이 현상을 가장 안쪽의 요소가 클릭되었을때 "이벤트 버블업"이라 부르며 표현한다.

이 동작은 유용할 수 있고, 예상치 못한 문제를 발생시킬 수 있다.

### 버블링과 캡처링 설명
부모 요소가 있는 요소에서 이벤트가 발생했을 때, 요즘 브라우저는 ***캡처*** 단계, ***타겟*** 단계 및 ***버블링*** 단계의 세 가지 다른 단계를 실행한다.

캡처 단계에서는
- 브라우저는 요소의 가장 바깥쪽 조상(```<html>```)이 "click"이벤트 핸들러가 등록되었는지 체크한다. 만약, 등록되있다면 이를 실행시킨다.
- 그다음, ```<html>``` 내부의 다음 요소로 이동한다, 그리고 같은 동작을 실제로 선택된 요소에 도달할 때까지 계속한다.  

타겟 단계에서는
- 브라우저는 등록된 클릭 이벤트가 그 타겟의 속성에 이벤트 핸들러로 있는지를 체크한다. 있다면, 이를 실행한다.
- 그리고, "bubles"가 "true"이면, 이는 클릭된 요소의 직계 부모에게 전파한다. ```<html>``` 요소에 도달할 때까지 계속한다.
반면, "bubles"가 "false"이면, 이는 타켓의 어떤 조상에게 전파하지 않는다. 

버블링 단계에서 캡처 단계와 정반대의 현상이 발생한다.
- 브라우저는 클릭된 요소의 직접적인 부모가 "click"버블링 단계에 대해 등록된 이벤트 핸들러를 가지고 있는지 확인하고, 있으면 실행한다.
- 그 다음, 다음 상위 요소로 이동하여 동일한 작업을 수행하고 <html>요소에 도달할 때까지 계속된다.

최신 브라우저에서는 기본적으로 모든 이벤트 핸들러가 버블링 단계에 등록된다.

> 모든 JS 이벤트는 캡처 및 대상 단계를 거친다. 이벤트가 버블링 단계에 진입하는지 여부는 읽기 전용 "bubles" 속성으로 확인할 수 있다.
> ```<html>```요소에 등록된 이벤트 리스너는 계층 구조의 최상위가 아니다. window, document 객체에 등록된 이벤트 리스너는 계층구조에서 더 높다. 

### stopPropagation()으로 문제를 해결해보자!
표준 이벤트 객체는 핸들러의 이벤트 객체가 실행될 때,호출할 수 있는 "stopPropagation()"라 불리는 실행가능한 함수를 가지고있다.

이 "stopPropagation()"는 첫번째 핸들러가 실행되지만, 그 이벤트는 더이상 상위 체인으로 버블되지 않는다, 그래서 핸들러는 더이상 동작하지 않는다.

```javascript
video.addEventListener('click', e => {
    e.stopPropagation();
    video.play();
});
```

## 이벤트 위임
이벤트 버블링은 성가신 것이 아니라, 매우 유용할 수 있다. 특히 이벤트 위임이라는 관행을 가능하게 한다.
많은 자식 요소 중 하나와 상호 작용할 때 부모 요소에 이벤트 리스너를 설정하고, 이벤트 리스너에서 발생하는 이벤트가 부모에게 버블링되도록 한다.

> event.target 이벤트의 대상(가장 안쪽 요소)이었던 요소를 가져오는 데 사용하고 있다. 만약, 이 이벤트를 처리한 요소에 엑세스 하려면 event.currentTarget 확인

[참고](event.html)