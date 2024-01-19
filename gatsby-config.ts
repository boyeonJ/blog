import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: '정보연 블로그',
    siteUrl: `https://www.boyeon.blog.site`,
    description: '안녕하세요, 프론트엔드 개발자 정보연이라고 합니다.',
    author: '정보연',
    image: 'https://github.com/boyeonJ/reactBlog/assets/32887635/ff7bb0c3-4593-4c97-a4a0-178ddbe0622e',
    resumeInfo: {
      experiences: [{
        name: '베스핀 글로벌',
        position: 'DevOps팀',
        period: '2020.01~2022.11',
        description: '공채 1기로 입사하여 삼성전자 b.iot 프로젝트와 삼성전자 gatekeeper 프로젝트를 수행하였습니다.'
      },
      {
        name: '파스토',
        position: '프론트팀',
        period: '2022.11~2023.08',
        description: '풀필먼트 사업을 하는 파스토에서 파스토홈페이지, CMS, 파스토셀프 리뉴얼 프로젝트를 수행하였습니다.'
      }],
      projects: [{
        name: 'b.iot',
        company: '베스핀 글로벌',
        period: '2020.01~2020.12',
        description: '삼성전자 b.iot 프로젝트를 수행했습니다.',
        skills: ['vue.js', 'vuex']
      },
      {
        name: 'gatekeeper',
        company: '베스핀 글로벌',
        period: '2021.01~2022.08',
        description: '삼성전자 gatekeeper 프로젝트를 수행했습니다.',
        skills: ['vue.js', 'vuex']
      },
      {
        name: '파스토셀프',
        company: '베스핀 글로벌',
        period: '2021.01~2022.08',
        description: '파스토셀프 프로젝트를 수행했습니다.',
        skills: ['next.js', 'react-query']
      },
      {
        name: 'cms',
        company: '베스핀 글로벌',
        period: '2021.01~2022.08',
        description: 'cms 프로젝트를 수행했습니다.',
        skills: ['react', 'react-query']
      },
      {
        name: '개인 블로그',
        company: '',
        period: '2024.01~2024.02',
        description: '개인 블로그를 개발하였습니다.',
        skills: ['react', 'react-query']
      }]
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
