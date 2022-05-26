## OOP 
Object-oriented programming은 C++, Java를 포함한 많은 프로그래밍 언어 프로그래밍 패러다임의 기본이다.

이번 장에선, OOP의 기본 컨셉을 둘러본다.

여기서 세가지 메인 컨셉을 설명할 것이다. : class와 객체(instance), 상속, 은닉(encapsulation).

 JS에서, 생성자와 프로토타입 체인이 OOP 컨셉과 얼마나 관련이있는지, 얼마나 다른지 볼것이다.

다음 장에서 JS에서 OOP 구형을 더 쉽게 만들어주는 추가적인 특징을 볼 것이다.

| 선행 | JS 함수의 이해, JS 기본, OOJS 기본(JS Object, Object prototype) |
|--|---|
| 목표 | class 기반 oop 기본 컨셉 이해 |

OOP는 객체의 컬렉션으로 시스템 모델링에대한 것이다. 
각 객체는 시스템의 어떤 부분의 관점을 표현한다.

객체는 함수와 데이터를 갖는다. 객체는 자신을 사용하길 원하는 다른 코드에 public 인터페이스를 제공한다.
하지만 객체는 자신의 소유를 private로, 내부 상태를 유지한다. 

### 클래스와 인스턴스
OOP 객체 측면에서 문제를 모델링할 때 시스템에 포함하려는 객체 유형을 나타내는 추상 정의를 만든다.

예를 들어, 학교를 모델링하고, 교수를 나타내는 객체를 원할 수 있다. 

Professor 의사 코드를 작성해보자
```
class Professor
    properties
        name
        teaches
    methods
        grade(paper)
        introduceSelf()
```
클래스는 자기가 뭘 하지 않습니다. 클래스는 해당 유형의 구체적인 객체를 만들기 위한 일종의 템플릿이다.

사용자가 만드는 각각의 구체적인 Professor를 클래스의 인스턴스라고 한다.

인스턴스를 만드는 프로세스는 생성자라는 특수 함수에 의해 수행된다. 

새 인스턴스에서 초기화하려는 내부 상태에 대한 값을 생성자에 전달한다.

일반적으로 생성자는 클래스 정의의 일부로 작성되고, 일반적으로 클래스와 동일한 이름을 갖는다.

```psudo
class Professor
    properties
        name
        teaches
    constructor
        Professor(name, teaches)
    methods
        grade(paper)
        introduceSelf()
```

### 상속
학생도 설계해보자.

```psudo
class Student
    properties
        name
        year
    constructor
        Student(name, year)
    methods
        introduceSelf()
```

학생과 교수가 몇 가지 속성을 공유한다, 어 정확하게는 어떤 수준에서는 같은 종류라는 사실을 알 수 있다. 상속을 이용해 이를 표현해보자.

```psudo
class Person
    properties
        name
    constructor
        Person(name)
    methods
        introduceSelf()

class Professor : extends Person
    properties
        teaches
    constructor
        Professor(name, teaches)
    methods
        grade(paper)
        introduceSelf()

class Student : extends Person
    properties
        year
    constructor
        Student(name, year)
    methods
        introduceSelf()
```
"Person" 클래스를 슈퍼클래스 또는 부모클래스라고 할 것이다.
반대는 하위클래스라고 한다.

"introduceSelf()"는 세 클래스 모두에 정의되있음을 알 수 있음. 모든 사람들이 자기를 소개하는 방식이 다르기 때문

```javascript
walsh = new Professor('Walsh', 'Psychology')
walsh.introduceSelf()  // 'My name is Professor Walsh and I will be your Psychology professor.'

summers = new Student('Summers', 1)
summers.introduceSelf() // 'My name is Summers and I'm in the first year.'
```

학생이나 교수가 아닌 사람들을 위한 기본 구현이 있을 수 있다.
```javascript
pratt = new Person('Pratt')
pratt.introduceSelf() // 'My name is Pratt.'
```

이렇게 메소드의 이름은 같지만 다른 클래스에서 구현이 다른 경우를 "다형성" 이라고 한다.

하위 클래스의 메소드가 상위 클래스의 구현을 대체할 때 하위 클래스가 상위 클래스의 버전을 재정의한다고 말한다.

### 캡슐화
객체는 다른 코드가 자신을 사용할 수 있게 인터페이스를 제공하지만, 자신의 내부 상태를 유지한다.

객체의 내부 상태는 "private"로 유지된다. 이것의 다른 객체를 통해서가 아니라, 객체 자신의 메소드를 통해서 접근할 수 있다는 의미이다.

객체의 내부 상태를 "private"로 유지하고, "public" 인터페이스와 "private" 내부 상태 사이를 명확히 하는 것이 캡슐화라고 한다. 

이것은 프로그래머가 객체를 사용하는 모든 코드를 찾아 업데이트하지 않고도 객체의 내부 구현을 변경할 수 있도록 하기 때문에 유용하다.
이 객체와 시스템의 나머지 부분 사이에 일정의 방화벽을 만든다.

예를 들어, 학생들이 2학년 이상인 경우에만 양궁을 공부할 수 있다고 가정하면, 
학생의 속성 "year"을 노출함으로써 조건을 결정할 수 있다.

``` Before Encapsulation
if (student.year > 1) {
    // allow the student into the class
}
```
만약, 양궁을 공부할 수 있도록 허용하는 기준을 변경하기로 결정한 경우. 이 조건을 수행하는 시스템의 모든 위치를 업데이트 시켜야 한다.

이것 보단, 논리를 구현하는 객체에서 "canStudyArchery()"메서드를 사용하는 것이 효율적이다.

```psudo
class Student : extends Person
    properties
        year
    constructor
        Student(name, year)
    methods
        introduceSelf()
        canStudyArchery() { return this.year > 1 }
```

``` After Encapsulation
 if (student.canStudyArchery()) {
    // allow the student into the class
 }
```
위와 같이 코드를 수정하면, 양궁 공부에 대한 규칙을 변경하려는 경우 클래스의 해당 메서드만 업데이트하면 이 "Student"클래스를 사용하는 모든 코드가 계속 작동한다.

많은 OOP 언어에서 일부 속성을 "private"로 표시하여 다른 코드가 객체의 내부 상태에 액세스하는 것을 방지할 수 있다.

```psudo
class Student : extends Person
    properties
        private year
    constructor
        Student(name, year)
    methods
        introduceSelf()
        canStudyArchery() { return this.year > 1 }
        
student = new Student('Maeve', 1);
student.year // error: 'year' is a private property of Student
```
이와 같이 액세스를 강제하지 않는 언어에서 프로그래머는 변수명을 밑줄(_)로 시작하는 것과 같은 명명 규칙을 사용하여 속성이 비공개로 간주되어야 함을 나타낸다.

### OOP와 JS
- JS의 생성자는 클래스 정의와 같은 기능을 제공하여 객체에 포함된 모든 메서드를 포함하여 객체의 "모양"을 한 곳에서 정의할 수 있도록한다.
하지만, 여기에서도 프로토타입을 사용할 수 있다. 예를 들어 메서드가 생성자의 prototype 속성에 정의된 경우 해당 생성자를 사용하여 생성된 모든 객체는 프로토타입을 통해 해당 메서드를 가져오고 생성자에서 정의할 필요가 없다.
- 프로토타입 체인은 상속을 구현하는 자연스러운 방법처럼보인다. 

하지만, 이러한 기능과 위에서 설명한 '고전적인' OOP 개념 간의 차이점을 이해하는 것은 가치가 있다.

첫번째, 클래스 기반 OOP에서 클래스와 객체는 별개의 두 구조를 갖으며, 객체는 항상 클래스의 인스턴스로 생성된다.
또한 클래스를 정의하는 데 사용되는 기능(클래스 구문 자체)과 객체를 인스턴스화하는 데 사용되는 기능(생성자) 간에도 차이가 있다.
JS에서 우리는 함수나 객체 리터럴을 사용하여 별도의 클래스 정의 없이 객체를 생성할 수 있고 자주 생성한다.
이는 객체 작업을 고전 OOP에서보다 훨씬 더 가볍게 만들 수 있다.

두번째, 프로토타입 체인이 상속 계층 구조처럼 보이고 어떤 면에서는 같은 동작을 하지만 다른게 동작하는 방면이있다.
하위 클래스가 인스턴스화될 때 하위 클래스에 정의된 속성과 계층 구조의 상위에 정의된 속성을 결합하는 단일 객체가 생성된다.
프로토타이핑을 사용하면 계층의 각 수준이 별도의 객체로 표시되고 "__proto__"속성을 통해 함께 연결된다.
프로토타입 체인의 동작은 상속보다는 ***위임***에 가깝다. 위임은 객체가 작업을 수행하도록 요청받았을 때 작업 자체를 수행하거나 다른 객체(위임자)에게 요청할 수 있는 프로그래밍 패턴이다.
여러 면에서 위임은 상속보다 새체를 결합하는 더 유연한 방법이다.
(한 가지 이유로 런타임에 대리자를 변경하거나 완전히 대체할 수 있음.)

즉, 생성자와 프로토타입을 사용하여 JS에서 클래스 기반 OOP 패턴을 구현할 수 있다.
그러나 상속과 같은 기능을 구현하기 위해 직접 사용하는 것은 까다롭기 때문에 JS 프로토타입 모델 위에 계층화된 추가 기능을 제공하여 클래스 기반 OOP의 개념에 보다 직접적으로 매핑된다.

``` Cat Get
⠀⠀⠀⠀⠀⠀⠀ ＿＿
　　　　／＞　　フ
　　　　| 　_　 _ l
 　　　／` ミ＿xノ
　 　 /　　　 　 |
　   /　 ヽ　　 ﾉ
 　 │　　|　|　|
／￣|　　 |　|　|
| (￣ヽ＿_ヽ_)__)
＼二つ 
```