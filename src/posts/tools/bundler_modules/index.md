---
date: '2025-10-03'
title: '모듈과 번들러, 그리고 빌드 도구의 역사'
categories: ['JavaScript', 'Tooling']
summary: '프론트엔드 개발은 왜 모듈과 빌드 도구를 필요로 했을까? 문제와 해결의 흐름을 따라가며 지금의 빌드 시스템을 이해합니다.'
pinned: true
---


단순히 코드를 작성하다가 문득, 당연하게 사용해왔던 webpack, esbuild, vite와 같은 번들러, 그리고 모듈 시스템의 역사가 궁금해졌습니다. 이들이 어떤 문제를 해결하기 위해 등장했는지, 기술 발전의 흐름을 정리해보았습니다.

---

## Script 태그 시절

웹 초창기에는 단순히 <script src="a.js"></script>를 여러 개 나열하는 방식이 일반적이었습니다.

* 순서가 꼬이면 에러 발생 (예: a.js에서 정의한 함수를 b.js에서 먼저 호출)
* 전역 변수 충돌 (모든 JS가 window에 올라옴)
* 파일 수가 많아지면 HTTP/1.1 요청이 폭증 → 로딩 속도 저하

규모가 커질수록 유지 관리가 사실상 불가능해졌습니다.

---

## 모듈 시스템의 등장

이런 문제를 해결하기 위해 **모듈 시스템**이 등장했습니다. 처음에는 라이브러리 형태로 제안되었고, 이후 표준에 포함되었습니다.

* CommonJS (2009, Node.js)

  ```js
  const lib = require('lib');
  ```

  동기 로딩 기반. Node.js는 로컬 디스크에서 읽으므로 빠르지만, 브라우저에서는 네트워크 요청 때문에 비효율적이었습니다. 또한 런타임에 모듈이 결정되므로 트리 쉐이킹 같은 최적화가 불가능했습니다.

* AMD (2009, RequireJS)

  ```js
  define(['dep'], function(dep) { ... });
  ```

  브라우저 전용 비동기 로딩 방식을 지원했지만 문법이 장황하고 사용성이 좋지 않았습니다.

* ESM (2015, ES6)

  ```js
  import lib from './lib.js';
  ```

  파일 최상단에 import/export가 강제되며 정적 분석이 가능해졌습니다.
  → 빌드 시점에 어떤 모듈이 필요한지 알 수 있어 Tree-shaking, Code splitting 같은 최적화가 가능해졌습니다.

---

## 번들러의 필요성

브라우저가 ESM을 본격적으로 지원하기 전까지는 여전히 여러 스크립트를 하나로 묶어 제공해야 했습니다. 이 과정에서 **번들러**가 등장했습니다.

### 번들러가 등장한 배경

1. 호환성 문제: 브라우저는 ESM을 늦게 지원했기 때문에, 모듈 문법을 그대로 쓸 수 없었습니다. → 미리 변환해야 했습니다.
2. 성능 최적화: 파일이 늘어나면 네트워크 요청 수가 많아졌고, HTTP/1.1 환경에서는 병렬 요청 개수가 제한적이었습니다. → 여러 파일을 하나로 합쳐야 했습니다.
3. 자산 관리: JS뿐 아니라 CSS, 이미지, 폰트 등도 프로젝트 구성 요소가 되었는데, 이들을 체계적으로 불러오려면 통합된 관리 방식이 필요했습니다.

즉, 번들러란?
의존성 그래프를 기반으로 모듈을 하나(혹은 여러 개)로 묶고, 최적화하여 브라우저에서 실행 가능하게 만드는 도구입니다.

### 번들러 종류
* Browserify (2011): CommonJS 모듈을 브라우저에서도 사용할 수 있게 해주는 도구. 하지만 JS만 다루고, CSS나 이미지 같은 자산은 지원하지 않았습니다.
* RequireJS (2009): AMD 기반 모듈 로더. 번들링보다는 런타임 로딩 중심이었기 때문에 한계가 있었습니다.
* Webpack (2014): JS뿐 아니라 CSS, 이미지, JSON까지 모듈처럼 다루고, 빌드 시점에 최적화까지 지원. SPA 시대(React, Angular, Vue 확산기)와 맞물려 트랜스파일, 코드 스플리팅, HMR, 캐싱 전략 등을 단일 파이프라인으로 해결하였습니다.

---

## 빌드 도구 등장

2014~2016년 즈음, SPA 프레임워크(React, Angular, Vue)와 함께 앱이 커지면서 “빌드 과정”의 범위가 확 커졌습니다.

**빌드란?** 사람이 작성한 소스코드(개발용)를 → 실행 환경(브라우저/서버)에 적합한 형태로 가공하는 과정. 개발자가 쓰기 편한 코드와 머신이 실행하기 좋은 코드 사이의 갭을 메꾸는 작업입니다.

* 트랜스파일: JSX, TypeScript → 브라우저용 JS 변환 (Babel)
* 번들링(Bundling): 수많은 모듈을 합쳐 실행 가능하게 묶음
* 자산 관리: CSS, SCSS, 이미지, 폰트까지 JS처럼 다루기 시작 (Webpack 로더)
* 최적화: Tree-shaking(안 쓰는 코드 제거), 코드 스플리팅(필요한 코드만 로딩), 압축(파일 크기 최소화), 해시 캐싱
* 환경 주입: dev/prod 모드별 분기

즉, 빌드 = 단순한 번들링이 아니라, 개발자가 쓴 코드를 실행 가능한 최적의 산출물로 만드는 과정으로 확장됐습니다. 이 시점부터 Webpack 같은 툴은 단순 번들러가 아니라 사실상 **빌드 도구**로 불리게 되었습니다.

---

## Webpack의 역사

### v1 (2014~2016)

* Loader 체계 도입 (file-loader, css-loader 등)
* CommonsChunkPlugin → 공통 코드 분리
* 캐싱 해시 ([hash], [chunkhash])
* 코드 스플리팅, HMR(핫 리로드) 정착

### v2~v3 (2017)

* ESM 지원
* Dynamic import → 코드 스플리팅 표준화
* 청크 네이밍 주석 (/* webpackChunkName: "charts" */)
* Tree-shaking 도입 (정적 분석 기반)
* ModuleConcatenationPlugin(스코프 호이스팅) → 실행/파싱 비용 절감

### v4 (2018)

* mode 옵션 (production, development) 도입 → 최적화 기본값 자동화
* SplitChunksPlugin → vendor/공통 청크 분리 표준화
* mini-css-extract-plugin → CSS를 별도 파일로 추출, [contenthash] 기반 장기 캐싱 강화
* TerserPlugin → JS 압축 기본화(Uglify 대체)
* Prefetch/Preload magic comments → 네트워크 힌트 제공

### v5 (2020~현재)

* Asset Modules → file/url-loader 대체 (인라인 vs 파일 자동 분리)
* Deterministic IDs & real [contenthash] → 장기 캐싱 품질 개선
* Persistent caching (파일시스템 캐시) → 리빌드 속도 대폭 향상
* Tree-shaking 고도화 (sideEffects 플래그 활용)
* Module Federation → 마이크로 프론트엔드 런타임 통합
* Node polyfill 자동 제거 → 브라우저 번들 크기 감소
* css-minimizer-webpack-plugin → CSS 최적화 표준화

웹팩은 이러한 흐름을 거치며 발전해왔습니다. 단순히 여러 파일을 하나로 묶는 번들러를 넘어, 로더를 통해 자바스크립트 외의 다양한 자산을 모듈로 관리할 수 있게 되었고, 플러그인을 통해 번들 생성 과정 자체를 확장할 수 있게 되었습니다. 또한 코드 스플리팅, 트리 쉐이킹, 압축과 같은 최적화 기법을 도입해 번들 크기와 로딩 성능을 개선했으며, 개발 환경과 운영 환경에 따라 서로 다른 기본 동작과 기능을 제공하도록 진화했습니다.

---

## 현대적인 Webpack 옵션

### 로더와 플러그인
1. [babel-loader](https://webpack.kr/loaders/babel-loader/)
- 최신 JS / JSX / TS를 브라우저 호환 코드로 변환
```js
module: {
  rules: [
    {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          targets: "defaults",
          presets: [
            ['@babel/preset-env']
          ]
        }
      }
    }
  ]
}
```

2. css-loader / style-loader
- [css-loader](https://webpack.js.org/loaders/css-loader/): CSS를 JS 모듈로 변환
- [style-loader](https://webpack.js.org/loaders/style-loader/): <style> 태그로 주입 (개발 환경)

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

3. [MiniCssExtractPlugin.loader](https://webpack.js.org/plugins/mini-css-extract-plugin/)
- 운영 환경에서 CSS를 별도 파일로 분리
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

4. [asset modules (Webpack 5)](https://webpack.js.org/guides/asset-modules/)
- file-loader / url-loader 대체
- 이미지, 폰트 자동 처리
```js
module.exports = {
  module: {
   rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
+       type: 'javascript/auto'
      },
   ]
  },
}
```

5. [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- HTML 파일 생성
- 번들 자동 주입
```js
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

### 최적화 방법

1. [코드 스플리팅 (Chunk 분리)](https://webpack.js.org/guides/code-splitting/)
- 언제 무엇을 로드 할지 제어
3. [splitChunks (공통 코드 분리)](https://webpack.js.org/plugins/split-chunks-plugin/)
- entry 간 중복 제거
- vendor 분리
- 캐싱 최적화
3. [트리 쉐이킹 (Tree Shaking)](https://webpack.js.org/guides/tree-shaking/)
- 청크 내부에서 안 쓰는 코드 제거
- ES Module, production mode, sideEffects 정보가 필요하다는 조건이 있음
4. [contenthash 기반 캐싱](https://webpack.js.org/guides/caching/)
- 변경된 파일만 재다운로드
- 장기 캐싱 가능
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
-       title: 'Output Management',
+       title: 'Caching',
    }),
  ],
  output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
```

### [mode에 따라 Webpack이 제공하는 것들](bpack.js.org/configuration/mode/)
1. development mode
- 빠른 빌드
- 디버깅 친화적
- minify 안하기
3. production mode
- tree shaking
- minify (Terser)
- scope hoisting
- dead code elimination

---

## Vite의 등장

Webpack은 강력했지만 무겁고 설정이 복잡했습니다.
→ Vite는 새로운 접근을 택했습니다.

* ESM 기반 Dev Server: 개발 중에는 번들 없이 브라우저가 모듈을 직접 로드
* On-demand Transform: 브라우저가 요청한 모듈만 TS/JSX 변환 → 시작 속도 빠름
* 프로덕션 빌드: Rollup 기반 빌드 → 트리 쉐이킹 및 코드 분할 최적화

---

## esbuild

* Go 네이티브 성능과 병렬 처리 활용 → JS 기반 툴보다 수십~수백 배 빠른 속도
* 다만 자체 최적화는 단순 → Vite는 **개발 서버 변환기**로 esbuild 활용, 배포 빌드는 Rollup 담당

---

## 최근 빌드 도구 조합과 트렌드

오늘날 프론트엔드 빌드 환경은 **하나의 툴**에 올인하지 않고, 장점을 조합하는 방식으로 진화하고 있습니다.

### 개발 서버 (Dev)
  * Vite + esbuild
  * esbuild가 TS/JSX를 초고속으로 변환 → 즉각적인 HMR
  * 브라우저가 직접 ESM 모듈을 해석하므로 초기 구동이 가볍습니다.

### 프로덕션 빌드 (Prod)
  * Rollup
  * Tree-shaking, Code Splitting, Dynamic Import 최적화에 강점
  * 라이브러리/패키지 배포용 번들에도 표준처럼 쓰입니다.

### 대규모 서비스 / 모노레포
  * Turbopack (Webpack 팀이 Rust로 새롭게 만든 빌더)
  * Webpack과 호환성을 유지하면서도 속도를 극적으로 개선
  * Next.js 13+에서 기본 제공 → React + SSR/SSG/ISR 환경까지 처리

---

## 트렌드
### Rust/Go 기반 빌드 도구 부상
  * esbuild(Go), Turbopack(Rust), rspack(Rust) 등
  * JS 툴체인의 병목을 네이티브 언어로 재작성해 속도 개선

### Unbundled Development
  * 개발 중에는 “번들링 없이” ESM 모듈을 직접 제공
  * Vite, Snowpack 같은 접근이 주도

### Micro-Frontend & Federation
  * Webpack Module Federation, rspack, Turbopack 등
  * 여러 팀이 독립적으로 빌드한 코드를 런타임에서 합치는 아키텍처

### Fullstack Integration
  * Next.js, Remix, SvelteKit → 프론트/백엔드/빌드가 통합된 메타프레임워크
  * 빌드 도구는 더 이상 “단순히 번들”이 아니라 앱 생애주기를 총괄--- 

---

## 마무리

저는 단순히 “가장 많이 쓰이고 최신이니까 쓴다”라는 접근을 좋아하지 않습니다.
기술은 언제나 어떤 문제를 해결하기 위해 등장했는가에서 출발합니다.
이 과정을 따라가다 보면 현재 기술의 위치를 이해할 수 있고, 새로운 기술이 등장했을 때도 평가 기준이 생깁니다.

지금까지 이렇게 정리를 해보니 아래의 흐름으로 발전해왔다는 것을 느꼈습니다.

1. 앱이 커졌다 → 관리 불가능 → 모듈 필요
2. 파일이 많아졌다 → 네트워크 병목 → 번들러 필요
3. SPA와 DX 요구 폭발 → 빌드 도구 필요
4. 속도와 생산성 한계 → 네이티브 빌드/언번들링 필요

프론트엔드가 점점 덩치가 커지고, 앱 규모가 커지니까 자연스럽게 “어떻게 더 빠르게 빌드하지?” “어떻게 더 효율적으로 관리하지?” “개발자가 덜 고생하게 하려면 뭘 바꿔야 하지?” 이런 고민들이 기술 발전의 방향이 되어 온 것 같습니다. 


---
