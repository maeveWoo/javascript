# 문자열 제대로 다루기

## Strings as objects
JS는 모든 것이 객체이다.

변수가 문자열 객체의 인스턴스가 되면, 수많은 속성과 메서드를 사용할 수 있다.

### 문자열의 길이 찾기
length 프로퍼티를 사용할 수 있다.

```javascript
var browserType = 'mozilla';
browserType.length;
```

### 특정 문자열 찾기
대괄호 표기법을 이용해서 문자열을 구분할 수 있다.

```javascript
browserType[0];
browserType[-1]; //undefined
browserType[browserType.length - 1]
```

### 문자열 내부의 하위 문자열 찾기 및 추출
```indexOf()```를 사용하여 하위 문자열을 찾을 수 있다.

```javascript
browserType.indexOf('zilla'); // 2
browserType.indexOf('vanilla'); // -1
```
하위 문자가 발견되지 않았으면 -1을 반환한다.

문자열을 자를땐 ```slice()```를 사용한다.
```javascript
browserType.slice(0, 3);
```

시작점부터 끗까지 자를땐 인자를 하나만 넣는다
```javascript
browserType.slice(2); // 'zilla'
```

### 대/소문자 변경
```toLowerCase()```, ```toUpperCase()```는 문자열을 가져와 소문자, 대문자로 바꾼다.
이는 데이터베이스에 저장하기 전에 모든 사용자 입력값을 표준화하려는 경우에 유용하다.

```javascript
var radData = 'My NaMe Is MuD';
radData.toLowerCase();
radData.toUpperCase();
```

### 문자열의 일부를 변경하기
```replace()```를 사용하여, 하위 문자열을 다른 문자열로 바꿀 수 있다.

```javascript
browserType.replace('moz', 'van');
```
다른 객체를 생성해서 반환함.

