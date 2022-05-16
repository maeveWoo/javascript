# Array
배열은 보통 리스트에 저장된 다수의 값들을 포함하고 있는 하나의 객체이다.

## 배열 만들기
```javascript
var shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
shopping;
```

다양한 데이터 유형을 배열에 저장할 수 있다.
```javascript
var sequence = [1, 1, 2, 3, 5, 8, 13];
var random = ['tree', 795, [0, 1, 2]];
```

## 배열 항목의 접근과 수정
```javascript
shopping[0];
// returns "bread"
```

배열의 항목을 수정할 수도 있다.
```javascript
shopping[0] = 'tahini';
shopping;
// shopping will now return [ "tahini", "milk", "cheese", "hummus", "noodles" ]
```

## 배열의 갯수 알아내기
```length``` 속성을 이용해, 문자열의  길이를 알아낸 것과 같은 방식으로 배열의 길이를 알아낼 수 있다.

```javascript
sequence.length;
// should return 7
```

배열을 탐색하는 반복문이다.
```javascript
var sequence = [1, 1, 2, 3, 5, 8, 13];
for (var i = 0; i < sequence.length; i++) {
  console.log(sequence[i]);
}
```

## 유용한 배열 메서드

### 문자열을 배열로, 배열을 문자열로 변환하기
- ```split()```메서드는 사용자가 원하는 매개변수로 문자열을 분리하여 배열로 표현해준다.
엄밀히 따지면 문자열 메서드진만, 배열과 함께 사용한다.
```javascript
var myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
var myArray = myData.split(',');
myArray;
myArray.length;
myArray[0]; // Manchester
myArray[1]; // London
myArray[myArray.length-1]; // Carlisle
```

- 또한 ```join()```메서드를 사용하여 배열을 다시 문자열로 만들 수 있다.
```javascript
var myNewString = myArray.join(',');
myNewString;
```

- 배열을 문자열로 변환하는 또 다른 방법은 ```toString()``` 메서드를 사용하는 것이다.
```toString```은 ```join()```과 달리 매개변수가 필요없어서 더 간단하지만, 더 많은 제한이 있다.
```toString```항상 콤마를 사용하고, ```join()```은 구분자를 지정할 수 있다.
```javascript
var dogNames = ['Rocket','Flash','Bella','Slugger'];
dogNames.toString(); //Rocket,Flash,Bella,Slugger
```

## 배열에 원소를 추가하고 제거하기
```javascript
var myArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
```
배열의 맨 끝에 원소를 추가하거나 제거하기 위해 ```push()```, ```pop()```를 사용할 수 있다.

```javascript
myArray.push('Cardiff');
myArray;
myArray.push('Bradford', 'Brighton');
myArray;
```

배열의 마지막 원소를 제거하는 방법은 ```pop()```으로 매우 간단하다.
```javascript
myArray.pop();
```

```pop()```메소드가 호출이 완료되면 제거된 원소가 리턴된다. 
```javascript
var removedItem = myArray.pop();
myArray;
removedItem;
```

- ```unshift()```, ```shift()```는 ```push()```, ```pop()```과 동일하게 동작하지만, 배열의 맨 처음 부분의 원소를 추가하거나 제거한다.

```javascript
myArray.unshift('Edinburgh');
myArray;
```
배열의 0번째에 push

```javascript
var removedItem = myArray.shift();
myArray;
removedItem;
```
배열의 0번째 pop

