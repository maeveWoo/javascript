# Functions
하나의 일을 하는 코드 조각을 정의된 블록 안에 저장하고, 같은 코드를 여러 번 타이핑하기보다는, 하나의 짧은 명령을 사용하여 사용자가 그 함수가 필요할 때 언제든지 그 코드를 호출할 수 있게한다.

기본 문법(syntax)과, 어떻게 함수를 호출(invoke)하고 정의하는지, 스코프, 그리고 매개변수와 같은 핵심적인 개념들을 탐구한다.

for loop, while과 do... while loop, 또는 if...else문과 같은 일반적인 내장 언어 구조를 사용하지 않고 ㅡ () ㅡ 같은 괄호 쌍을 사용했다면 함수를 사용한것이다.

## 브라우저 내장 함수
이미 많은 브라우저 내장(built-in) 함수를 사용해왔다.
```javascript
myText.replace('string', 'sausage');

myArray.join(' ');

Math.random();
```

사실, 브라우저 내장 함수를 호출할 때 호출하는 일부 코드는 JS로 작성될 수 없었다. 이는 JS와 같은 웹 언어가 아니라 대체로 C++와 같은 저수준 시스템 언어로 작성된다.

몇몇 브라우저는 내장함수는 핵심(core) JS언어의 일부가 아니라는 것을 유념하세요.

## 함수 대 메소드
프로그래머들은 객체(object)의 부분인 함수를 메서드(method)라고 부른다.

지금까지 사용해 왔던 내장된(built-in) 코드는 함수와 메서드 두 형태로 나타난다.
내장 함수늬 전체 목록과, 내장 객체와 그들에 해당하는 메서드들 또한 [여기서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects) 확인할 수 있다.

## 익명 함수
이제까지 우리는 아래와 같이 함수를 생성했다
```javascript
function myFunction() {
    alert('hello');
}
```

이렇게도 만들 수 있다.
```javascript
function() {
    alert('hello');
}
```
위 예제는 익명 함수라고 부른다. 익명함수는 스스로 뭘 어쩌지 못한다. 주로 이벤트 핸들러와 사용된다.
```javascript
var myButton = document.querySelector('button');

myButton.onclick = function () {
    alert('hello');
}
```

익명함수는 변수 속에 넣을 수도 있다.
```javascript
var myGreeting = function () {
    alert('hello');
}
```
이 형태의 함수 생성은 ***함수 표현식(function expression)***으로도 알려져 있다. 함수 선언과는 다르게, 함수 표현식은 호이스팅되지 않는다.

호출은 아래와 같이 호출된다.
```javascript
myGreeting();
```
이 방법은 효과적으로 함수에 이름을 부여하고 있다.

여러개의 함수 표현식을 사용할 수도 있다. 익명함수는 이벤트 발생에 따른 수 많은 코드를 작동시키기 위해 주로 쓰인다.

## 함수 매개변수
브라우저 내장 문자열 "replace()" 함수는 두 개의 매개변수를 필요로 한다.

```javascript
var myText = 'I am a string';
var newString = myText.replace('string', 'sausage');
```

매개변수는 선택사항일 수도 있다. 예를들어, 배열과 관련된 "join()"함수의 매개변수가 그렇다.

```javascript
var myArray = ['I', 'love', 'chocolate', 'frogs'];
var madeAString = myArray.join(' ');

var madeAString = myArray.join();
```

결합(joining)/한정(delimiting)하는 문자를 명시할 어떠한 매개변수도 포함되지 않는다면, 콤마가 기본으로 사용될 것이다.s

## 함수 스코프와 충돌(conflicts)
함수 바깥에 선언된 가장 상위 레벨의 스코프를 '전역 스코프(global scope)'라고 부른다.

JS의 스코프는 주로 안전성과 구조 때문이 이런 스코프가 설정되어있다. 

예를들어
```html
<!-- Excerpt from my HTML -->
<script src="first.js"></script>
<script src="second.js"></script>
<script>
  greeting();
</script>
```
```javascript
// first.js
var name = 'Chris';
function greeting() {
  alert('Hello ' + name + ': welcome to our company.');
}
```
```javascript
// second.js
var name = 'Zaptec';
function greeting() {
  alert('Our company is called ' + name + '.');
}
```
호출하려는 두 함수 모두 "greeting()"이지만, ***first.js***파일의 "greeting()"함수에만 접근할 수 있을 뿐이다.

추가적으로, ***second.js***파일에서  "let"키워드로 name변수를 두 번째로 선언하려고 시도하는 것은 오류를 발생시킨다.

참고로 스코프 규칙은 반복문과 조건문에 적용되지 않는다. 

또, x 변수를 정의했고, ReferenceError: "x" is not defined 오류를 마주쳤다면, x 변수가 어떤 스코프 안에 들어있는지 확인해보자.s

### 함수 내부의 함수
종종 코드를 깔끔하게 유지하기 위한 방법으로 함수 내부에 함수를 사용한다.

```javascript
function myBigFunction() {
  var myValue;

  subFunction1();
  subFunction2();
  subFunction3();
}

function subFunction1() {
  console.log(myValue);
}

function subFunction2() {
  console.log(myValue);
}

function subFunction3() {
  console.log(myValue);
}
```
위 코드는 ```ReferenceError: myValue is not defined```오류를 낸다. "myValue" 변수가 함수가 호출되는 같은 스코프 내에 정의되어 있긴 하지만, 

함수 정의 내부에 정의되어 있지 않다. 이 코드를 작동하게 하려면, 변수의 값을 함수 내부에 매개변수로써 다음과 같이 전달해야만 한다.

```javascript
function myBigFunction() {
  var myValue = 1;

  subFunction1(myValue);
  subFunction2(myValue);
  subFunction3(myValue);
}

function subFunction1(value) {
  console.log(value);
}

function subFunction2(value) {
  console.log(value);
}

function subFunction3(value) {
  console.log(value);
}
```

## 함수 반환값
"replace()"는 문자열에서 호출되고, 두 매개변수를 전달받는다.

"replace()" 함수는 교체된 문자열을 반환한다.

어떤 함수는 반환값을 "void"나 "undefined"로 보여준다.

### 사용자 정의 함수에서 반환 값 사용하기
사용자 정의 함수에서 값을 반환하기 위해서는, "return"키워드를 사용할 필요가 있다.
```javascript
function random(number) {
  return Math.floor(Math.random() * number);
}
```
