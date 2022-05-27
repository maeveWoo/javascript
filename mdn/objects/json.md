## Working with JSON
JS Object Notation 은 JS 객체 문법을 기초로한 데이터 구조 표현을 위한 문자기반의 표준 형식이다.
JSON은 웹어플리케이션에서 데이터를 주고받을때, 일반적으로 사용된다.


### JSON이 뭐야.
JSON은 비록 JS 객체 리터럴 문법과 유사하가지만, JS로부터 독립될 수 있다.
JSON은 많은 프로그래밍 환경에서 읽고 생성할 수 있는 특징이 있다.

JSON 은 문자로 존재한다. - 네트워크를 통해 데이터를 전송하고 싶을때, 유용하다. 
이는 데이터로 전환하고 싶다면 native 객체로 전환(convert)해야한다. 큰일은 아니당 - JS는 global JSON 객치를 제공한다.

:pencil2: 문자를 native 객체로 컨버팅할때, 이를 "deserialization"이라 부른다. 반대로 native 객체를 문자열로 컨버팅하면, 
네트워크를 통해 전송할 수 있는다. 이를 "serialization"이라한다.

JSON 문자는 application/json의 MIME type 기본적으로 .json확장자인 텍스트 file로 저장될 수 있다. 

### JSON 구조
표준 JSON 내부에는 기본 데이터타입을 넣을 수 있다.

- string, number, array, boolean 그리고 다른 객체 리터럴. 아래와 같이 계층구조의 데이터도 허용된다.


```json
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
```
JS 프로그램에, 이 문자열을 불러올떄, "superHeroes"라 불리는 변수로 파싱된다.
예를 들어, 사용자는 점과/대괄호 표현으로 데이터 내부에 접근할 수 있다. 
```
superHeroes.homeTown
superHeroes['active']
```

#### JSON 에서 배열
```json
[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]
```
위 예제는 검증된 JSON이다. 배열의 아이템에 접근하려면 배열의 인덱스로 접근하면된다.
예를들어 ```[0]["powers"][0]```

#### 참고사항
- JSON은 순수 문자로된 구체화된 데이터형식이다.
- JSON은 쌍따옴표(")가 필요하다. JSON 문자열에서 작은따옴표(')는 유효하지 않다.
- 콤마나, 콜론의 위치가 하나라도 잘못되면, JSON파일은 잘못되고, 동작하지 않는다. [JSONLint](https://jsonlint.com/) 같은 곳에서 유효성감사흫 사용할 수 있다.
- JSON은 사실 어떠한 데이터타입이든 형식이 유효하면 다 사용할 수 있다. 
- JS 속성은 따옴표를 안찍는데, JSON은 따옴표를 찍은 문자열만이 속성으로 쓸 수 있다.

