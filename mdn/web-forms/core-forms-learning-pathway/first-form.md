# Your first form
간단한 폼을 만드는 경험을 해보자. 

## 웹 폼이 뭘까?
웹 폼은 사용자와 웹 사이트 또는 애플리케이션 사이에의 소통의 주요 방법 중 하나이다.
폼은 사용자에게, 주로 웹 서버의 진행과 저장 또는 클라이언트 사이드에서 인터페이스 구정 을 위해 데이터 입력을 할 수 있게한다.

웹 폼의 HTML은 하나 이상의 form controls(widgets라고 종종 불린다.)로 만들어졌는데, 몇 추가적인 요소는 폼 전체적으로 구성에 도움을 준다.
이 controls는 하나 이상의 텍스트 필드, 드롭 박스, 버튼, 체크박스, 라디오 버튼 그리고, ```<input>``` 요소를 사용해서 주로 생성된다. 

form controls는 특정 양식이나, 값을 구체화할 수 있다.(폼 유요성)
그리고, 그들의 목적을 설명하는 text label 쌍은 시력이 안좋은 사용자들을 위한다.

## Form HTML 구현하기

### ```<form>`` 요소
```html
<form action="/my-form" method="post" >

</form>
```
이 요소는 폼을 형식적으로 정의한다. 얘는 ```<section>```,```<footer>```같은 컨테이너 요소이다.하지만, 구체적으로 form을 포함하고있다. 얘는 폼행동 방식을 설정하기위해 몇몇 구체적인 attributes를 제공한다.
이 attributes는 선택사항이지만, 표준 관례는 항상 적어도 "action"과 "method" attribute를 세팅한다.

- "action" attribute는 폼이 제출될 때, 폼에서 수집된 데이터가 보내질 곳으로 location(URL)을 정의한다.
- "method" attribute는 데이터를 보내기위한 HTTP 메서드를 정의한다.

### ```<label>```, ```<input>```, and ```<textarea>```요소 

```html
<form action="/my-handling-form-page" method="post">
 <ul>
  <li>
    <label for="name">Name:</label>
    <input type="text" id="name" name="user_name">
  </li>
  <li>
    <label for="mail">E-mail:</label>
    <input type="email" id="mail" name="user_email">
  </li>
  <li>
    <label for="msg">Message:</label>
    <textarea id="msg" name="user_message"></textarea>
  </li>
  <li class="button">
    <button type="submit">Send your message</button>
  </li>
 </ul>
</form>
```

```<label>``` 요소에 "for" attribute사용은 관련있는 폼 control의 id값을 쓴다. 이는 큰 장점이있는데, label과 관련있는 form contrl은 스크린리더의 접근을 제공한다. 
[기본 form controls 자세히 보기](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form)

문법체크를 하자 ```<input>``` vs ```<textarea></textarea>```.

```<input>```태그는 닫는 태그가 없는 빈 요소이지만 ```<textarea>``는 빈 요소가 아니다. 
이는 폼의 구체적인 특징에 특징이있다: 기본값을 설정하는 방법. 

```<input>``` 의 기본 값을 정의하고 싶을때, 
```html
<input type="text" value="by default this element is filled with this text">
```

```<textarea>``` 의 기본 값을 정의하고 싶을때, 
```html
<textarea>
by default this element is filled with this text
</textarea>
```

### ```<button>``` 요소
```<button>``` 는 "type" attrite를 받는다. 얘는 3가지 값을 받는다. "submit", "reset", "button"

- "submit" 버튼을 클릭하면, 폼의 데이터를 "action" 속성으로부터 정의된 웹 페이지로 보낸다.
- "reset" 버튼을 눌리먄, 폼 widgets의 전부가 기본 값으로 즉시 재설정된다. UX 관점에서, 얘는 안좋은 관례이다.
- "button" 버튼을 눌리면, 아무것도 안한다! 이상하게 들리지먄, 버튼을 커스텀하기엔 매우 유용하다.

```<input>``` 요소에도 type으로 버튼을 생성할 수 있다. ```<button>``` 요소의 장점은 ```<input>``` 요소가 단지 HTML text만 받게하고, 더 복잡하고, 생산적인 버튼 컨텐츠를 만들게 한다. 

## 웹서버에 폼 데이터 전송하기
각 폼 control의 "name" attribute를 섰다. 이 name은 클라이언트와 서버 사이드 모두에서 중요하다.
name은 브라우저에게 각 데이터의 조각에, 이름을 줄지 알려주고, 서버사이드에서는 name을 통해 각 데이터조각을 다룰 수 있게한다.
폼 데이터는 name/value 쌍으로 서버에 보내진다.

위 예제는  HTTP를 이용해 URL "/my-handling-form-page"로 보내질 것이다.

서버에서 HTTL Request에서 URL"/my-handling-form-page"에서 key/value 3개의 아이템 리스트가 받아진 것이다.