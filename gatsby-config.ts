import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: '정보연 블로그',
    siteUrl: `https://www.boyeon.blog.site`,
    description: '안녕하세요, 프론트엔드 개발자 정보연이라고 합니다.',
    author: '정보연',
    image: 'https://github.com/boyeonJ/reactBlog/assets/32887635/ff7bb0c3-4593-4c97-a4a0-178ddbe0622e',
    resumeInfo: {
      personalProjects: [
        {
          name: '개인 기술 블로그',
          period: '2024.01~',
          description: 'Gatsby로 개인 블로그를 개발하였습니다.',
          skills: [
            'gatsby',
            'typescript',
            'storybook',
            'emotion'
          ],
          results: [
            'Link API로 최적화',
            'imgae plugin으로 lazy-loading 적용',
            'infinite sroll을 <strong>custom hook</strong>으로 구현',
            '<strong>atomic design pattern</strong> 디자인 시스템 구현',
            'stotybook을 활용하여 <strong>컴포넌트 주도</string> 개발',
            'remark',
            'server side rendering에 대한 이해',
            '최적화를 위한 플러그인과 built in API 적극 활용'
          ]
        },
      ],
      skills: [
        {
          name: '자바스크립트',
          contents: [
            'reduce, map, filter 등 다양한 <strong>고차함수</strong>을 활용합니다.',
            '<strong>함수형 프로그래밍</strong>에 관심이 많고, 합성, 커링, 재귀과 같은 기법을 사용할 수 있습니다.',
            '<strong>Vanilla JavaScript</strong>를 활용해 DOM 조작하는 데 익숙',
            '<strong>크로스 브라우징</strong> 이슈를 해결하여 <strong>사용자 경험</strong>을 높인 경험이 있습니다.',
            'CommonJS, ES Modules의 모듈 시스템에 대한 이해도가 높고, 적절한 도구를 활용할 수 있습니다.'
          ]
        },
        {
          name: '리액트',
          contents: [
            '로직을 재사용하기 위한 <strong>custom hook</strong>을 적극 활용합니다.',
            '다양한 <strong>컴포넌트 디자인 패턴</strong>에 대해 관심이 많고, 합리적인 방식으로 컴포넌트를 분리할 수 있습니다.',
            '계산 비용이 높을 경우 <strong>useMemo, useCallback</strong>를 적절히 활용하여 랜더링을 최적화 합니다.',
            'PureComponent와 React.memo',
            'React 생태계의 최신 기술',
            '보일러 플레이트 줄이기',
            'props drilling 줄이기'
          ]
        },
        {
          name: 'HTML/CSS',
          contents: [
            '의미에 맞는 sementic tag를 사용하여 웹 표준과 웹 접근성을 고려한 설계를 할 수 있습니다.',
            'Sass(Scss) 등의 CSS Preprocessor를 사용',
            'emotion, mui, styled-component 사용 경험이 있습니다.'
          ]
        },
        {
          name: '브라우저',
          contents: [
            'Search Engine Optimization 경험',
            '리플로우를 줄여 랜더링 최적화',
            '다양한 Web API 활용'
          ]
        },
        {
          name: '기타',
          contents: [
            'Git - 이슈와 릴리즈 노트',
            'Storybook을 활용하여 시각적 테스팅을 수행하고 컴포넌트 주도 개발을 실천합니다.',
            '다양한 테스팅 도구(Testing Library)로 안정성을 확보합니다.',
            '점진적으로 발전하는 서비스를 보며 뿌듯함',
            '보일러 플레이트를 줄이는 개발',
            'DX를 높이는 클린코드',
            'UX를 높이는 최적화(랜더링, 브라우저 크로스 이슈)'
          ]
        }
      ],
      experiences: [
        {
          name: '파스토',
          position: '프론트팀',
          period: '2022.11~2023.08',
          description: '풀필먼트 사업을 하는 파스토에서 파스토홈페이지, CMS, 파스토셀프 리뉴얼 프로젝트를 수행하였습니다.'
        },
        {
          name: '베스핀 글로벌',
          position: 'DevOps팀',
          period: '2020.01~2022.11',
          description: '공채 1기로 입사하여 삼성전자 b.iot 프로젝트와 삼성전자 gatekeeper 프로젝트를 수행하였습니다.'
        },],
      projects: [
        {
          name: '파스토 셀프 리뉴얼',
          company: '파스토',
          period: '2023.03~2023.08',
          description: '파스토 셀프는 집에서도, 1인 기업도 재고관리와 택배발송이 가능한 솔루션입니다. 유지보수 및 기능개선(쇼핑몰 통합, 디자인 리뉴얼)을 위해 thymeleaf에서 React로 전환하였습니다.',
          skills: [
            'next.js',
            'typescript',
            'react-query(TanStack Query v4)',
            'Redux Toolkit',
            'React Table(TanStack Table v8)',
            'React-Hook-Form'
          ],
          tasks: [
            '사용자 관리 페이지 개발',
            'ASIS Service log 분석 및 mock api 생성'
          ],
          results: [
            '해당 솔루션의 핵심 기능인 쇼핑몰 연동 및 주문 페이지(신규주문, 배송, 취소, 반품, 교환 관리)를 개발하였습니다.',
            '반복되는 컴포넌트에 <strong>atomic, compound component 패턴</strong>을 적용하여 DX를 개선하였습니다.',
            '<strong>디자인 시스템</strong>을 구축하여 일관된 디자인을 빠르게 개발하였습니다',
            '최적화, UX/DX 개선을 위한 React-Query, React-Table, React-Hook-form 등 다양한 <strong>최신 기술</strong>을 적용하였습니다.',
            '보일러 플레이트를 줄이기 위해 Headless Component로 공통된 기능 부분을 추상화 하였습니다.'
          ]
        },
        {
          name: 'CMS 개발',
          company: '파스토',
          period: '2023.01~2023.03',
          description: '사내 정산 관련 백 오피스를 Client와 Server로 분리하고 RESTful한 API로 리뉴얼하였습니다.',
          skills: [
            'react',
            'typescript',
            'react-query(TanStack Query v4)',
            'Redux Toolkit',
            'React Table(TanStack Table v8)',
          ],
          tasks: [
            '정산 관리 개발',
            '명세서 관리 개발',
            '기타비 재집계 개발'
          ],
          results: [
            '정산, 명세서, 기타비 관리를 개발하였습니다.',
            '반복되는 컴포넌트(Modal, SearchContent)를 추상화 및 모듈화 하여 DX를 개선하였습니다.',
            'Axio interceptor와 react-query의 onError로 <strong>일관된 에러처리</strong>를 적용하였습니다.',
            'Redux Toolkit을 활용하여 중앙집중식 데이터 관리 구축(createAsyncThunk, createSlice)',
            '올바른 RESTful API 방향에 대하여 백엔드 개발자와 함께 고민하였습니다.'
          ]
        },
        {
          name: 'Homepage 리팩토링',
          company: '파스토',
          period: '2021.11~2023.01',
          description: '파스토 홈페이지의 일부를 thymeleaf, jQuery에서 Vue.js로 전환하였습니다.',
          skills: [
            'Vue.js',
            'Pinia',
            'Cypress'
          ],
          tasks: [
          ],
          results: [
            'server와 통신하는 페이지인 고객 문의 페이지 개발하였습니다.',
            'Vue3의 <strong>Composition API</strong>에 코드 작성 방식을 적용하여 좀 더 논리적 관점에서의 개발',
            'VueX와 Pinia를 <strong>비교 분석</strong>하여 더 적합한 상태관리 라이브러리(Pinia)를 도입 ',
            '코드의 양을 줄여 유지보수성을 높임',
            '중앙집중식 데이터 관리를 통해 효율적으로 데이터 관리',
            '효율적인 구조를 설계하여 리팩토링 후 안정성을 보장',
            'ASIS 버그 개선을 통한 사용성 향상'
          ]
        },
        {
          name: '삼성전자 GateKeeper 운영 개발',
          company: '베스핀 글로벌',
          period: '2021.02~2022.11',
          description: '삼성전자의 여러 사업부(생활 가전 사업부, 무선 사업부, 영상 디스플레이 사업부)에서 수집한 개인정보에 대한 정보 주체의 요청을 각 서비스에 전파하고 처리하는 일련의 과정을 중계하는 자동화 어드민 시스템입니다. 해당 프로젝트에서 Admin Portal의 Front-end, Back-end 개발 및 운영을 담당했습니다.',
          skills: [
            'vue.js',
            'javascript',
            'Spring Boot',
            'MySql',
            'MyBatis',
            'Circle CI',
            'Jenkins',
            'Github Action',
            'GitHub Enterprise'
          ],
          tasks: [
            '대시보드 메뉴',
            '서비스 페이지',
            '고객 관리 페이지'
          ],
          results: [
            'Vue.js Component를 적절히 분리하여 재사용성과 유지보수성 높임',
            '공통으로 사용하는 데이터들을 코드화하여 안정성을 높임',
            'Sonarlink 플러그인을 적용하여 코드 품질을 향상'
          ]
        },
        {
          name: '삼성전자 b.IoT 신규 개발',
          company: '베스핀 글로벌',
          period: '2020.06~2020.12',
          description: '삼성전자 각 Gateway로부터 데이터를 수집(센서, 운영 현황, 운영 이력 데이터)하여 분석 및 가공한 통계 데이터를 통합 관제할 수 있는 맞춤형 대시보드 어드민 사이트입니다. 해당 프로젝트의 Front-end 개발자를 담당하였습니다',
          skills: [
            'vue.js',
            'vuex'
          ],
          tasks: [
            '각 Gateway로부터 수집한 데이터를 차트와 그래프를 사용하여 시각화하는 대시보드 구현',
            '대시보드의 Drag&Drop을 통한 Card Drawer 기능',
            '회원가입 기능(카카오 인증, 이메일 인증, 도로명 주소 외부 API 연동)',
            'ID찾기, PW재설정, 이용 약관 관리 메뉴',
            'IE에 대한 크로스 브라우징 이슈를 처리하였습니다.'
          ],
          results: [
            '서비스 초기 단계에 참여하며 효율적인 프로젝트 구조에 대해 고민',
            '데이터를 차트와 그래프를 사용하여 시각화',
            '대시 보드의 Drag&Drop을 통한 Card Drawer 기능의 편집 및 조회 기능을 구현(Vue Grid Layout 사용)'
          ]
        },
      ]
    }
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ]
};

export default config;
