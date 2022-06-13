# Introduction to web APIs
## What is APIs?
API는 프로그래밍 언어에서 개발자가 복잡한 기능을 더 쉽게 만들 수 있게 해준다.API는 사용자로부터 더 복잡한 코드를 추상화하고, 쉬운 문법으로 사용할 수 있게 제공한다.

## APIs in client-side JS
Client-side JS는 사용가능한 많은 API들을 갖고있다. 이는 JS언어의 일부분만 있는게 아니다.
핵심 JS 언어 위에 구축되어, JS 코드에서 사용할 수 있는 추가 수퍼파워를 제공한다.
일반적으로 두 가지 범주로 나뉜다.
- 브라우저 API는 웹 브라우저에 내장되어 있으며 브라우저와 주변 컴퓨터환경에 데이터를 노출한다.
그리고 이 데이터를 이용해 유용한 유용하고 복잡한 잡업을 할 수 있다. 예를들어, Web Audio API는 브라우저에서 오디오 구현을 위해 JS 생성자를 제공한다. 
오디오 트랙을 받고, 볼륨을 변경하고, 이팩트를 적용하는 등. 
브라우저는 사실, 실제로 오디오 동작을 위해 C++이나 Rust같은 로우-레벨의 복잡한 코드를 사용한다.
이 복잡성은 API를 통해 추상화되었다.
- 서드파티 API는 브라우저에 기본으로 내장되어있지 않다. 일반적으로 사용자는 어떤 웹에서 정보나 사용자의 코드를  되찾아와야한다. 예를들어 Twitter API는 사용자의 최신 트위터를 볼 수 있게하는 것들을 허용한다. 이 API는 사용자가 Twiter 서비스에 쿼리를 사용할 수 있도록 특별한 생성자 세트를 제공하고, 구체적인 정보를 반환한다.

### JS와 API 그리고 다른 JS 둘들의 관계
웹을 클라이언트 사이트 JS API가 뭔지 알아봤고, JS 언어와 어떻게 연관됬는지 알아봤다.
더 명확하게 요정을 정리하고, 다른 JS 툴이 맞는지 찝어본다.
- JS : 브라우저에 내장된 high-level 스크립트 언어, JS는 웹 페이지와 앱에서 기능 구현을 허용한다. JS는 Node 같은 다른 프로그래밍 환경에서도 시용가능하다.
- 브라우저 APIs : 브라우저에 내장된, JS 언어의 정점에 있고, 사용자의 기능구현을 더욱 쉽게해준다.
- Third-party APIs : 서드-파티 플렛폼에 내장됨. 이 플랫폼의 몇가지 기능을 사용자 자신의 웹 페이지에서 사용할 수 있게해줌. (Twitter, Facebook등)
- JS libraries : 종종 커스텀한 함수들이 포함된 하나 이상의 JS 파일. 얘들은 사용자의 웹사이트의 속도를 높이거나, 일반적인 기능을 작성할 수 있다. 예를들어 jQuery, Mootools 그리고 React 등
- JS 프레임워크 : 라이브러리의 다음버전, JS 프레임워크 HTML, CSS, JS 그리고 다른 기술들의 패키지를. 사용자가 설치하고, 전체 웹 애플리케이션을 작성하는데 사용된다.
라이브러리와 프레임워크의 차이점은 "Inversion of Control"이다.
라이브러리에서 메소드를 호출할때, 개발자가 다루지만, 프레임워크에서는 전도가된다. 프레임워크가 개발자의 코드를 호출한다.

## API가 할 수있는것은?
최신 브라우저에서는 API가 많다. 이는 사용자의 코드에서 넓고 다양한것을 할 수 있게한다.

### 일반적인 브라우저 API들
- ***document 구현 API는 브라우저에 로드된다***.*** 가장 대표적인 예제는 DOM API이다. 얘는 사용자가 HTML, CSS를 구현할 수 있게한다. [도큐먼트 구현 API 더보기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- ***서버로부터 가져운 데이터 API***는 아주 일반적으로 사용자의 웹페이지의 일부분을 업데이트하는데에 사용된다. 이는 작은 디테일 처럼 보이지만, 사이트의 동작과 퍼포먼스에서 거대한 임팩트를 가진다. [서버로 데이터 가져오기 더보기](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)
- ***그림과 그래픽 구현을 위한 API***는 브라우저에서 광범위하게 지원한다. 가장 유명한 것은 Canvas와 WebGL이다. 얘들은 사용자가 프로그래밍적으로 픽셀 데이터를 업데이트해서 HTML에 cancas 엘리먼트로 2D, 3D 화면을 만들 수 있게 한다. 
- HTMLMediaElement, Web Audio API, WebRTC와 같은 ***오디오와 비디오 API***는 사용자가 흥미로은 것을 할 수 있게 해준다. 비디오와 오디오, 캡션같은 텍스트 트랙, 비디오에 하위 제목, 캠버스흐 통한 구현을 위해 사용자의 웹캠 가저오기 플레이를 위한 커스텀 UI 컨트롤러 같은 것할 수 있게해준다. 
- 디바이스 API는 디바이스 하드웨어와 상호작용할 수 있게한다. 예를들어 디바이스 사용자의 위지를 알 기 위해 "Geolocation API"를 사용해 GPS에 접근한다.
- ***Client-side 저장 API***는 사용자가 client-side에서 데이터를 저장할 수 있게하고, 사이트의 만약에 디바이스가 오프라인일지라고, 페이지로드를 저장해 앱을 만들 수 있다.
만은 옵션들이 있는데, 간단한 예로 웹 저장소 API로 name/value를 저장할 수 있다. 더 복잡한 [데이터베이스 저장 알아보기](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### 일반적인 서드파티 API들
서드파티 API는 매우 다양하다. 유명한 API둘러보기
- Twitter API
- Map API : Mapquest와 Google Maps API 같은..
  

## API가 어떻게 동작할 까?
JS API는 약간 다른 방법으로 동작한다. 하지만 주로 JS가 동작하는 방식에서 일반적인 특징과, 비슷한 테마를 갖는다.

### JS는 객체가 기본이다.
API와 상호작용하는 사용자 코드는 JS 객체를 하나이상 사용한다. 이 객체는 데이터를 위한 컨테이너로써 API 사용, 기능적으로 API 사용가능하게 만든다.

Web Audio API의 예제로 돌아가자. 이는 꾀나 복잡한 API이고, 많은 수의 객체로 구성된다.
대표적인 예들을 보자.
- ***AudioContext***는 오디오 그래프를 표현한다. 오디오 그래프는 브라우저 내부에서 오디오 필래잉을 구현할 수 있게해주고, 오디오를 구현핳 수 있는 많은 메서드와 속성을 갖는다.
- ***MediaElementAudioSourceNode***는 사용자가 재생하고자하는 오디오 컨텍스트에서 구현하고싶은 소리를 포함해 ```<audio>``` 요소를 표현한다.
- ***AudioDestinationNode*** 오디오의 대상, 즉 실제로 출력할 컴퓨터의 장치(일반적으로 스피커 또는 헤드폰)를 나타낸다.

간단한 웹 오디어 예제를 보자
```html
<audio src="outfoxing.mp3"></audio>

<button class="paused">Play</button>
<br>
<input type="range" min="0" max="1" step="0.01" value="1" class="volume">
```
```<audio>```엘리먼트는 내장된 MP3를 페이지에 넣었다.기본 브라우저 컨트롤러들을 포함하지 않았다. 다음으로 ```<button>```은 음악을 재생/멈추기위해 사용한다. range 타입의  ```<input>``` 요소는, 재생되는 동안, 트랙의 볼룸을 적용할 것이다.

트랙을 구현하는 대신, "AudioContext"를 생성함으로써 시작한다.
```javascript
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
```

다음으로, 요소들을 상수로 저장하고, "AudioContext.createMediaElementSource()"메소드를 사용해 "MediaElementAudioSourceNode"를 생성한다. "MediaElementAudioSourceNode"는 오디오의 소스를 표현한다. 

```javascript
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('button');
const volumeSlider = document.querySelector('.volume');

const audioSource = audioCtx.createMediaElementSource(audioElement);
```

다음작업은 이벤트 핸들러 한쌍을 만든다. 얘들은 버튼이 눌러졌을때, 그리고 재생이 끝나서, 시작점으로 초기화할 때 재생과 정지 토글을 제공한다.

```javascript
playBtn.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') { // autoplay policy
        audioCtx.resume();
    }

    if (playBtn.getAttribute('class') === 'paused') {
        audioElement.play();
        playBtn.setAttribute('class', 'playing');
        playBtn.textContent = 'Pause'
    } else if (playBtn.getAttribute('class') === 'playing') {
        audioElement.pause();
        playBtn.setAttribute('class', 'paused');
        playBtn.textContent = 'Play';
    }
});

audioElement.addEventListener('ended', () => {
    playBtn.setAttribute('class', 'pause');
    playBtn.textContent = 'Play';
});
```

다음으로, "AudioContext.createGain()"메소드를 이용해, "GainNode" 객체를 생성한다.
이 메소드는 오드오 패드의 볼륨을 적용할 수 있게 한다. 그리고 다른 이벤트 핸들러는 슬라이드 값이 변경될 때, 오디오 그래프가 갖고있는 볼륨의 값을 변경할 수 있다.

```javascript
const gainNode = audioCtx.createGain();

volumeSlider.addEventListener('input', () => {
    gainNode.gain.value = volumeSlider.value;
});
```

마지막으로, 오디오 그래프의 여러 노드를 연결한다. 
이 작업을 위해 모든 노드 유형에 사용할 수 있는 "AudioNode.connect()" 메서드를 사용한다.

```javascript
audioSource.connect(gainNode).connect(audioCtx.destination);
```

오디오가 시작되면, gain 노드가 연결될 것이고, 오디오의 볼룸이 적용된다. 
이 gain 노드는 destination 노드에 연결되고, 소리는 사용자 컴퓨터에서 재생될 수 있다.

### 인지 가능한 진입점 (entry 포인트)
API를 사용할때, 사용자는 진입점을 인식해야한다. 웹 오디오 API에서, 이는 꽤나 간단하다.
웹 오디오 API에서 진입적은 "AudioContext"객체이다, 이는 어떤 오디오 장치이든 사용하려면 구현되어야한다.

DOM API또한 간단한 진입점이 있다. 이것의 특징은 "Document"객체 또는 사용자가 어떤 방법으로 영향을 주고싶은 HTML 요소의 객체에서 떨어졌을때, 발견되는 경향이있다.

예를 보자
```javascript
const em = document.createElement('em');
const para = document.querySelector('p');

em.textContent = 'Hello there!';
para.appendChild(em);
```

Cancas API 또한 조작을 위해 컨텍스트 객체에 의존한다. 얘의 컨텍스트 객체는 사용자가 그리길 원하는 ```<canvas>``` 요소를 참조해 가져옴으로써 생성된다.
그리고, "HTMLCanvasElement.getContext()"메소드를 호출한다.

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
```

캔버스에 하고싶은 어떤것이든 하면된다. 컨텍스트 객체의 속성과 메서드를 호출함으로써 성취할 수 있다.

```javascript
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
```

### 상태에따라 이벤트 핸들러가 바뀔 수 있다.
몇 웹 API는 이벤트를 포함하지 않는다. 그러나, 대부분은 조금씩이라도 포함되어있다.
핸들러의 속성은 일반적으로 "이벤트 핸들러"부분에서 참고 자료들의 리스트에서 사용되는 사용자의 함수들을 실행할 수 있게한다.

웹 오디오 API 예를 보자

```javascript
playBtn.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (playBtn.getAttribute('class') === 'pause') {
        audioElement.play();
        playBtn.setAttribute('class', 'playing');
        playBtn.textContent = 'Pause';
    } else if (playBtn.getAttribute('class') === 'playing') {
        audioElement.pause();
        playBtn.setAttribute('class', 'paused');
        payBtn.textContent = 'Play';
    }
});
audioElement.addEventListener('ended', () => {
    playBtn.setAttribute('class', 'pause');
    playBtn.textContent = 'Play';
});
audioElement.addEventListener('ended', () => {
    playBtn.setAttribute('class', 'pause');
    playBtn.textContent = 'Play';
})
```

### 적용 시 추가적인 보안 메커니즘
웹 API의 기능은 JS 및 기타 웹 기술과 동일한 보안 사항의 적용을 받지만, 때때로 추가 보안 메커니즘이 적용된다.

예를들어, 최신 WebAPI는 HTTPs를 통해서만 페이지를 전달합니다. 
잠재적으로 민산한 데이터의 전송때문이다. 

게다가, 어떤 WebAPI는 사용자에게 가능여부 권한을 요청한다. Notification API 같은 경우, 팝업 다이얼로그 박스를 이용해, 권한을 요청한다.

Web 오디오와 "HTMLMediaElement" API는 "autoplay policy"라 불리는 보안 메커니즘이 적용된다. - 기본적으로 페이지가 로드될때, 자동재생을 할 수 없다. 
