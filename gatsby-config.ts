import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: '정보연 블로그',
    siteUrl: `https://www.boyeon.blog.site`,
    description: '안녕하세요, 프론트엔드 개발자 정보연이라고 합니다.',
    author: '정보연',
    image: 'https://github.com/boyeonJ/reactBlog/assets/32887635/ff7bb0c3-4593-4c97-a4a0-178ddbe0622e',
    resumeInfo: {
      experiences: [
        {
          name: '파스토',
          position: '프론트팀',
          period: '2022.11~2023.08',
          description: '풀필먼트 사업을 하는 파스토에서 파스토홈페이지, CMS, 파스토셀프 리뉴얼 프로젝트를 수행하였습니다.'
        }{
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
          description: '파스토 셀프는 집에서도, 1인 기업도 재고관리와 <strong>택배발송이 가능한</strong> 솔루션입니다. 유지보수 및 기능개선(쇼핑몰 통합, 디자인 리뉴얼)을 위해 thymeleaf에서 React로 전환하였습니다.',
          skills: [
            'next.js',
            'typescript',
            'react-query(TanStack Query v4)',
            'Redux Toolkit',
            'React Table(TanStack Table v8)',
            'React-Hook-Form'
          ],
          what: [
            '쇼핑몰 연동 개발',
            '쇼핑몰 주문 페이지 개발(신규주문, 배송, 취소, 반품, 교환 관리)',
            '사용자 관리 페이지 개발',
            'ASIS Service log 분석 및 mock api 생성'
          ],
          results: [
            '중복되는 컴포넌트를 사용하는 페이지들을 atoms, molecule, organism, template등으로 리팩토링하여 컴포넌트의 재사용성을 높이고 복잡한 화면 구성을 쉽게 설계',
            '<strong>Headless Component</strong>로 공통된 기능 부분을 추상화',
            'Compound component와 CustomHook을 적극 활용',
            'TypeScript의 커스텀 타입(Generic), 상속(extends)을 적극 활용',
            'React-Hook-Form를 쉽게 사용할 수 있도록 HOC component 개발',
            'React-Hook-Form과 mui를 같이 사용하는 방법, props drilling을 줄이는 방법을 정리하고 팀원들에게 공유(useFormContext, FormProvider, useController)',
            '쇼핑몰 주문 페이지 개발 전반적인 업무 프로세스 파악'
          ]
        },
        {
          name: '개인 블로그',
          company: '',
          period: '2024.01~2024.02',
          description: '개인 블로그를 개발하였습니다.',
          skills: [
            'gatsby',
            'typescript'
          ],
          what: [
            'Link API로 최적화',
            'imgae plugin으로 lazy-loading 적용',
            'infinite sroll 적용',
            'remark'
          ],
          results: [
            'server side rendering에 대한 이해',
            '최적화를 위한 플러그인과 built in API 적극 활용'
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
          what: [
            '정산 관리 개발',
            '명세서 관리 개발',
            '기타비 재집계 개발'
          ],
          results: [
            'Redux Toolkit을 활용하여 중앙집중식 데이터 관리 구축 (createAsyncThunk, createSlice)',
            '반복되는 templates을 공통 컴포넌트로 구현하여 재사용을 높임',
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
          what: [
            '고객 문의 list, detail, write 페이지 개발'
          ],
          results: [
            '코드의 양을 줄여 유지보수성을 높임',
            '중앙집중식 데이터 관리를 통해 효율적으로 데이터 관리',
            '효율적인 구조를 설계하여 리팩토링 후 안정성을 보장',
            'Vue3의 Composition API에 코드 작성 방식을 적용하여 좀 더 논리적 관점에서의 개발',
            'VueX와 Pinia를 비교 분석하여 더 적합한 상태관리 라이브러리(Pinia)를 도입 ',
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
          what: [
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
          what: [
            '각 Gateway로부터 수집한 데이터를 차트와 그래프를 사용하여 시각화하는 대시보드 구현',
            '대시보드의 Drag&Drop을 통한 Card Drawer 기능',
            '회원가입 기능(카카오 인증, 이메일 인증, 도로명 주소 외부 API 연동)',
            'ID찾기, PW재설정, 이용 약관 관리 메뉴'
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
