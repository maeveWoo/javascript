# [MDN JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)

## Intro
JS는 가벼운 인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어로, 일급함수를 지원한다.
JS는 프로토타입 기반, 다중 패러다임, 단일 스레드, 동적 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원한다.

JS의 표준은 ECMAScript 언어 사양 및 ECMAScript 국체화 API 사양이다.
MDN에서 제공하는 JavaScript 문서는 ECMA-262 및 ECMA-402의 최신 초안 버전을 기반으로한다.

## Basic
JS는 HTML 문서에 적용될 때, 웹사이트상에서 동적 상호작용성을 제공할 수 있는 완전한 동적 프로그래밍 언어이다.

코어 자바스크립트 언어 위에서 동작하는 많은 다양한 도구가 있다.

- 브라우저 응용 프로그래밍 인터페이스(APIs) : 브라우저에 내장된 API로 HTML을 동적으로 생성하고 CSS 스타일을 설정하거나, 사용자의 웹캠으로부터 비디오 스트림을 수집하거나 조작하는 것, 또는 3D 그래픽이나 오디오 샘플을 생성하는 것과 같은 다양한 기능을 제공한다.
- third-party API를 활용해 개밸자는 트위터나 페이스북 같은 다른 컴텐츠 공급사로부터 제공되는 기능을 자신의 사이트에 통합할 수 있다.
- 써드파티 프레임워크와 라이브러리를 여러분의 HTML에 적용함으로써 사이트와 어플리케이션을 빠르게 구축할 수 있다.

### 변수(Variables)
변수는 값을 저장할 수 있는 컨테이너이다. 변수를 선언할 때 ```var```또는 ```let``` 키워드 뒤에 원하는 변수명을 붙이면 된다.

```javascript
let maeveKing;
```

한 줄의 끝에 있는 세미콜론은 문(statement)의 끝을 나타낸다. 

JS는 대소문자를 구분한다.

변수는 여러 자료형을 가질 수 있다.

- String ```let foo = 'Bob'; ```
- Number ```let num = 10; ```
- Boolean ```let blackNwhite = true; ```
- Array ```let array = [1, 'Bob', 'Steve', 10]; ```
- Object ```let obj = document.querySelector('h1'); ```

### 주석
```javascript
/*
사이에 있는 모든 것은 주석
 */

// 한줄 주석
```

### 연산자
+, -, *, /, =(할당), ===, !, !==

### 조건문
어떤 표현식(expression)이 참인지 아닌지를 테스트하고 그 결과에 따라 선택적으로 코드를 실행할 수 있도록 하는 코드 구조이다.

가장 일반적인 조건문의 형태는 ```if...else```문이다.

### 함수
Functions는 재사용하기를 원하는 기능을 담는 방법이다.

그 절차(재사용 기능)가 필요할 때 매 번 전체 코드를 다시 작성하는 대신 함수의 이름으로 그 함수를 호출할 수 있다.

### 이벤트
웹사이트의 실질적인 상호작용에는 이벤트가 필요하다.

이벤트는 브라우저에서 발생하는 일을 듣고 그에 대한 반응으로 코드를 실행하는 코드 구조이다.

```javascript
document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}
```
Element(요소)에 이벤트를 붙이는 방법은 많다. 

HTML요소를 선택하고 그 요소의 onclick 핸들러 프로퍼티에 클릭 이벤트가 실행할 코드를 갖고 있는 익명 함수를 할당한다.

```javascript
let myHTML = document.querySelector('html');
myHTML.onclick = function() {};
```
```myImage```변수에 html 요소에 대한 참조를 저장한다.

다음으로 이 변수에 ```onclick``` 이벤트 핸들러 프로퍼티에 익명함수를 할당한다.

[연습하기](./basic.js)


## 키워드 
- 인터프리터 vs just-in-time 컴파일 프로그래밍 언어
- 일급함수