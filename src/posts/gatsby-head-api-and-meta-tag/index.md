---
date: '2024-01-19'
title: 'Gatsby Head API'
categories: ['gatsby']
summary: 'Gatsby Head API에 대해 공식 문서를 읽어보고 정리한후 적용하기'
thumbnail: '../2.png'
---

# 검색엔진을 최적화
Gatsby에서 meta tag를 통해 검색엔진을 최적화 해보려고 한다.

# Head export
Gatsby에서는 build-in Head export를 제공한다. 이는 react-helmet과 비교했을때 성능, 번들 사이즈, 사용 방법 등등 다양한 장점이 존재한다고 한다. (`gatsby@4.19.0`부터 등장)

사용방법은 component에서느 Head라는 이름의 `function`을 export 해주면 된다. 그리고 내부 내용은 일단 html의 head에서 사용하는 태그들을 그대로 사용하면 된다.

그리고 meta 데이터에 넣어줄 몇가지 정보는 siteMetadata에 넣고 query를 통해 가져올 수 있다.

# 주의할점
- Head export는 반드시 page에서만 정의할 수 있다.
- Head는 페이지가 unmount할때 지워진다. 따라서 각각의 페이지에서 export 해주어야 한다.