---
date: '2024-02-21'
title: 'React Server Component'
categories: ['React']
summary: 'React Server Component에 대한 고찰'
---

# html과 javascript가 dom을 처리해주는 방법
html만 본다면 굉장히 정적인 문서이다. 이 정적인 문서를 브라우저에서 해석해서 화면을 그려준다. 그리고 javascript는 이 정적인 문서로 만들어진 정적인 화면을 동적으로 변경시켜줄수 있다.

📌 dom을 처리해주는 방법
1. html : 빠름,변경 불가능(새롭게 server 요청)
2. javascript : 느림, 변경 가능(서버 요청 x)

# 기존의 react 방식

따라서 react에서 빈 html을 넘겨주고 js만을 넘겨주더라도 javascript을 실행시켜 화면을 그려줄 수 있다. 심지어 페이지 이동이 있는 부분의 소스까지 미리 js로 다운받기 때문에 페이지 이동시에도 html을 받아오는게 아니라 js를 실행시켜 dom을 처리해준다.

그런데 모든 컴포넌트를 javascript로 받아오는 react방식은 비효율적인 부분들이 있다.(번들 사이즈로 인한 로딩 느려짐, 보안..) 따라서 이를 해결하고자 최초에는 서버에서 할 수 있는 일들을 처리해주어 클라이언트에게 부담을 덜어주는 방법인 RSC이 등장하였다. 

# RSC
RSC가 등장하면서 이제는 하나의 페이지가 RSC와 RCC가 혼합한 형태로 구현이 가능해졌다. react는 서버에서 직렬화 작업을 거쳐 JSON Tree를 생성한다. RSC는 서버에서 직접 dom을 해석하여 json tree를 그려주지만 RCC는 json tree를 그려주지 않고 위치만 기록한다. 그리고 이렇게 도출된 결과물은 Stream 형태로 클라이언트에게 전달된다. 클라이언트는 이 결과값과 함께 다운로드한 js bundle을 통해 남아있는 RCC의 랜더링 작업까지 마친 후 실제 화면에 보여지도록 한다. 기존의 react는 CSR이 방식을 사용하였다면 이제는 react도 next.js처럼 CSR, SSR 모두 사용할 수 있게 되었다.