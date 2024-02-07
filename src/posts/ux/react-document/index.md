---
date: '2024-01-20'
title: '리액트 공식 문서 정독하기(Context, Refs)'
categories: ['React', 'UX', 'Optimization']
summary: '리액트 공식 문서를 읽으며 리액트를 좀 더 잘 사용하는 방법에 대해 연구합니다.'
---

리액트 공식 문서를 좀 더 꼼꼼히 읽으며 리액트를 좀 더 잘 18.2.0 버전을 좀 더 잘 이해하려고 정리한 문서입니다.

# Context
> react- @18.2.0-APIs createContext, react- @18.2.0-Hooks useContext

context를 사용하면 **props drilling 없이** 트리 내 모든 위치의 컴포넌트에서 데이터를 사용할 수 있습니다. createContext API는 context를 만들고 제공 및 소비 할 수 있는 기능을 제공하는 API입니다. 

이를 활용하면 **불필요한 재랜더링**을 줄여 UX를 개선할 수 있습니다.

### 1. [createContext API](https://react.dev/reference/react/createContext)

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

### 2. [useContext](https://react.dev/reference/react/useContext) Hook
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

# [Refs](https://react.dev/learn/referencing-values-with-refs)
컴포넌트내에서 재랜더링시 **데이터는 유지**되지만, 데이터 변경시 **재랜더링 트리거**가 되지 않고 싶은 데이터가 있을 수 있다. 이런 데이터는 state가 아닌 ref를 사용하면 된다.

ref값은 state와 다르게 직접 변경(**mutable 데이터**)할 수 있다. 이런 특징으로 인하여 ref를 React의 **단방향 데이터 흐름의 탈출구**라고 부르기도 합니다.

### 1. [useRef](https://react.dev/reference/react/useRef) Hook
```jsx
import { useRef } from 'react';

const ref = useRef(0);
```

ref는 useRef hook을 통해 생성할 수 있다. useRef는 아래와 같은 object를 반환한다.
```
{
  current: 0 //default 값
}
```

이러한 값은 JSX계산이 필요없는 값 저장(트리거 필요없는 값)에 사용됩니다. 예를 들어 아래와 같은 timeout ids 저장할때 많이 사용됩니다.

```jsx
function handleStart() {
  ...
  intervalRef.current = setInterval(() => {
    ...
  }, 10);
}

function handleStop() {
  clearInterval(intervalRef.current);
}
```

### 2. [DOM 조작](https://react.dev/learn/manipulating-the-dom-with-refs)(JSX ref attribute)
보통 React는 render output에 따라 dom을 자동으로 조작하기 때문에 직접 돔을 조작할 수 없다. 만약 dom 조작이 직접 필요한 경우라면 **JSX ref attribute** 사용해야 한다.

아래의 두가지를 함께 활용하면 dom을 직접 조작할 수 있다.
1. useRef hook을 통해 생성한 ref값
2. JSX 태그의 ref attribute
> div, input 등의 html 기본 JSX 태그

```jsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

### 3. [forwardRef API](https://react.dev/reference/react/forwardRef)

### 4. ref 관련 최종 정리

**Refs의 특징**은 크게 3가지로 정리할 수 있다.
1. 재랜더링시 데이터 유지
2. 변경 가능(mutable data)
3. 재랜더링 트리거 안됨

Refs는 주로 아래와 같은 **상황에서 사용**됩니다.
1. timeout ids 저장
2. dom elements 저장 및 조작
3. JSX계산이 필요없는 값 저장(트리거 필요없는 값)