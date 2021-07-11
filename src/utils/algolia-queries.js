const eventsIndex = 'Events'
const pagesIndex = 'Pages'

const eventsQuery = `{
  events: allContentfulEvent {
    edges {
      node {
        id
        title
        slug
        description {
          childMarkdownRemark {
            excerpt(pruneLength: 5000)
          }
        }
      }
    }
  }
}`

const pagesQuery = `{
  pages: allContentfulPage {
    edges {
      node {
        id
        title
        slug
        body {
          childMarkdownRemark {
            excerpt(pruneLength: 5000)
          }
        }
      }
    }
  }
}`

function contentfulRecordToAlgoliaRecord({
  node: { id, title, slug, ...rest },
}) {
  let excerpt =
    rest.body?.childMarkdownRemark.excerpt ??
    rest.description.childMarkdownRemark.excerpt
  return {
    objectID: id,
    title,
    slug,
    excerpt,
  }
}

const queries = [
  {
    query: pagesQuery,
    transformer: ({ data }) =>
      data.pages.edges.map(contentfulRecordToAlgoliaRecord),
    indexName: pagesIndex,
    settings: { attributesToSnippet: ['excerpt:20'] },
  },
  {
    query: eventsQuery,
    transformer: ({ data }) =>
      data.events.edges.map(contentfulRecordToAlgoliaRecord),
    indexName: eventsIndex,
    settings: { attributesToSnippet: ['excerpt:20'] },
  },
]

module.exports = queries
