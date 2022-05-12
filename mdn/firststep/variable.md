# 필요한 정보를 저장하기 - 변수

## 변수 이름에 대한 규칙
변수를 원하는 대로 이름을 부여 할 수 있지만 제한이 있다. 일반적으로 라틴 문자(0-9, a-z, A-Z)와 밑줄 문자를 사용해야한다.
- 변수 이름의 시작부분에 밑줄(_) 사용하지 마세요. 이는 특별한 의미를 가지고 있어서 혼란을 준다.
- 변수 이름의 시작부분에 숫자를 사용하지 마세요. 허용되지 않으며 오류가 발생한다.
- 안전한 명명법은 "lower camel  case"이다.
- 포함된 데이터를 쉽게 이해 할 수 있게 변수 이름을 직관적으로 부여한다. 단일 문자/ 숫자 또는 긴 구절을 사용하지 마세요.
- 변수는 대소문자를 구분한다.
- JS 예약어를 변수 이름으로 사용하면 안된다. 

## 변수의 종류
변수에 저장할 수 있는 몇가지 유형의 데이터가 있다.

### 숫자
정수, 부동소수 같은 십진수 숫자를 변수에 저장할 수 있다.
숫자 유형에 따른 다른 데이터 유형을 가지고 있다.

### 문자열
문자열은 텍스트의 ㅈ ㅗ각이다.
```javascript
var dolphinGoodbye = 'So long and thanks for all the fish';
```

### 불리언 (Booleans)
true/false

### 배열
```javascript
var myNameArray = ['Chris', 'Bob', 'Jim'];
var myNumberArray = [10,15,40];
```

```javascript
myNameArray[0]; // should return 'Chris'
myNumberArray[2]; // should return 40
```

### 객체
```javascript
var dog = { name : 'Spot', breed : 'Dalmatian' };
```
```javascript
dog.name
```

### 지정되지 않은 타입
JS는 "느슨한 유형의 언어(loosely typed language)"이다.
변수에 포함 할 데이터의 유형을 지정할 필요가 없다.

```javascript
var myNumber = '500'; // oops, this is still a string
typeof(myNumber);
myNumber = 500; // much better — now this is a number
typeof(myNumber)
```