# Manipulating document
사용자가 웹페이지와 앱을 작성할때, 가장 일반적인 일중 하나는, 어떤 방법으로 문서 구조를 다루길 원하는 것이다.
이번 글에서는 DOM을 어떻게 사용하는지 자세히 보고, 다른 흥미로운 방법으로 사용자에게 알릴(alter) 수 있는흥미로운 API도 따라서 볼 것이다.

## 웹 브라우저에서 중요한 부분
웹 브라우저는 많은 움직이는 부분과, 웹 개발자가 JS를 이용해 컨트롤할 수 없거나 다룰 수 없는부분과 함께있는 복잡한 소프트웨어이다.
사용자는 이런 제한점이 안좋은점이라고 생각할 수 있지만, 브라우저는 좋은 이유(대부분 보안상의 이유로)로 막혀져있다. 
상상해보자, 웹 사이트가 사용자의 저장된 비밀번호나 민감한 정보 그리고 기록(로그)에 접근하려한다면 어떻게 할것인가?

제약사항에도 불구하고, Web API는 우리들에게 웹페이지에서 엄청난일을 할 수 있는 많은 기능을 제공하고 있다.
브라우저의 보여지는 페이지를 보자.
- 윈도우는 브라우저 탭에 웹페이지에 로드된다. 이 윈도우는 "Window" 객체를 통해 JS로 표현된다.
메서드를 사용은 이 객체를 이용해 사용자가 윈도우의 크기 되돌리기, 문서 로드의 조작, 클라이언트 사이드에서 문에 특정한 데이터 저장같은 일을 가능하게 한다.
또, 현제 윈도우에 이벤트 핸들러 붙이기, 등등
- 네비게이터는 웹사이트에 존재하면서 상태와 브라우저의 id를 표현한다. JS에서, "Navigator"객체를 통해 표현된다. 
사용자는 이 객체를 이용해 사용자의 선호하는 언어, 사용자의 웹 캠으로부터 미디어 스트림 같은 것을 개선할때 사용할 수 있다.
- 문서(브라우저에서 DOM을 통해 표현되는)는 윈도우에 실제로 로드된다. 그리고 JS에서 "Document" 객체를 통해 표현된다.
사용자는 이 객체를 사용해 반환할 수 있고, 문서를 구성하는 HTML과 CSS에서 정보를 조작할 수 있다.
예를들어, DOM 요소의 텍스트를 변경하거나, 새로운 스타일을 적용하거나, 새로운 요소를 생성, 추가, 또는 전체를 삭제하기위해 DOM에서 요소를 참조를 들고온다.

이번 글에서는 문서를 조작하는 것에 대부분 집중한다, 나버지 부분은 간단히 본다.

## DOM
문서는 각각의 DOM을 통해 표현되는 사용자의 브라우저 탭에서 현재 로드된다. DOM은 브라우저를 통해 생성되는 HTML구조를 프로그래밍언어로 쉽게 접근할 수 있도록하는 "tree structure"표현이다. 예를들어, 브라우저 스스로는 스타일을 적용하기위해 사용하고, 페이지를 랜더로써 요소를 모으기위해 다른 정보를 사용한다.
그리고 개발자가 페이지가 랜더되면 JS로 DOM을 조작할 수 있게한다.

간단한 DOM 예제를 보자
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple DOM example</title>
  </head>
  <body>
      <section>
        <img src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">
        <p>Here we will add a link to the <a href="https://www.mozilla.org/">Mozilla homepage</a></p>
      </section>
  </body>
</html>
```

DOM은 아래 사진처럼 볼 수 있다.
![dom-tree](../../img/dom-screenshot.png)

> 이런 DOM 트리 다이어그램은 [Live DOM viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)로 생성할 수 있다.

트리의 각 진입점(entry)는 노드라 부른다. 이 다이어그램은 노드의 요소 표현과 다른 글자 표현("#text"로 구분되는)을 통해 볼 수 있다.
다른 노드의 타입이 있지만, 중요한 것만 보자.

노드는 다른 노드와 관계되는 트리에 위치를 참조한다.
- Root node : 트리에서 정점 노드, HTML에서 Root node는 항상 "HTML" 노드이다. (SVG, 커스텀 XML 같은 다른 마크업 단어집에서 다른 root 요소를 가질것이다.) 
- Child Node : 어떤 노드 ***바로*** 내부에있는 노드. 위 예제에서, "SECTION"의 child는 "IMG" 이다.
- Descendant node : 어떤 노드의 내부에있는 노드. 위 예제에서 "IMG"sms "SECTION" child 이고, "BODY"의 자손(descendant)이다.
- Parent node : 어떤 노드가 포함된 노드. 예제에서 "BODY"는 "SECTION"의 부모(parent)이다.
- Sibling node : DOM 트히에서 같은 레벨에 위치한 노드들. 예를 들어 "IMG"와 "P"는 형제(siblings)이다.

DOM을 다루기전에, 위 기술에 익숙해지면 편리하다.

## 기본 DOM 조작
DOM 조작에대해 배워보자.

- 위 예제에서 ```</body>``` 태그 바로위에 ```<script></script>``` 요소를 추가하자
- DOM내부 요소를 다루기위해, 먼저 선택을하고, 변수안에 참조를 저장하자. 스크립트 안에 다음 라인을 추가해보자
``` javascript
const link = document.querySelector('a');
```
- 변수에 저작된 참조가 있고, 이를 이용해 사용할 수 있는 속성과 메소드를 이용해 조작할 수 있다.
(```<a>``` 요소의 경우, "HTMLAnchorElement와 같은 인터페이스가 정의되어있는데, DOM에 모든 노드를 표현하는 더 일반적인 부모 인터페이스인 "HTMLElement", "Node"가 정의되어있다.). 먼저, 링크 내부의 "Node.textContent"의 속성 값을 수정함으로써 텍스트를 변경해보자. 
```javascript
link.textContent = 'Mozilla Developer Network';
```
- 또, 링크가 가리키는 URL을 바꾼다.
```
link.href = 'https://developer.mozilla.org';
```
JS에서 요소를 선택하고, 변수에 저장하는 많은 방법이있다.
```Document.querySelector()```는 최근 추천되는 방법이다. 얘는 사용자가 CSS 셀렉터로 요소를 선택할 수 있게해줘서 편리하다.
만약, 여러 요소를 선택해서, 매칭하고 싶다면, ```Document.querySelectorAll()```를 사용할 수 있다. 얘는 문서에서 셀렉터와 매칭되는 모든 요소를 가져온다.
그리고, "NodeList"라고 불리는 배열과 비슷한 객체에 참조해 저장한다.

요소의 참조를 가져오기위해 오래된 메서드도 사용할 수 있다.
- ```Document.getElementById()```는 "id" 속성으로 요소를 선택한다.
- ```Document.getElementByTagName()``은 페이지에서 주어진 타입의 모든요소를 배열과 비슷한 객체를 반환한다.

이 둘은 오래된 브라우저에서 "querySelector()"보다 더 잘 동작한다. 편하지는 않다!

### 노드 생성하고, 배치하자
사용자는 새로운 요소를 생성할 수 있다.
1. 예제로 돌아가서, ```<section>``` 요소의 참조를 가져오자. 
```javascript
const sect = document.querySelector('section');
```
2. ```Document.createElement()```를 이용해 새로운 단락을 생성하고, text 컨텐츠를 넣자.
```javascript
const para = document.createElement('p');
para.textContent = 'We hope you enjoyed the ride.';
```
3. ```Node.appendChild()```생성한 단락을 섹션의 마지막에 추가할 수 있다.
```
sect.appendChild(para);
```
4. text 노드를 링크가 내부에있는 단락에 추가해보자. ```Document.createTextNode()```를 사용해, text 노드를 생성하자
```javascript
const text = document.createTextNode(' - the premier source for web development knowledge.');
```
5. 링크가 포함괸 단락의 참조를 구하고, text 노드를 붙이자.
```javascript
const linkPara = document.querySelector('p');
linkPara.appendChilde(text);
```

사용자가 DOM에 노드를 추가할때 필요한 대부분의 정보이다. 이 메소드들은 다이나믹한 인터페이스를 구성할때, 아주 많이 사용될 것이다.

### 요소의 이동, 삭제
예시에서 section의 맨아래에 링크가 포함된 구문을 옮기고 싶을때, 아래와 같이 사용하면 된다.
```javascript
sect.appendChild(linkPara);
```
위 구문이, 사용자가 복사를해서, 두번째 요소를 만든다고 생각할 수 있지만, "linkPara"의 경우 하나에 참조되어있다.
만약, 복사하기를 원하고, 같은걸 추가하고 싶다면, ```Node.cloneNode()```를 대신 사용해라.

요소의 제거는 꾀 쉽다. 삭제될 요소의 참조가 있고, 부모가있을떄, ```Node.removeChild()``를 사용해라.
```javascript
sect.removeChild(linkPara);
```

요소 참조를 기반으로 삭제하고 싶을때는 ```Element.remove()``` 를 사용할 수 있다.

```javascript
linkPara.remove();
```
:warning: 이 메소드는 오래된 브라우저에서 지원하지 않는다.
오래된 브라우저는 노드에게 스스로 제거되라고 알리는 메소드가 없다. 그래서 다음과 같이 해야한다.
```javascript
linkPara.parentNode.removeChild(linkPara);
```

### 스타일 다루기
JS로 CSS 스타일을 다양한 방법으로 다룰 수 있다.

```Document.stylesheets```를 이용해 문서에 적용된 모든 스타일시트의 리스트를 가져올 수 있다.
얘는 ```CSSStyleSheet``와 함께 배열과 유사한 객체를 반환한다. 사용자는 바라는 대로, 스타일을 추가 삭제할 수 있다.
그러나, 이 특징을 자세히 알아보진 않는다, 왜냐하면, 이 작업은 구식이고, 스타일을 다루는 방법이 어렵다. 더 쉬운방법이있다.

첫 번째 방법은 사용자가 원하는 동적인 스타일을 인라인 스타일을 바로 엘리먼트레 추가하는 방법이다.
```HTMLElement.style```속성을 이용한다. 얘는 문서의 각 요소의 인라인 스타일링 정보를 포함한다.
사용자는 이 객체의 속성을 요소의 스타일을 직접적으로 수정해서 세팅할 수 있다.

예제를 보자.
```javascript
para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';
```

페이지를 재로드하면, 스타일이 적용된 단락을 볼 수 있다. 페이지 검사기를 통해, 보면 아래와 같이 문서에 인라인 스타일이 추가되어있다.

``` html
<p style="color: white; background-color: black; padding: 10px; width: 250px; text-align: center;">We hope you enjoyed the ride.</p>
```

 CSS 스타일의 JS 속성 버전은 lower camel case를 사용하는데, CSS 버전은 하이픈(hyphenated)이다. 사용자는 절대로 섞어서 사용하면 안된다.

 문서의 스타일을 동적으로 조작하는 일반적인 방법은 HTML의 ```<head>``에 스타일태그를 사용해 CSS 사용해라.
 ``` html
<style>
.highlight {
  color: white;
  background-color: black;
  padding: 10px;
  width: 250px;
  text-align: center;
}
</style>
 ```
JS로 스타일을 다룬 코드를 지우고, 이반적으로  HTML을 다루는 유용한 메소드인 ```Element.setAttribute()```를 사용한다.
얘는 요소에 세팅하길 원하는 attribute인 두개의 아규먼트를 받는다. 그 값은 세팅하기 원하는 값이다.

단락 요소에, highlight class를 세팅해보자.

```javascript
para.setAttribute('class', 'highlight');
```

페이지를 새로고침하면, 변경을 확인할 수 있다. class를 주면서, 인라인 CSS스타일이 아니라, CSS 규칙에 따라 선택되었다.

어떤 메소드를 고르든, 장단이있다. 첫번째 메서드는 적은 세팅과, 간단한 사용법이있다. 반면에 두번째 메소드는 더 순수하다.
(인라인 스타일은 안좋은 실천법)
사용자가 크고, 더 복잡한 앱을 만든다면, 사용자는 두번째 메소드를 사용을 시작할 것이다. 

JS를 이용해 컨텐츠를 만드는 것은 의미가 없다. JS를 이용하지 않고, HTML에 작성하는 것이 좋다. (SEO에서 읽을 수 없음)

:grey_question: React 같은 애들은.. SEO우째 맞추누..?
## 동적인 쇼핑 목록
- 숙제..

