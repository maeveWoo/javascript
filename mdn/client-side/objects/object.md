## Object Basics
객체는 관련된 데이터 또는 함수의 모음(collection)이다.
객체는 몇 변수들괴 함수들(객체 내부에있을 때, 얘들은 속성과 메서드로 불린다.)

JS의 많은 것들과 마찬가지로, 객체 생성은 자주 변수와 함께 선언 및 초기화가 된다.
```javascript
const person = {};
```

브라우저에서 위 "person"을 호출하면, 아래와 비슷하게 보일 것이다.
```
[object Object]
Object { }
{ }
```

```javascript
const person = {
    name: ['Bob', 'Smith'],
    age: 32,
    bio: function () {
        console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
    },
    introduceSelf: function () {
        console.log(`Hi! I'm ${this.name[0]}.`);
    }
}
```
이런 객체는 리터럴 객체라고 한다.

```javascript
person.name
person.name[0]
person.age
person.bio()
person.introduceSelf()
```
객체내부의 데이터와 함수에 접근해봤다.

이번엔 여러 멤버로 이루어진 객체를 보자.
```javascript
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value
};
```

## 점 표현
위 예제에서 객체의 속성과 메서드에 점 표현법으로 접근했다.

객체 이름은 네임스페이스 처럼 동작한다.

점 표현으로 접근하려는 항목은 단순 속성의 이름, 베열 속성의 항목 또는 객체의 메서드 중 하나이다.

### 객체 속성으로써 객체
객체 속성은 그 자체로 객체일 수 있다.
```javascript
name: ['Bob', 'Smith']
```
에서
```javascript
name : {
    first: 'Bob',
    last: 'Smith'
}
```
이 아이템에 접근하려면 사용자는 단지 하나씩 점으로 찍으면 댄다
```javascript
person.name.first
person.name.last
```

## 대괄호 표기법
객체의 속성에 접근하는 다른 방법도 있다.
```javascript
person['age']
person['name']['first']
```
JS는 문자열과 값을 배열의 숫자와 값을 매핑하는 것과 같은 방법으로 매핑한다.

## 객체의 멤버 세팅
객체의 멤버를 선언하며 객체의 값을 설정하거나 수정할 수도 있다.
```javascript
person.age = 45;
person['name']['last'] = 'Cratchit';
```

새로운 멤버를 생성하는 예제도 보자
```javascript
person['eyes'] = 'hazel';
person.farewell = function () {
    console.log('Bye everybody!');
}
```
대괄호 표기법의 유용한 면은 멤버의 값의 세팅할 수 있을 뿐만아니라, 멤버의 이름도 세팅할 수있다는 것이다.

다음 예제를 보자.
```javascript
const myDataName = nameInput.value;
const myDataValue = nameValue.value;
```
우리는 위값을 "person"객체에 멤버로 새로 추가할 수 있다.

```javascript
person[myDataName] = myDataValue;
```

```javascript
const myDataName = 'height';
const myDataValue = '1.75m';
person[myDataName] = myDataValue;
```

```javascript
person.height
```
이 방법은 점 표기법으로는 불가능하다.
점 표기법은 이름은 가리키는 변수 값이 아닌 리터럴 멤버 이름만 받아들일 수 있다.

## "this"는 뭐시야?
```javascript
introduceSelf() {
  console.log(`Hi! I'm ${this.name[0]}.`);
}
```
요걸 보자, "this"는 뭘까? 이 "this"키워드는 작성된 코드가 작성된 현재 객체를 참조한다. 왜 "person"을 그냥 안쓰고 이래 썼을까?

하나의 객체 리터럴만 생성해야될 때, 이것은 그닥 유용하지 않다. 하지만, 하나보다 많다면, "this"는 생성하는 모든 객체를 위해 사용할 수 있는 동일한 메서드를 생성할 수 있다.

예를 보자
```javascript
const person1 = {
  name: 'Chris',
  introduceSelf() {
    console.log(`Hi! I'm ${this.name}.`);
  }
}

const person2 = {
  name: 'Deepti',
  introduceSelf() {
    console.log(`Hi! I'm ${this.name}.`);
  }
}
```
위 예제는 크게 유용하지 않지만, 생성자를 사용해서 단일 객체 정의에서 둘 이상의 객체를 만들기 시작할 때 필수적이다. 다음 섹션 고고

## 생성자 소개
하나의 객체를 생성해야할 때, 리터럴 객체를 사용하는 것은 꽤 좋다.
하지만, 둘이상의 객체를 생성해야할때, 리터럴 객체 생성은 심각하게 부적당하다.

새로운 객체를 생성할 때마다, 같은 코드를 작성해야하고, 만약 객체의 어떤 속성을 바꾸고 싶을 때, 모든 객체를 수정해야한다는 것을 잊지마라.

우리는 객체의 모양("shape")정의하는 방법을 좋아한다. 그렇게 하면, 우리는 단지 속성을 수정하기만 하면 된다.

1. 첫번째 버전인 함수
```javascript
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  }
  return obj;
}
```
이 함수는 호출될때마다 새로운 객체를 생성하고 반환한다. 객체는 두 멤버가 있다.
- "name" 속성
- "introduceSelf()" 메서드

```javascript
const salva = createPerson('Salva');
salva.name;
salva.introduceSelf();

const frankie = createPerson('Frankie');
frankie.name;
frankie.introduceSelf();
```
이 예제는 잘 작동하지만 약간 장황한 감이있습니다. 우리는 객체를 초기화하기 위해 빈 객체를 생성해야하고, 이를 반환해야한다.

더 괜찮은 방법은 "생성자"를 사용하는 것이다. 생성자는 "new"키워드를 사용해서 함수를 호출하기만하면 된다.

생성자를 호출하면 아래코드가 동작한다.
- 새로운 객체 생성
- "this"를 새로 생성한 객체에 바인딩하고, "this"를 생성자 코드에서 참조할 수 있다.
- 생성자에 있는 코드를 실행하고
- 새로운 객체를 반환한다.

관례에 따라 생성자는 대문자로 시작한다, 그리고 생성할 객체의 타입을 이름으로한다.

```javascript
function Person(name) {
    this.name = name;
    this.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`)
    }
}
```
```Person()```생성자를 호출해보자
```javascript
const salva = new Person('Salva');
salva.name;
salva.introduceSelf();

const frankie = new Person('Frankie');
frankie.name;
frankie.introduceSelf();
```

## 항상 객체를 사용해 왔다
계속 사용했던 브라우저 내장 API 등도 이와 같은 방법으로 설계되어있기 때문에 사용법이 같다.

```javascript
myString.split(',');
```
String 객체에 사용했던 위 메소드. 사용자의 코드에서 모든 문자열은 "String"의 객체로 자동으로 생성된다.
결과적으로 일반적인 메서드와 속성들을 사용할 수 있게 되는 것이다.

사용자가 document 객체 모델에 다음과 같이 접근할 때,

```javascript
const myDiv = document.createDocumentFragment('div');
```
사용자는 "Document"객체에 유효한 메서드를 사용하고 있었다.

각 웹페이지가 로드되고, 전체 페이지의 구조, 컨텐츠, URL같은 것들을 표현하는"Document"객체가 생성되고 "document"가 호출된다.
이 의미는 대부분의 공통 메서드와 속성은 사용가능하다는 의미이다.

Array, Math 등의 다른 내장 인스턴스나 API도 마찬가이지다.

내장 객체나 API는 항상 객체를 자동으로 생성하지 않는다.
예를들어 [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)는 새로운 객체를 생성자를 이용해 생성해야한다.

