# Number, Operators and Strongs

## Number and Operators

### 수학

#### 숫자의 종류
프로그래밍에서, 우리가 잘 알고있는 십진법 체계라도 생각한 것보다 복잡하다.

- 정수는 10, 400, -5 같은 숫자
- 부동소수점 실수(float)는 12.5, 6.772131과 같이 소수점과 소수 자릿수가 있다.
- 배정밀도 부동소수점 실수(double)는 IEEE 754 표준 부동소수점보다 더 정확한 정밀도를 가지고 있는 특별한 데이터 타입이다.
- 2진수 (0~1)
- 8진수 (0~7)
- 16진수 (1~10, A~F) 대표적으로 CSS의 색상

다른 프로그래밍 언어와 달리 JS는 실수와 정수 모두 Number라는 하나의 데이터 타입만 사용한다.

### 산술 연산자
+, -, *, /, %

#### 연산자 우선순위
JS의 연산자 우선 순위는 수학과 동일하다.

연산자 우선 순위를 무시하려면 명시적으로 먼저 처리하려는 부분을 괄호로 묶으면 된다.

### 증가 및 감소 연산자
++, --

### 할당 연산자

 =

단축 표현들 : +=, -=, *=, /=

### 비교 연산자
===, !==, <, >, <=, >=



## 문자열
JS에선 따옴표, 쌍따옴표가 모두 허용된다.

문자열 안에 따옴표, 쌍따옴표를 사용하려면 역슬래시(\)룰 사용하면 된다

### 문자열 연결하기
'Concatenate'는 결합을 의미하는 프로그래밍 단어이다.
JS에서 문자열을 결합하려면 +연산자를 사용한다.

> 코드에 따옴표, 쌍따옴표로 묶인 문자열을 입력하면 문자열 리터럴이라 부른다.

#### 숫자 + 문자열
숫자와 문자열을 연결하면 브라우저가 숫자를 문자열로 변환하고 두 문자열을 서로 연결시킨다.

숫자로 바꾸고 싶은 문자열 은 Number 객체를 사용한다
```javascript
var myString = '123'; // 숫자가 아니면 NaN
var myNum = Number(myString);
typeof myNum;
```

모든 숫자는 toString() 이라는 함수를 가지고 있다.

```javascript
var myNum = 123;
var myString = myNum.toString();
typeof myString;
```


