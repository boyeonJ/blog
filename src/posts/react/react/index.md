---
date: '2025-10-10'
title: 'React의 진화와 성장 방향'
categories: ['React']
summary: 'React의 렌더링 방식이 어떻게 발전해왔는지, 그리고 그 변화가 웹의 성장과 어떤 관계를 맺어왔는지 살펴봅니다.'
pinned: true
---

리액트 19가 나온 기념으로 지금까지의 리액트 역사를 정리해보며 어떤 문제를 해결해왔는지 정리해보는 시간을 가져보았습니다.

## 정말 초기 React
정말 리액트 초기에는 단순한 UI 렌더링 도구였습니다. 그리고 그때는 완전한 SPA로 서버가 빈 HTML을 전달하고 브라우저가 JS 버들을 다운로드하여 CSR로 UI를 그리는 구조였습니다. 또한, 상태 변경을 하면 비효율적인 diff 계산때문에 Dom 조작 비용도 컸습니다. 

## SSR 도입
SPA 도구로 서버에서는 빈 HTML을 전달하기 때문에 아래와 같은 한계가 있었습니다.

- SEO에 분리
- TTFB/FCP 느림

따라서 이를 해결하기 위해 renderToString를 도입하여 서버에서 HTML을 문자열로 생성후 클라이언트에서 하이드레이션 하는 구조가 가능해졌습니다.

## Streaming SSR
renderToString은 여전히 여러가지 한계가 존재했습니다.

* HTML 전송 지연 (TTFB/FCP)
* 서버 부하 집중: 동기 렌더링이기 때문에 트래픽이 몰리면 서버가 쉽게 느려진다.
* 클라이언트에서 JS 로드 전까지는 상호작용 불가: 클라이언트가 하이드레이션을 해줘야 상호작용이 가능하기 때문에 JS가 다운로드·파싱·실행될 때까지 UI가 보이기만 하는 상태다.

이런 한계들을 해결하기 위해 React 16 이후부터는 renderToPipeableStream() 기반의 Streaming SSR 이 등장했습니다.

이 API를 사용하면 오래 걸리는 컴포넌트가 <Suspense> 경계로 감싸져 있을 때, 해당 컴포넌트가 로드되기 전에 HTML 전송을 먼저 시작하고 그 부분은 폴백을 먼저 전송합니다.

서버는 모든 컴포넌트를 다 렌더링할 때까지 기다리지 않고 가능한 부분부터 HTML 청크를 순차적으로 내보냅니다. 그리고 브라우저는 이를 받는 즉시 파싱하고 화면을 그릴 수 있습니다.(이 방식이 가능한 이유는 HTML5 파서가 스트림 기반의 점진적 파싱을 지원하기 때문)

```javascript
// server.js
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  let didError = false;

  const { pipe, abort } = renderToPipeableStream(
    <App />,
    {
      bootstrapScripts: ["/static/client.js"], // 클라이언트 번들 주입
      onShellReady() {
        // 최소한의 “쉘”(fallback들)이 렌더 완료되면 바로 스트리밍 시작
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.write("<!doctype html><html><body><div id='root'>");
        pipe(res); // 🚀 HTML 청크를 점진적으로 전송
      },
      onAllReady() {
        // 모든 컴포넌트 로드가 끝났을 때
        res.write("</div></body></html>");
        res.end();
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );

  // 5초 이상 걸리면 요청 취소 (타임아웃)
  setTimeout(abort, 5000);
});

app.listen(3000);
```

```jsx
import React, { Suspense } from "react";
import { fetchUser, fetchPosts } from "./api";

const UserInfo = React.lazy(() => import("./UserInfo"));
const Posts = React.lazy(() => import("./Posts"));

export default function App() {
  return (
    <div>
      <h1>Streaming SSR Example</h1>

      {/* 이 부분은 바로 렌더 가능 */}
      <Suspense fallback={<p>Loading user...</p>}>
        <UserInfo fetchUser={fetchUser} />
      </Suspense>

      {/* 아래는 오래 걸리는 컴포넌트 → fallback 먼저 전송 */}
      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts fetchPosts={fetchPosts} />
      </Suspense>
    </div>
  );
}
```

## SRC

Streaming SSR로 사용자에게 빠른 첫 화면을 제공하고 서버 부하를 줄였지만 여전히 데이터는 중복으로 존재했고 클라이언트에서 하이드레이션 비용도 남아있엇습니다.

따라서 React는 Html을 직접 전송하는 방식이 아닌 컴포넌트 트리를 전송하는 구조를 도입했습니다.

서버가 app에서 서버 컴포넌트 부분만 React flight 포맷(RSC payload)를 직렬화해서 스트리밍으로 전송합니다. 이건 HTML이 아닌 페이로드일 뿐입니다. 브라우저는 런타임에 이 페이로드를 받아 최종 UI를 그립니다.


## fiber 도입
그리고 v16부터는 Virtual DOM 구조를 Fiber 아키텍처로 재구현하여 비동기 렌더링 / 우선순위 기반 업데이트를 지원하게 되었습니다.

react는 원래 Stack Reconciler 라는 단순한 재조정 엔진을 사용했고, 이건 동기적 렌더링 방식(컴포넌트가 렌더링을 시작하면 자식이 다 그릴때까지 브라우저 제어권을 돌려주지 않음)이기 때문에 렌더링이 오래걸리면 UI가 멈춘듯이 보였습니다.

그리고 16부터 도입된 fiber는 긴 레더링 과정을 청크 단위로 처리하도록 설계되었고, 그 단위는(Work unit) react component tree의 fiber 노드 입니다. 브라우저는 해당 작업 단위를 스케줄링해서 비동기 렌더링이 가능하도록 설계하였습니다. 

그리고 실제로 18부터는 Concurrent Rendering을 도입하여 실제 비동기 렌더링을 시작하였습니다. Fiber 위에 스케줄링 계층과 우선순위 시스템(Lanes)이 추가되면서 진짜 비동기 렌더링이 가능해졌습니다.

좀 더 자세히 설명해보자면 브라우저는 main thread에서는 아래와 같은 일을 수행합니다.
1. 입력 처리: 포인터/키보드 이벤트 큐 → 리스너 실행
2. rAF(requestAnimationFrame) 콜백 실행(애니메이션 업데이트 타이밍)
3. 일반 JS 태스크(타이머/네트워크 콜백 등) 실행
4. 마이크로태스크(Promise jobs 등) 플러시
5. Style → Layout → Paint 기록 → Commit
6. Compositor 합성 → 화면에 스왑

브라우저는 위 사이클을 ~16.6ms 안에 수행하지 못하면 프레임 드랍이 발생합니다. 이러한 프레임 드랍이 발생하지 않도록 react 18의 Concurrent Rendering을 도입하였습니다. (JS는 비선접형 이기 때문에 이처럼 자주 양보해야 부드럽다.)


* [React가 DOM을 조작하는 방식(Fiber, Effect List, Lanes)](https://boyeon.vercel.app/posts/react/react-dom/)
* [프레임 드랍](https://boyeon.vercel.app/posts/browser/frame/)

---

## react의 발전과 웹의 발전 흐름 방향

처음 React가 등장했을 때는 새로고침 없는 SPA 구조를 통해 사용자 경험의 연속성을 해결하려 했습니다. 이후 CSR의 한계를 보완하기 위해 SSR이 등장했고, 단순 SSR의 속도 문제를 해결하기 위해 스트리밍 SSR이 만들어졌습니다. 이후 더 나은 사용자 경험과 성능을 위해 서버 컴포넌트(Server Components)가 도입되었습니다.

이와 같은 흐름을 단순한 라이브러리 기술적 발전을 위한 선택이였다기 보다 웹이 점점 더 복잡하고 대규모화되었기 때문에 필연적으로 요구된 결과로 볼 수 있습니다. React는 새로운 기술들은 통해 웹은 바꿔온 동시에, 웹의 확장과 복잡성이 React의 발전도 이끌어왔습니다.

---