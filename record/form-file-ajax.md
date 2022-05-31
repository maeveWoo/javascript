# form 이미지 Ajax 전송
- TODO : Node.js simple server띄어서 테스트해보기

## HTML
```html
..
<span>이미지 체출</span>
<input type="file" name="img" id="img" accept="image/*">
<button type="button">이미지 업로드</button>
```

## JavaScript
```javascript
const uploadBtn = document.querySelector('button');
let formData = new FormData();
const imgInput = document.querySelector('#img');

function uploadAjax() {
    formData.append("img", imgInput.files[0]);
    
    $.ajax({
        type: "post",
        url: "/file-upload",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function () {
            applyBtn.setAttribute('disabled', 'true');
        },
        success: function (data) {
            alert("Success!");
        },
        error: function (data) {
            alert("Failed!");
        }
    });
}

uploadBtn.addEventListener('click', () => {
    uploadAjax();
});
```

---

## 참고자료
1. [FormData 연구](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
2. [HTTP Post요청 구성 파기](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST)
3. [잘정리한 블로그](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST) 
