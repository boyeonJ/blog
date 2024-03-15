---
date: '2024-01-18'
title: 'Gatsby config 파일과 Buil-in React Components'
categories: ['Gatsby']
summary: 'Gatsby에서 추가적인 기능 사용할 수 있는 Buil-in React Components와 config 파일에 대해 정리하였습니다. '
---

Gatsby로 블로그를 개발하며 여러가지 Gatsby만의 **추가기능을 사용하는 방법**에 알게되었습니다. 추가기능을 사용하는 방법으로는 Buil-in React Components와 config 파일이 있습니다.

# Buil-in React Components
Gatsby에서는 Buil-in React Component를 제공하여 다양한 최적화 기법을 쉽게 활용할 수 있도록 해줍니다.
1. Link
2. Script 
3. Head
4. Image plugin
5. Slice

# config 파일
그리고 추가적인 기능을 사용할 수 있도록 다양한 **config 파일**이 존재하고 그 내부에서 사용하는 api들이 각각 다릅니다. 

#### 1️. gatsby-config.js
주로 사이트의 metadata, plugins를 관리하는데 사용됩니다. 

#### 2️. gatsby-node.js
Gatsby Node API들을 사용할 수 있는 config 파일입니다. build 과정에서 한번만 실행됩니다. 주로 page를 동적으로 생성하거나 GraphQL에 데이터를 추가할때 사용합니다.

#### 3.  gatsby-ssr.js 
Gatsby SSR API들을 사용할 수 있는 config 파일입니다. SSR API들을 통해 SSR로 만들어진 static한 HTML 파일을 수정할 수 있습니다. 
```
// SSR API
onPreRenderHTML, onRenderBody, replaceRenderer, wrapPageElement, wrapRootElement
```

#### 4️. gatsby-browser.jsx
Gatsby Browser API들을 사용할 수 있는 config 파일입니다. 이 API들은 cliend-side와 인터렉션 할수 있는 다양한 option을 제공해줍니다. 그렇기 때문에 brower에서 제공하는 기능들을 사용할 수 있습니다. 
```
// Browser API
onClientEntry, onPrefetchPathname, onServiceWorkerActive, replaceHydrationFunction, wrapPageElement, wrapRootElement..
```

# wrapRootElement와 wrapPageElement
gatsby-ssr.js/gatsby-browser.jsx config 파일에서 사용하는 API중 실제 블로그를 개발하며 유용하게 사용했던 API인 wrapRootElement, wrapPageElement에 대해 좀 더 자세히 살펴보겠습니다.

wrapRootElement, wrapPageElement API는 비슷한 기능을 제공하는 API입니다. 그렇지만 이들은 사용하는 시점이 다릅니다. 

#### 1️. wrapRootElement
wrapRootElement는 **앱의 루트 요소**를 감싸기 위한 함수입니다. **앱이 로드될 때 한 번** 실행됩니다. 이 함수는 주로 전역적인 컨텍스트 제공이나 앱의 초기 설정에 사용됩니다.

#### 2. wrapPageElement
각 **페이지의 루트 요소**를 감싸기 위한 함수입니다. 이 API로 export한 component는 페이지 **이동시에도 unmounted** 되지 않습니다. 페이지 전환 간에 상태를 유지하거나 특정 페이지에만 효과를 주고 싶을 때 사용될 수 있습니다.

![warpPage-and-wrapElemet](./assets/warpPage-and-wrapElemet-api-light.png)

> 이 API들은 Gatsby의 SSR, CSR API에서 모두 제공하는 API입니다. 따라서 SSR 랜더링한 결과와 하이드레이션 한 결과가 같으려면 반드시 gatsby-ssr.js, gatsby-browser.jsx 내부에 wrapRootElement와 wrapPageElement API들을 동일하게 작성해주어야 합니다. 