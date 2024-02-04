---
date: '2024-01-19'
title: 'Typescript 활용하기'
categories: ['Typescript']
summary: 'Typescript 활용하기'
---

# Typescript 유틸리티 타입 = 제네릭 타입

## Omit
```typescript
export type MetaData = {
    title: string,
    description: string,
    siteUrl: string,
    author: string,
    image: string,
    experiences: Experience[],
    projects: Project[]
}
```

