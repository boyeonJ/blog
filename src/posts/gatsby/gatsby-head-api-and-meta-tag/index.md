---
date: '2024-01-19'
title: 'Gatsby SEO 최적화를 위한 meta tag 추가(Head API)'
categories: ['Gatsby', 'Optimization']
summary: 'Gatsby SEO 최적화를 위해 Head API에 meta tag 추가하는 과정을 기록하였습니다.'
---

# 검색엔진을 최적화
Gatsby에서 meta tag를 통해 검색엔진을 최적화 해보려고 한다.

# Head export
Gatsby에서는 **build-in Head export**를 제공한다. 이는 react-helmet과 비교했을때 성능, 번들 사이즈, 사용 방법 등등 다양한 장점이 존재한다고 한다. (gatsby@4 .19.0부터 등장)

사용방법은 component에서느 **Head라는 이름의 function을 export** 해주면 된다. 그리고 내부 내용은 html의 head에서 사용하는 태그들을 그대로 사용하면 된다.

```jsx
import { HeadFC } from "gatsby";
import { GraphQLNode } from "../models/types";
import * as React from 'react'

export const Head: HeadFC<GraphQLNode> = ({
    data: { site:
        { siteMetadata:
            {
                title,
                description,
                image,
                siteUrl
            }
        }
    }
}) => {
    return (
        <>
            <title>정보연 블로그</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={title} />
        </>
    )
}
```

```jsx
export default Blog
export { Head } from "../components/head"
```

# 주의할점
- Head export는 반드시 **page에서만** 정의할 수 있다.
- Head는 페이지가 **unmount할때 지워진다**. 따라서 각각의 페이지에서 export 해주어야 한다.