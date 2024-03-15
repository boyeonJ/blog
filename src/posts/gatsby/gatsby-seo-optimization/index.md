---
date: '2024-01-19'
title: 'Gatsby SEO 최적화'
categories: ['Gatsby', 'Optimization']
summary: 'Gatsby SEO 최적화를 위해 Head API에 meta tag 추가하고 sitemap을 추가하는 과정을 기록하였습니다.'
---

검색 엔진 최적화(Search Engine Optimization, SEO)는 웹 사이트를 검색 엔진에서 노출되도록 하는 프로세스를 의미합니다. 이를 통해 사용자들이 웹 사이트를 **더 쉽게 발견하고 방문**할 수 있습니다. Gatsby를 사용하여 SEO를 최적화하기 위해서는 메타 태그 및 사이트맵을 구축하는 것이 중요합니다.

# 메타 태그
Gatsby에서는 메타 태그를 작성하기 위해 build-in Head export를 제공합니다. 이는 react-helmet과 비교했을 때 성능, 번들 크기, 사용 방법 등 다양한 장점을 갖습니다. 이 기능은 gatsby@4.19.0부터 등장했습니다.

사용 방법은 간단합니다. 컴포넌트에서 Head라는 이름의 함수를 export해주면 됩니다. 그리고 내부에는 HTML의 head 태그에 사용되는 다양한 요소들을 그대로 작성하면 됩니다.

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

> 주의할점
- Head export는 반드시 **page에서만** 정의할 수 있다.
- Head는 페이지가 **unmount할때 지워진다**. 따라서 각각의 페이지에서 export 해주어야 한다.


# Sitemap
sitemap은 xml형태의 **url리스트**입니다. 이는 검색엔진에게 노출되었으면 하는 페이지를 전달하여 크롤링 속도를 높이는 방식으로 seo를 최적화 하는 방법입니다.

Gatsby로 만든 제 블로그는 md파일이 계속해서 생성되는 페이지이기 때문에 sitemap을 **지속적으로 관리하기에는 어려움**이 있습니다. 따라서 프로젝트를 빌드 할때 자동으로 생성되는 페이지에 대해서 Sitemap에 추가해주는 [라이브러리](https://www.gatsbyjs.com/docs/how-to/adding-common-features/creating-a-sitemap/#using-gatsby-plugin-sitemap)를 사용하려고 합니다.

```shell
yarn add gatsby-plugin-sitemap
```

```js
//gatsby-config.js
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.example.com`,
  },
  plugins: [`gatsby-plugin-sitemap`],
}
```

gatsby build를 수행하면 public에 sitemap-0.xml과 sitemap-index.xml 파일이 생성됩니다. 
![site-map-file](./assets/site-map-file.png)

# 마무리 하며
지금까지 Gatsby에서 검색 엔진 최적화를 위한 메타 태그를 추가하는 방법과 사이트맵을 구축하는 방식에 대해 알아보았습니다. 이를 통해 제 blog는 검색 결과에서 더욱 잘 노출될 수 있게 되었습니다:) 