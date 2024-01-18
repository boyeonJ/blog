const {
    createFilePath
} = require(`gatsby-source-filesystem`);
const path = require('path');

// Generate a Slug Each Post Data
exports.onCreateNode = ({
    node,
    getNode,
    actions
}) => {
    const {
        createNodeField
    } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node,
            getNode
        });

        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
};

// Generate Post Page Through Markdown Data
exports.createPages = async ({
    actions,
    graphql,
    reporter
}) => {
    const {
        createPage
    } = actions;

    // Get All Markdown File For Paging
    const queryAllMarkdownData = await graphql(
        `
        {
          allMarkdownRemark(
            sort: {
              order: DESC
              fields: [frontmatter___date, frontmatter___title]
            }
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `,
    );

    // Handling GraphQL Query Error
    if (queryAllMarkdownData.errors) {
        reporter.panicOnBuild(`Error while running query`);
        return;
    }

    // Import Post Template Component
    const PostTemplateComponent = path.resolve(
        __dirname,
        'src/templates/post_template.tsx',
    );

    // Page Generating Function
    const generatePostPage = ({
        node: {
            fields: {
                slug
            },
        },
    }) => {
        const pageOptions = {
            path: slug,
            component: PostTemplateComponent,
            context: {
                slug
            },
        };

        createPage(pageOptions);
    };

    // Generate Post Page And Passing Slug Props for Query
    queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};