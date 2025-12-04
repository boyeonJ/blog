---
date: '2025-12-04'  
title: '브라우저 성능 측정 흐름과 핵심 지표 이해'  
categories: ['Browser', 'Optimization']
summary: '브라우저 개발자 도구를 활용해 네트워크·렌더링 시점을 구조적으로 분석하는 방법을 정리했습니다.'  
pinned: false
---

브라우저 개발자 도구의 Network와 Lighthouse를 활용하면 브라우저 성능 지표와 관련된 다양한 정보를 확인할 수 있습니다. 이를 통해 실제 화면이 언제, 어떤 순서로 그려지는지 분석할 수 있으며 **성능 개선 지점**을 찾는 데 큰 도움이 됩니다.

---
## 로드의 시작과 DOM 트리 완성

Network 탭에서는 각 리소스가 언제 요청되고, 언제 응답이 완료되었는지 확인할 수 있습니다. 어떤 리소스가 먼저 **로드 시작되고 끝나**는지 순서를 파악할 수 있고, 전체 페이지 로딩 흐름을 직관적으로 볼 수 있습니다.  

하단에는 DOMContentLoaded와 Load 이벤트 발생 시점이 표시됩니다 DOMContentLoaded는 HTML 파싱과 JS 다운로드가 완료되어 **DOM 트리를 완성**했을 때 실행됩니다. 그리고 Load 이벤트는 모든 리소스가 다운로드 및 실행을 끝내면 Load 이벤트가 발생합니다.

<img width="753" height="388" alt="스크린샷 2025-12-04 오후 9 36 35" src="https://github.com/user-attachments/assets/5295d6d6-275e-4e02-987c-eb06c3c83470" />



## 레이아웃과 페인트, FCP/LCP
DOM 트리가 생성되면 CSSOM과 결합해 렌더 트리를 만들고, 이후 레이아웃과 페인트 과정이 이어집니다. 이 페인트 단계에서 **FCP, LCP**가 측정됩니다. 

<img width="599" height="227" alt="스크린샷 2025-12-04 오후 9 36 56" src="https://github.com/user-attachments/assets/ab126e72-f3b7-4b57-8dbd-fd7f196068f9" />


## 마무리
전체적인 브라우저 랜더 과정은 아래와 같습니다.

<img width="704" height="658" alt="스크린샷 2025-12-04 오후 9 44 57" src="https://github.com/user-attachments/assets/5a7321b0-5760-40cc-a96e-3a8c071ba79a" />


이러한 렌더링 흐름을 단계별로 확인하면 어느 구간에서 지연이 발생하는지 더 명확하게 파악할 수 있고, 실질적인 성능 개선 방향을 찾는 데 매우 도움이 됩니다.
