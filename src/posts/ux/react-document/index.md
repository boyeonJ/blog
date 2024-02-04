---
date: '2024-01-20'
title: '리액트 공식 문서 정독하기(Context)'
categories: ['React', 'UX', 'Optimization']
summary: '리액트 공식 문서를 읽으며 리액트를 좀 더 잘 사용하는 방법에 대해 연구합니다.'
---

리액트 공식 문서를 좀 더 꼼꼼히 읽으며 리액트를 좀 더 잘 18.2.0 버전을 좀 더 잘 이해하려고 정리한 문서입니다.

# Context
> react- @18.2.0-APIs createContext, react- @18.2.0-Hooks useContext

context를 사용하면 **props drilling 없이** 트리 내 모든 위치의 컴포넌트에서 데이터를 사용할 수 있습니다. createContext API는 context를 만들고 제공 및 소비 할 수 있는 기능을 제공하는 API입니다. 

이를 활용하면 **불필요한 재랜더링**을 줄여 UX를 개선할 수 있습니다.

### 1. createContext API

- Parameters: 초기값
- Return:  **context object**를 반환합니다. 해당 object에는 **Provider와 Consumer 프로퍼티**가 존재합니다. 둘다 컴포넌트의 역할을 수행합니다.

**Provider**는 children component에게 context를 제공하는 역할을 합니다.
```javascript
function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```
 **Consumer**는 context를 사용하는 역할을 합니다.(useContext hook 사용하기 이전에 쓰던 방법)
```javascript
function Button() {
  // 🟡 Legacy way (not recommended)
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button className={theme} />
      )}
    </ThemeContext.Consumer>
  );
}
```

### 2. useContext Hook
```javascript
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```
createContext API를 통해 만든 context를 파라미터로 넘깁니다. 

반환값은 두가지로 나뉩니다.
1. Provider 컴포넌트 하위 컴포넌트 : Provider component 생성시 property key에 바인딩된 context value
2. Provider 컴포넌트 하위 컴포넌트가 아닐때 : createContext API 호출시 파라미터로 전달한 default context value

---