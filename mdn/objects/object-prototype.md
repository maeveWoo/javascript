## Object prototypes
프로토타입은 JS 객체를 통해 다른 객체에게 특징을 상속하는 메커니즘이다.

프로토타입과, 프로토타입 체인이 어떻게 동작하는 지, 프로토타입이 객체를 위해 어떻게 세팅될 수 있는지 알아보자

### 프로토타입 체인

```javascript
const myObject = {
  city: 'Madrid',
  greet() {
    console.log(`Greetings from ${this.city}`);
  }
}

myObject.greet(); 
```
위 리터럴 객체는 'city'라는 데이터 프로퍼티와, 'greet()'이라는 메소드가 있다.

객체의 이름을 콘솔창에 치면, 리스트에서 객체에서 사용할 수 있는 프로퍼티의 모든 리스트가 뜰 것이다.

'city'와 'greet'와 같이 많은 다른 속성들을 볼 수 있다.

```
city
greet
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
constructor
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
toValueOf
```

저 중 하나에 접근해보자

```javascript
myObject.toString(); // "[object Object]"
```

"toString()"이 뭘하는지 명확하지 않지만... 동작한다..!

저 추가 속성들은 뭘까? 어디서 온거임?

모든 JS 객체는 프로토타입이라 불리는 내장된(built-in) 속성을 갖는다.

프로토타입은 그 자체로 객체이다. 그래서, 프로토타입은 자신의 프로토타입도 갖는다.
이는 프로토타입 체인이라고 불린다.
프로포타입이 프로토타입으로 "null"을 갖을때, 체인은 끝난다.

객체의 프로포타입을 가르키는 객체의 속성은 "prototype"이라 불리지 않는다.
이것의 이름은 표준이 아니지만, 실제로 모든 브라우저는 "__proto__"를 사용한다.

✏️ :pencil2: 객체의 프로토타입에 접근하는 표준방법은 ```Object.getPrototypeOf()```메소드이다.

객체의 속성에 접근하려 시도할 때 : 객체 그 자체에서 속성은 발견되지 않는다. 프로토타입은 속성으로부터 찾아진다.

만약 속성이 여전히 발견되지 않으면, 프로토타입의 프로토타입이 뒤지는데, 속성이 발견될때까지 계속된다.

만약, 프로포타입의 체인이 끝에 다다를 경우엔, "undefined"를 반환한다.

브라우저에서, "myObject.toString()"을 호출할때

- "toString"을 "myObject"에서 찾는다
- "myObject"에서 찾을 수 없다면, "myObject"의 프로토타입에서 "toString"을 찾는다.
- 찾아서 그것을 호출한다.

"myObject"의 프로토타입을 찾고싶다면 ```Object.getPrototypeOf()```를 사용하자

```javascript
Object.getPrototypeOf(mtObject);
```

요것은 "Object.prototype"이라 불리는 객체고, 모든 객체가 기본으로 갖는 가장 기본적인 프로토타입이다.

"Object.prototype"의 프로토타입은 "null"이기라, 프로토타입 체인의 끝이다.

![prototype type chain](../img/myobject-prototype-chain.svg)

객체의 프로토타입은 항상 "Object.prototype"이 아니다.
```javascript
const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);
```

이 코드는 "Date"객체를 생성하고, 프로토타입 체인을 타고 올라가, 프로포타입을 기록한다.

"myDate"의 프로토타입은 "Date.prototype"객체로 보여준다.
그리고 이것의 프로토타입은 "Object.protype"이다.

![mydate prototype type chain](../img/mydate-prototype-chain.svg)

사실, "myDate2.getMonth()"같은 비슷한 메서드를 호출할때, "Date.prototype"의 메소드를 호출하는 것이다.

### 그림자 속성(Shadowing properties)
객체에 속성을 정의하는 경우, 객체의 프로토타입에서 같은 이름으로 정의된다면 어떤일이 벌어지나?

```javascript
const myDate = new Date(1995, 11, 17);

console.log(myDate.getYear());

myDate.getYear  = function () {
    console.log('something else!');
}

myDate.getYear();
```
"getYear()"을 호출할때, 브라우저는 먼저 "myDate"에서 이름에 해당하는 속성을 찾고, 
"myDate"가 이를 정의하지 않았는지 프로토타입을 확인할 뿐이다.

그래서, "getYear()"을 "myDate"에 추가했을 때, "myDate"의 버전이 호출된다.

이를 그림자 속성이라고 부른다.

### 프로토타입 세팅
JS에는 객체의 프로토타입을 세팅하는 다양한 방법이이고, 여기서 두가지 방법을 알아보자
"Object.create()"와 "constructors"

#### Object.create 사용하기
"Object.create"메서드는 새로운 객체를 생성하고, 새 객체의 프로토타입으로 사용할 객체를 지정할 수 있도록 한다.

```javascript
const personPrototype = {
    greet() {
        console.log('hello!');
    }
}

const carl = Object.create(personPrototype);
```

"greet()"메서드를 갖는 "personPrototype"객체를 만들었다.

그리고, "Object.create()를 사용해 "personPrototype"을 프로토타입으로하는 객체를 생성했다.

우리는 새로 먼둔 객체에서, "greet()"호출할 수  있고, 프로토타입은 그것의 구현을 제공한다.

#### Using a constructor
JS에서, 모든 함수는 "prototype"이라는 속성을 갖는다.

생성자 함수를 호출할 때, 생성자는 새롭게 생성된 객체의 프로토타입으로 세팅이 된다.
(관례상, "__proto__"라는 이름의 속성으로)

생성자의 프로토타입을 세팅하고 싶다면, 그 생성자로 만들어진 객체는 전부 그 프로토타입이 주어진다는 것을 명심해라.

```javascript
const personPrototype = {
    greet() {
        console.log(`hello, my name is ${this.name}`);
    }
}

function Person(name) {
    this.name = name;
}

Person.prototype = personPrototype;
Person.prototype.constructor = Person;
```
마지막 라인에서 ```Person.prototype.constuctor = Person;```은 "Person"객체를 생성하기 위한 함수로 프로토타입의 생성자 속성을 생성자에 세팅한다.

이작업은 필요한데, ```Person.prototype = personPrototype;```을 세팅한 후에, 그 속성이 "personPrototype"을 위한 생성자로 가르킨다.
"personPrototype"은 "Person"보다는 "Object"이다.("personPrototype"은 객체 리터럴로 구성되어있다.)

이 코드 후, "Person()"을 사용해서 객체를 생성한다. 이 객체는 "personPrototype"을 프로토타입으로 갖을 것이다.

```javascript
const reuben = new Person("Reuben");
reuben.greet();
```

#### 보유 속성들
"Person"생성자를 이용해 생성한 객체는 두개의 속성을 갖는다.
- "name" 속성, 이는 생성자에서 세팅된다. 그래서 "Person"객체에 직접적으로 들어난다.
- "greet()" 메서드는 프로토타입에 세팅된다.

프로토타입에 메서드가 선언되는 패턴은 일반적으로 보인다. 그러나, 데이터 속성은 생성자에서 선언된다.

왜냐하면,각각의 객체가 자신들만의 데이터 속성을 갖기를 원할 떄가 있을고, 메서드는 주로 사용자가 생성하는 모든 객체에 동일하다.
(모든 사람이 다른 이름이 있는 것 처럼)

객체에서 바로 선언되는 속성은, "name" 같은, "own properties"라고 부른다. 
그리고 프로퍼티는 static한 "Object.hasOwn()" 메서드를 이용해 보유 속성인지 체크할 수 있다.

```javascript
const irma = new Person('Irma');

console.log(Object.hasOwn(irma, 'name')); // true
console.log(Object.hasOwn(irma, 'greet')); // false
```

:pencil2: non-static 메서드인 "Object.hasOwnProperty()"도 사용할 수 있다, 하지만 가능하다면 "Object.hasOwn()"사용을 권장한다.

### 프로토타입과 상속
프로토타입은 강력하고, 유연한 특징을 갖는다, 이 특징은 코드의 재사용과 객체의 합성을 가능하게 만들어준다.

특히, 프로토타입은 상속 버전을 지원한다. 상속은 OOP언어의 특징이다.

JS에서도 다르길 원하는 속성을 재정의할때까지, 다른 객체들이 공통의 속성을 상속받을 수 있다. 


