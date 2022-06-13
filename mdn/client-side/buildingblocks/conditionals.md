# 조건문

## if ... else 문

### 기본 if ... else 문
기본 ```if...else``` 문의 의사 코드 (pseudocode)를 보자.

```
if (조건) {
  만약 조건(condition)이 참일 경우 실행할 코드
} else {
  대신 실행할 다른 코드
}
```
짧은 스타일

```
if (조건) 만약 조건(condition)이 참일 경우 실행할 코드
else 대신 실행할 다른 코드
```
짧은 스타일은 추천하지 않는다. 가독성을 위해.

### else if
```if() { ... }와 else { ... }``` 사이에 넣을 추가적인 블록을 필요로한다.

### 비교 연산자에 대한 메모
- ===, !== 
- <, > 
- <=, >= 

어떤한 값들이든 ```false```, ```undefined```, ```null```, ```0```, ```NaN```이나 빈 문자열('')이 아닌 값은 조건문으로 테스트되었을 때, ***true***를 리턴

변수가 참인지 혹은 값이 존재하는지를 테스트하기 위해 변수 이름 그 자체를 사용할 수 있다.
```javascript
let cheese = 'Cheddar';

if (cheese) {
  console.log('Yay! Cheese available for making cheese on toast.');
} else {
  console.log('No cheese on toast for you today.');
}
```

### if ... else 중첩
쌉 가능

### 논리 연산자: AND, OR 그리고 NOT
&&, ||

조건문에서 논리적 OR 연산자를 사용할 때의 일반적인 실수는 검사하는 값의 변수를 한 번 명시하고, 값들의 목록을 ```||``` 연산자에 의해 분리하여 제공하는 것
```javascript
if (x === 5 || 7 || 10 || 20) { // X Wrong
  // run my code
}
```
이 조건문은 x가 5와 같거나, 7이 true면 ... 으로 평가된다. 7은 ```false```, ```undefined```, ```null```, ```0```, ```NaN```이나 빈 문자열('')이 아니기 때문에 항상 true이다.

원하는 논리에 맞게 동작하려면 다음과 같이 수정하자.
->
```
if (x === 5 || x === 7 || x === 10 ||x === 20) {
  // run my code
}
```

## Switch 문
```if ... else``` 문은 조건이 복잡한 다수의 논리 연산자의 경우에 주로 유용하다.

단지 어떤 값의 선택에 변수를 설정하거나 조건에 달린 특정한 문(statement)을 출력하기를 원하는 경우에, ```if ... else``` 구문(syntax)은 다소 번거로울 수 있다.

이럴경우 ```switch```문을 사용하면 좋다. 이것은 입력으로 하나의 표현식/값을 받고, 값과 일치하는 하나를 찾을 때까지 여러 항목을 살펴보고 그에 맞는 코드를 실행한다.
```
switch (expression) {
  case choice1:
    run this code
    break;

  case choice2:
    run this code instead
    break;

  // 원하는 만큼 많은 case를 포함하십시오

  default:
    actually, just run this code
```

## 삼항연산자
삼항(조건)연산자(ternary or conditional)는 조건을 테스트하고 if조건이 true라면 하나의 값/표현식을 리턴하고, false라면 다른 값/표현식을 리턴하는 구문이다.

```( condition ) ? run this code : run this code instead```

example
```javascript
let greeting = ( isBirthday ) ? 'Happy birthday Mrs. Smith — we hope you have a great day!' : 'Good morning Mrs. Smith.';
```
