---
date: '2024-02-28'
title: 'Next.js app router 점진적 migration'
categories: ['Optimization']
summary: 'Next.js app router로 점진적 migration하는 방법에 대해 정리하였습니다.'
---

# 1. 경로
## app 폴더 생성
root에 app폴더를 생성합니다. 

app/ 디렉토리에 있는 폴더들이 각각 라우팅 경로를 의미합니다. 각각의 폴더는 반드시 page.js 파일을 가지고 있어야 합니다.

```
app/
  ├── page.js
  └── contact/
      └── page.js
  └── About/
      └── page.js
```

# 2. layout
## layout를 정의
layout를 정의해줍니다. layout 파일은 하위 모든 경로에 **공통적인 UI**를 제공해줍니다.

## RootLayout
pages 폴더의 layout인 RootLayout component는 **필수**입니다. 이 컴포넌트에 기존 _document.js와 app.js의 내용을 migration 해줍니다.

#### head
기존 next/head를 새로운 built-in SEO support인 [Metadata](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-3-migrating-nexthead)로 변경해줍니다. 

```jsx
//before
import Head from 'next/head'
 
export default function Page() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
    </>
  )
}

//after
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Page Title',
}
 
export default function Page() {
  return '...'
}
```

# Data fetching

## getServerSidePros/getStaticProps
기존 getServerSidePros와 getStaticProps는 fetch 함수로 대체해줍니다. 
```jsx
export default async function Page() {
  // Similar to `getStaticProps`.
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })
 
  // Similar to `getServerSideProps`.
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })
 
  // Similar to `getStaticProps` with the `revalidate` option.
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })
 
  return <div>...</div>
}
```

## getStaticPaths
그리고 getStaticPaths는 generateStaticParmas로 대체해줍니다.

```jsx
//before
import PostLayout from '@/components/post-layout'
 
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
  }
}
 
export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  return { props: { post } }
}
 
export default function Post({ post }) {
  return <PostLayout post={post} />
}

//after
import PostLayout from '@/components/post-layout'
 
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}
 
async function getPost(params) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
 
  return post
}
 
export default async function Post({ params }) {
  const post = await getPost(params)
 
  return <PostLayout post={post} />
}
```

# Error

## 404.js
404.js는 not-found.js로 대체해줍니다.

