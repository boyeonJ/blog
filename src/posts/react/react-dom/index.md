---
date: '2025-10-05'
title: 'React가 DOM을 조작하는 방식(Fiber, Effect List, Lanes)'
categories: ['React']
summary: '수동 DOM 조작과 비교해 React가 어떻게 효율적으로 동기화하는지 자세히 알아봅니다.'
pinned: true
---

최근 바닐라 JS로 DOM을 직접 만지며 프로젝트를 해보니, React가 구체적으로 어떻게 DOM을 덜 건드리면서도 정확히 업데이트하는지 더 궁금해졌습니다. 

---

## React는 상태 기반 선언형 UI

- 상태(state) 가 바뀌면 어떤 DOM이 되어야 하는지를 선언합니다.  
- 직접 DOM을 조작하기보다, React가 내부에서 차이(diff) 를 계산해 필요한 최소 DOM 작업만 수행합니다.

### 언제 재렌더 되나?
- props 변경
- state 변경
- context 변경
- 부모가 렌더될 때(자식도 다시 호출될 수 있음)

> 재렌더는 메모리 상의 가상 트리(Fiber) 계산을 뜻함입니다.  
> 재렌더가 일어나도, 실제 브라우저 DOM이 즉시 바뀌는 건 아닙니다.


### Render 단계 (메모리 상 계산)
- 새 입력(props/state/context)을 바탕으로 새 Fiber 트리를 만듭니다.
- 이전 Fiber 트리와 비교(reconcile) 해서 무엇이 바뀌었는지를 기록합니다.
- DOM은 건드리지 않음. 할 일 목록(Effect List)만 만듭니다.

### Commit 단계 (실제 DOM 조작)
- Render 단계에서 만든 Effect List를 한 번에 순회하며
  - 노드 삽입/삭제/속성 변경
  - ref attach/detach
  - useLayoutEffect/useEffect 실행
  를 수행합니다.
- 이 단계에서 **브라우저의 스타일/레이아웃/페인트/합성** 파이프라인을 실행합니다.

---

## Fiber: 연결 리스트로 구성된 작업 단위

```ts
//Fiber 타입 간단한 예시 
type Fiber = {
  type: any;             // 함수 컴포넌트, 클래스, 'div' 같은 host 태그 등
  pendingProps: any;     // 새 props
  memoizedProps: any;    // 이전 props(메모)
  child: Fiber | null;   // 첫 자식
  sibling: Fiber | null; // 형제
  return: Fiber | null;  // 부모
  stateNode: any;        // 실제 DOM 노드 or 클래스 인스턴스
  flags: number;         // 이 Fiber에서 해야 할 일(비트 플래그)
};
````

Render 단계에서는 beginWork() 로 내려가며 자식을 만들고, completeWork() 로 올라오며 사이드이펙트(= 커밋 시 할 일)를 기록합니다. 이때 기록이 바로 Effect List로 연결됩니다.

---

## Reconcile: 무엇이 바뀌었는가를 계산 (Render Phase 중 diff 수행)

```ts
function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    // 텍스트 노드
    return placeSingleChild(createFiberFromText(newChild));
  }

  if (typeof newChild === 'object' && newChild) {
    if (newChild.$$typeof === REACT_ELEMENT_TYPE) {
      // key/type 기준으로 기존 Fiber와 매칭
      return placeSingleChild(
        reconcileSingleElement(returnFiber, currentFirstChild, newChild)
      );
    }
  }

  // 배열이면 key 매칭하며 순회
  return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
}
```

* key와 type 이 같으면 Fiber 재사용 → props/state만 갱신
* 다르면 새로 만들거나(Placement), 제거(Deletion), 내용 갱신(Update) 으로 효과를 남깁니다.

---

## Effect List와 비트 플래그

각 Fiber는 flags라는 정수에 해야 할 일을 **비트 단위**로 담습니다.

```ts
export const Placement = 0b0000000000010; // 삽입
export const Update    = 0b0000000000100; // 속성/텍스트 변경
export const Deletion  = 0b0000000001000; // 제거
export const Passive   = 0b0001000000000; // useEffect
export const Layout    = 0b0010000000000; // useLayoutEffect
```
비트 단위로 관리함으로써 얻을 수 있는 장점은 

* 여러 상태를 정수 한 개에 압축 가능
* 검사도 O(1) 로 매우 빠름 (if (flags & Update) { ... })
* 메모리 절약(여러 boolean 대신 32/64비트 한 개)
* CPU 친화적(비트연산 하드웨어가 빠름)

Commit 단계에서는 Effect List(연결 리스트) 를 따라 내려가며 Placement/Update/Deletion/… 을 실행합니다. 이 리스트는 Render 단계에서 이미 순서/의존성이 정리되어 있어, Commit은 짧고 빠르게 끝낼 수 있습니다.

---

## Lanes: 비트마스크 기반 우선순위 시스템

React 18의 Lanes는 업데이트 우선순위를 비트마스크로 표현합니다.

```ts
export const SyncLane               = 0b...0001;   // 즉시(클릭 등)
export const InputContinuousLane    = 0b...0100;   // 스크롤/드래그
export const DefaultLane            = 0b...10000;  // 일반 setState
export const TransitionLane1        = 0b..1000000; // startTransition
```

* 여러 업데이트는 OR 로 묶여 한 번에 표현 가능: lanes = SyncLane | DefaultLane
* 스케줄러는 가장 높은 우선순위부터 처리하고, 덜 급한 건 뒤로 미룸
* 중단 가능한 Render(Concurrent)에서, 무거운 Transition 처리 중에도 급한 입력(Sync) 이 오면 선점(preemption) 해서 먼저 Commit

사용자가 클릭하거나 입력하는 것처럼 체감 비용이 큰 동작은 우선적으로 처리하고, 화면 갱신은 그 뒤에 자연스럽고 부드럽게 이어져 전체적인 반응성이 유지됩니다.

---

## SyntheticEvent: 루트 단일 리스너 + 위임(dispatch)

* React는 브라우저 이벤트를 루트에 한 번만 등록하고(캡처/버블 체인),
  발생한 이벤트를 Fiber 트리를 따라 위임(dispatch) 합니다.
* DOM에 리스너를 무한히 붙이지 않고 JS 레벨에서 분배하기 때문에
  메모리/리스너 관리 비용을 줄이고, 일관된 교차 브라우저 처리가 가능합니다.

---


## 바닐라 DOM 조작과의 대비
실제 바닐라 JS로 DOM을 직접 조작하면서 프로젝트를 진행해보니, 변경 범위나 순서를 개발자가 일일이 관리해야 해서 신경 쓸 부분이 정말 많았습니다. 조금만 순서가 꼬이거나 연산이 많아져도 바로 레이아웃 스래싱이나 과도한 페인트로 이어질 수 있겠다는 생각이 들었습니다.

React는 Fiber, Effect List, Lanes 같은 구조를 통해 어디를 언제, 어떻게 바꿀지를 엔진이 스스로 최적화해줍니다. 개발자는 **무엇을 보여줄지에만 집중**할 수 있었고, 내부적으로 일어나는 렌더링 최적화나 업데이트 타이밍은 React가 알아서 잘 처리해준다는 느낌을 받았습니다.

그렇지만 이런 추상화 덕분에 개발이 훨씬 편하다는 장점이 있는 동시에, 내부 동작을 완전히 이해하기 어렵고, 예기치 않은 리렌더나 성능 이슈가 생겼을 때 **원인을 추적하기가 훨씬 까다롭습니다.** 그래서 React의 장점을 제대로 활용하려면, 내부 구조(Fiber나 Scheduler)가 어떤 식으로 동작하는지 기본적인 이해는 꼭 필요하다는 걸 느꼈습니다.
