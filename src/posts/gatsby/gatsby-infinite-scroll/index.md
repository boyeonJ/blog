---
date: '2024-01-20'
title: 'Gatsby Infinite Scroll 구현하기'
categories: ['Gatsby', 'Optimization','Private']
summary: 'Infinite Scroll 구현하면서 발생한 여러가지 이슈들에 대해 기록하였습니다.'
---

인피니트 스크롤을 구현할때 `브라우저의 Web API`중 IntersectionObserver을 사용하였습니다. Gatsby는 SSR이기 때문에 build될때 환경이 `nginx`이기 때문에 해당 api를 사용할 수 없어 IntersectionObserver is not defined이라는 Referrence Error가 발생합니다. 

이는 랜더링시 실행되는 useEffect 내부로 코드를 옮겨 해결할 수 있습니다.

![IntersectionObserver reference error capture](./asstes/intersectionObserver_error.png)

