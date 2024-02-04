---
date: '2024-01-18'
title: 'coding-convention'
categories: ['DX']
summary: '일관성 있는 코드를 위한 나만의 코딩 컨벤션'
---

일관성 있는 코드로 클린한 코드를 작성하는것을 목표로 합니다.

---

# Loading 속도 줄이기

## ✔️ webpack
- 파일 용량 줄이기 : Code Splitting
- 파일 수 줄이기 : 번들링
- 이미지 스프라이트 이미지
- 압축: 파일 용량 줄이기(공백/개행 지우기, 세미콜론 지우기)

## ✔️ 지연시키기
- link preload, preconnect, prefetch
- 이미지 지연: picture, img lazy
- style은 상단, js는 하단 

## ✔️ 기타
- 파일 캐싱
- CDN 사용
- 라이브러리 의존도 낮추기
- 헤더에 만료기한 넣기

## ✔️ 내가 실천할 수 있는것
- webpack 설정해주기
- React suspense
- Next.js Image, Gatsby Image
- Gatsby Link, Next.js Link
- preloading, prefetch

---

# Rendering 속도 줄이기

## ✔️ dom의 일 줄여주기
- 불필요한 dom tree 줄이기
- 복잡한 셀렉터 사용 금지

## ✔️ 리플로우, 리페인트(Reflow/Repaint)를 고려한 스타일 작성
- 리플로우 변경 최대한 적게주기
- 애니메이션은 transform으로

## ✔️ 내가 실천할 수 있는것
- 불필요한 태그 사용 줄이기(의미없는 div 사용 금지)
- 복잡한 셀렉터 사용 금지

---

# seo 최적화
- sementic tag
- site map 제출
- robot.txt 제출
- CSR < SSR

---

# lighthouse

## ✔️ Cumulative Layout Shift(CLS)
- 크기가 정해지지 않은 이미지, 영상, 광고, iframe 등의 요소에 width, height 정해주기
- FOIT/ FOUT 를 유발하는 웹폰트 줄이기
- 동적 콘텐츠에는 스켈레톤 UI 추가하기

---

# React

## FC지양하기
FC 타입보다는 props 타입 지정하기
```typescript
type listProps = {
  category: string,
  title: string,
  content: string
}

//FC
const List : FC<listProps> = ({
  category,
  title,
  content
}) => {
  ...
}

//props에 type 지정
const List = ({
  category,
  title,
  content
}: listProps) => {
  ...
}
```

## 

---

# Typescript

## 객체 key는 Index Signature 활용하기
```typescript
const obj: { [key:string] : string | number } = {
  name: "보연",
  age: 28
}
```

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
