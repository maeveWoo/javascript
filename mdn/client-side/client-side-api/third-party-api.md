# Third-party APIs
구글 맵, 트위터 등 개발자들이 그들의 데이터나 서비스를 사용할 수 있게 API를 제공한다. 이번 챕터에서 브라우저 API와 3rd party API의 차이점을 보고, 요즘 쓰는 유형을 본다.

## 3rd party API가 뭐야?
유명 회사들은 JS를 통해 그들의 기능에 접근할 수 있게해주고, 사용자의 사이트에 사용할 수 있게한다.
가장 유명한 예는 지도 API를 사용햐, 사용자의 페이지에 지도를 표현하는 것이다.

### 얘들은 third-party server애서 발견된다.
브라우저 API는 브라우저에 내장되어있다. 
예를들어 웹 Audio API는 native ```AudioContext`` 객체를 사용해 접근했다.

```javascript
const audioCtx = new AudioContext();
// ...
const audioElement = document.querySelector('audio');
// ...
const audioSource = adioCtx.createMediaElementSource(audioElement);
// etc.
```
third party API는 third party 서버에 위치한다.
JS에서 저 API에 접근하기위해서, API기능에 연결해야하고, 사용자의 페이지에 사용가능하게 해야한다.
이는 JS 라이브러리를 연결해 서버에서 ```<script>``요소를 통해 사용가능하게 한다.
Mapquest 예제를 보자.

```javascript
<script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js" defer></script>
<link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
```

```javascript
const map = L.mapquest.map('map', {
    center: [53.480759, -2.242631],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
});
```
"mapquest.map()" 메소드를 이용해, 새오운 지도를 만들었다.

... 이걸 정리해야하나?