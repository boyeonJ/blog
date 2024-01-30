---
date: '2024-01-18'
title: 'coding-convention'
categories: ['cleancode']
summary: '일관성 있는 코드를 위한 나만의 코딩 컨벤션'
---

# codeing convention
일관성 있는 코드로 클린한 코드를 작성하는것을 목표로 합니다.

---

# React

## FC지양하기
FC 타입보다는 props 타입 지정하기

## 


---

# 명명 규칙
## component명과 파일 명
component명은 파스칼 케이스, 파일명은 케밥 케이스

파일 이름 `post-list.jsx`
```jsx
const PostList = () => {
    ..
}

export default PostList
```

## 클래스와 인스턴스
클래스는 파스칼 케이스, 인스턴스는 카멜 케이스
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// 클래스의 인스턴스 - 카멜 케이스
const johnDoe = new Person('John Doe', 25);
```

## 메소드
카멜케이스로 작성하며 동사로 시작합니다.
```javascript
function sayHello() {
    console.log('Hello');
}
```

---
