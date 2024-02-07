---
date: '2024-01-18'
title: '일관성 있는 코드를 위해 내가 지키고 싶은 것들(Coding Convention)'
categories: ['Optimization', 'UX','DX', 'Typescript']
summary: '일관성 있는 코드를 위한 나만의 코딩 컨벤션'
---

일관성 있는 코드로 클린한 코드를 작성하는것을 목표로 합니다.

---

# 명명 규칙
## Component/File Name
Component명은 파스칼 케이스, File명은 케밥 케이스

> 파일 이름 post-list.jsx
```jsx
const PostList = () => {
    ..
}

export default PostList
```

## Class/Instance Name
Class는 파스칼 케이스, Instance는 카멜 케이스
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

## Method
카멜케이스로 작성하며 동사로 시작합니다.
```javascript
function sayHello() {
    console.log('Hello');
}
```

---

# Typescript
## 객체 key는 Index Signature 활용하기
```typescript
const obj: { [key:string] : string | number } = {
  name: "보연",
  age: 28
}
```

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

---

# 최적화

## seo 최적화
- sementic tag
- site map 제출
- robot.txt 제출
- CSR < SSR

## Cumulative Layout Shift(CLS)
- 크기가 정해지지 않은 이미지, 영상, 광고, iframe 등의 요소에 width, height 정해주기
- FOIT/ FOUT 를 유발하는 웹폰트 줄이기
- 동적 콘텐츠에는 스켈레톤 UI 추가하기(React suspense)

## webpack
- 파일 용량 줄이기 : Code Splitting
- 파일 수 줄이기 : 번들링
- 압축: 파일 용량 줄이기(공백/개행 지우기, 세미콜론 지우기)

## 지연시키기
- link preload, preconnect, prefetch(Next.js Link, Gatsby Link API)
- 이미지 지연: picture, img lazy(Next.js Image, Gatsby Link Image)
- style은 상단, js는 하단 

## 기타
- 파일 캐싱
- CDN 사용
- 라이브러리 의존도 낮추기
- 헤더에 만료기한 넣기

## dom의 일 줄여주기
- 불필요한 dom tree 줄이기
- 복잡한 셀렉터 사용 금지

> DOM이 크면 메모리 사용량이 늘어나고 스타일 계산 시간이 길어지며 비용이 많이 드는 레이아웃 리플로우가 발생합니다.

## 리플로우, 리페인트(Reflow/Repaint)를 고려한 스타일 작성
- 리플로우 변경 최대한 적게주기
- 애니메이션은 transform으로

