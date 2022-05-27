## JS에서 Class

모델을 구현하기위해 JS의 프로토타입과 생성자를 사용하는 방법과 JS가 고전 OOP 컨셉에 더 가까운 특징을 제공하는지 보자.

### Class와 생성자

"class" 키워드를 사용해 클래스를 정의할 수 있다.

```javascript
class Person {
    name;

    constructor(name) {
        this.name = name;
    }

    introduceSelf() {
        console.log(`Hi! I'm ${this.name}`);
    }
}
```

"Person"이라는 선언에 포함된 내용을 보자

- "name" 속성
- 생성자는 "name" 파라미터를 받는다. 이는 새로운 객체의 "name" 속성에 사용될 것이다.
- "introduceSelf()" 메드는 "this"를 사용해 객체의 속성을 참조할 수 있다.

```this.name = name;```이 있으면, 생성자는 "name" 초기화하기 전에 속성을 생성한다. 이는 선택사항이지만,
클래스 선언에 명시적으로 속성을 나열하면 코드를 읽는 사람들이 어떤 속성이 이 클래스의 일부인지 쉽게 확인할 수 있다.

생성자는 "constructor"키워드를 사용해서 정의된다.
클래스 정의 외부의 생성자(? : constructor outside a class definition) 처럼 다음과같이 동작한다.

- 새로운 객체를 생성
- "this"를 새로운 객체와 바인딩하고, 사용자는 생성자 코드에 "this"를 참조할 수 있다.
- 생성자의 코드를 실행
- 새로운 객체를 반환

다음과같이 새로운 "Person"객체를 다음과같이 생성할 수 있다.

```javascript
const giles = new Person('Giles');

giles.introduceSelf(); // Hi! I'm Giles
```

### 생성자 제외

만약, 특별한 초기화가 필요없다면, 생성자를 생략할 수 있다. 그리고 기본 생성자가 생성될 것이다.

```javascript
class Animal {
    sleep() {
        console.log('zzz');
    }
}

const spot = new Animal();

spot.sleep(); // 'zzz'
```

### 상속

"Person" 클래스를 활용해, "Professor" 서브클래스를 선언하자!

```javascript
class Professot extends Person {
    teaches;

    constructor(name, teachers) {
        super(name);
        this.teaches = teachers;
    }

    introduceSelf() {
        console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);
    }

    grade(paper) {
        const grade = Math.floor(Math.random() * (5 - 1) + 1);
    }
}
```
"extends" 키워드를 사용해, 다른 클래스로 부터 상속했다고 알려준다.

"Professor" 클래스는 "teaches" 속성을 새로 추가했다.

"Professor"이 새로 생성될 때, "teaches"가 세팅되길 원한다면, 생성자에 정의하면 된다.
생성자는 "name"m "teaches" 를 아규먼트로 받는다.
이 생성자는 먼저 슈퍼클래스를 "super()"를 사용해, "name"파라미터를 넘겨주면서 호출한다.
슈퍼클래스 생성자는 "name" 세팅을 받아 처리한다. 그 다음 "Professor" 생성자는 "teaches" 속성을 세팅한다.

️:pencil2: 만약 슈퍼클래스에서 초기화작업이 있다면, 반드시 "super()"을 사용해 슈퍼클래스의 생성자를 호출해야한다.

"introduceSelf()" 메서드도 슈퍼클래스로부터 덮어썼다, 그리고 새로운 "grade()" 메서드를 추가했다.

### 캡슐화
어떻게 "Stduent"의 "year"속성을 "private"로 만들까? 코드를 보자

```javascript
class Student extends Person {
    #year
    
    constructor(name, year) {
        super(name);
        this.#year = year;
    }

    introduceSelf() {
        console.log(`My name is ${this.name}, and I'm in year ${this.#year}.`);
    }

    canStudyArchery() {
        return this.#year > 1;
    }
}
```
이 클래스 선언에서 "#year"은 "private" 데이터 속성이다.

```javascript
const summers = new Student('Summers', 2);

summers.introduceSelf(); // Hi! I'm Summers, and I'm in year 2.
summers.canStudyArchery(); // true

summers.#year; // SyntaxError
```
Private 데이터 속성은 클래스 선언부에 선언되어야하고, 그 이름은 "#"으로 시작된다.

#### Private 메서드
private 데이터 속성 뿐만아리나 private 메서드도 가질 수 있다.

"#"로 시작하는 이름이면, 객체의 소유 메소드로 불릴 수 있다.

```javascript
class Example {
    
    somePublicMethod() {
        this.#somePrivateMethod();
    }
    
    #somePrivateMethod() {
        console.log('U called private method?');
    }
}

const myExample = new Example();

myExample.somePublicMethod(); // 'U called me?'
myExample.#somePrivateMethod(); // SyntaxError
```