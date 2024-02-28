---
date: '2024-02-21'
title: 'React Server Component'
categories: ['React']
summary: 'React Server Component에 대한 고찰'
---
# RSC 미리보기
RSC는 React 18부터 나온 개념으로 서버에서 렌더링되고 클라이언트로 스트리밍되는 React 컴포넌트입니다. 

이글에서는 서버에서 렌더링된다는 것의 개념과 장점, 다른 SSR과 비교되는 RSC만의 특징에 대해 알아보도록 하겠습니다. 

# html과 javascript가 dom을 처리해주는 방법
html만 본다면 굉장히 정적인 문서입니다. 이 정적인 문서를 브라우저에서 해석해서 화면을 그려줍니다. 그리고 javascript는 이 정적인 문서로 만들어진 정적인 화면을 동적으로 변경시켜줄수 있습니다.

📌 dom을 처리해주는 방법
1. html : 빠름,변경 불가능(새롭게 server 요청)
2. javascript : 느림, 변경 가능(서버 요청 x)

# 랜더링 방식의 역사
### 1. server side rendering(php)
모든 페이지를 server에서 랜더링 해주던 방식은 페이지를 이동하거나 인터렉션이 발생했을때마다 새로운 html을 받아와야 하기 때문에 깜빡임이 심하다는 단점이 존재했습니다.

### 2. client side rendering/SPA(React, Angular)
위의 단점을 해결하고자 모든 페이지를 한번에 받아와 부드러운 사용자 경험을 제공하는 방식인 SPA가 등장했습니다. 그렇지만 이 방식은 UX를 개선해주었지만 최초의 빈 html을 제공하기 때문에 SEO의 문제, first contentful paint 시간이 오래걸린다는 단점, 클라이언트와 서버 통신을 자주 하면서 발생하는 여러가지 문제들(번들 크기, 보안...) 등 다양한 이슈가 존재했습니다.

### 3. RSC/RCC
따라서 현재 react에서는 RSC/RCC의 개념을 등장시켰습니다. 이를 활용한다면 서버 측 렌더링의 장점을 유지하면서도 클라이언트 측 렌더링과의 혼합을 가능하게 하여 더 효율적인 랜더링이 가능하도록 해줄수 있습니다.

# 기존의 react 방식 
기존의 React는 위의 javascript의 특징을 활용하여 SPA가 기본이 되도록 구현되어 있었습니다. 가존 React 동작방식은 빈 html과 js파일을 넘겨주고 클라이언트에서 javascript을 실행시켜 화면을 그려주는 방식이였습니다.

📌 라우팅 방법
페이지 이동을 위해서는 client side routing을 해주는 것이 spa의 장점을 활용할수 있는 방법이다. client side routing은 일반적으로 react router라는 라이브러리를 사용한다. 만약 직접 구현하려고 한다면 Fragment(해시 라우터)를 활용하거나 history API을 활용하면 됩니다. 이들을 활용하게 되면 변경이 있더라도 서버에 새롭게 요청하지 않는다.
> https://fe-developers.kakaoent.com/2022/221124-router-without-library/

그런데 모든 컴포넌트를 javascript로 받아오는 react방식은 비효율적인 부분들이 있다.(번들 사이즈로 인한 로딩 느려짐, 보안..) 따라서 이를 해결하고자 서버에서 할 수 있는 일들을 처리해주어 클라이언트에게 부담을 덜어주는 방법인 RSC가 등장하였습니다. 

# RSC
RSC가 등장하면서 이제는 하나의 페이지가 RSC와 RCC가 혼합한 형태로 구현이 가능해졌다. react는 서버에서 직렬화 작업을 거쳐 JSON Tree를 생성한다. RSC는 서버에서 직접 dom을 해석하여 json tree를 그려주지만 RCC는 json tree를 그려주지 않고 위치만 기록한다. 그리고 이렇게 도출된 결과물은 Stream 형태로 클라이언트에게 전달된다. 클라이언트는 이 결과값과 함께 다운로드한 js bundle을 통해 남아있는 RCC의 랜더링 작업까지 마친 후 실제 화면에 보여지도록 한다. 이를 활용하여  CSR, SSR 모두 사용할 수 있게 되었다.

정리해보자면 server component는 두가지의 특징이 있다. 랜더링을 server에서 해준다는점, json tree로 그린후 클라이언트에게 Stream형태로 보낸다는점이다.

# server side rendering
RSC는 server side에서 랜더링을 해준다. server side 랜더링의 장점은 다음과 같다. 
- 로드/랜더 최적화 신경 안써도 됨
- 보안이 좋음
- cors 신경 안 써도 됨

## php와 rsc
서버에서 랜더링을 해준다는 점을 봤을때는 react server component가 php와 비슷한 방식으로 동작한다고 판단할 수 도 있다. 맞다. 이 둘의 동작 방식 중 server에서 미리 랜더링을 해서 보내준다는 점은 같다. 

하지만 react에서는 단순하게 server에서 랜더링한 html을 보내주는 것 뿐만 아니라 client api를 사용해야 하는 경우에는 client side rendering을 섞어 쓸 수 있다.

# Next.js RSC
next.js 14 버전 부터는 RSC를 활용할 수 있다. 

# Next.js 14버전 달라진점

1. React Server Component
RSC를 활용할 수 있게 되면서 getServerside, getStatic 이런 함수는 사용안하고
fetch의 캐시전략을 통해 구현할 수 있게됨

그리고 default로 RSC이고 만약 RCC를 사용하고 싶을때는 'react client'라는 direction을 사용해야 함

2. Layout
_app이랑 비슷한거

3. 스트리밍
UI단위를 점진적으로 랜더링할 수 있음.

4. Turbopack: Rust기반 Webpack 대체제

5. google font가 기본

6. Image, Link 업그레이드

# page router/app router 다른점

page 폴더가 아닌 app 폴더를 사용
page/[name]/index.js > app/[name]/page.js

app 폴더에 관해서
- 기본적으로 RSC(RCC를 사용하고 싶으면 'react client' 사용)
- 라우팅 구조가 변경
- fetch Web API를 지원하게 되면서 컴포넌트 레벨에서도 SSR 사용 가능

layout에 대해서
- 상태를 유지하면서 children만 랜더링 되기 때문에 불필요한 리랜더링 줄여줌
- 공통 ui 쉽게 공유 가능
- app directory root에는 필수로 RootLayout이라는 컴포넌트를 작성해주어야 한다.
- app/[name]/layout.js로 해당 경로의 하위 페이지에 공통 레이아웃 작성 가능
- 결론적으로 기존에 있던 _app은 RootLayout이라고 생각하면 되고 그 하위 경로들에도 쉽게 공통 상태나 ui를 공유할 수 있게 되었다는점이 다른점

# app router로 migration하는 방법

app이랑 page 모두 동시에 사용할 수 있어서 점진적으로 마이그레이션 할 수 있다.
