const config = require('../../../gatsby-config')
const query = require('../data/query')
const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogBasePath = config.siteMetadata.blogBasePath || 'blog'
  const eventsBasePath = config.siteMetadata.eventsBasePath || 'events'

  // Create a page for each "event" post
  const eventsQuery = await graphql(query.data.events)
  const events = eventsQuery.data.allContentfulEvent.edges
  events.forEach((event, i) => {
    const next = i === events.length - 1 ? null : events[i + 1].node
    const prev = i === 0 ? null : events[i - 1].node

    createPage({
      path: `${eventsBasePath === '/' ? '' : eventsBasePath}/${
        event.node.slug
      }/`,
      component: path.resolve(`./src/templates/event.js`),
      context: {
        slug: event.node.slug,
        basePath: eventsBasePath === '/' ? '' : eventsBasePath,
        prev,
        next,
      },
    })
  })

  // Create a page for each blog "post"
  const postsQuery = await graphql(query.data.posts)
  const posts = postsQuery.data.allContentfulPost.edges
  posts.forEach((post, i) => {
    const next = i === posts.length - 1 ? null : posts[i + 1].node
    const prev = i === 0 ? null : posts[i - 1].node

    createPage({
      path: `${blogBasePath === '/' ? '' : blogBasePath}/${post.node.slug}/`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: post.node.slug,
        basePath: blogBasePath === '/' ? '' : blogBasePath,
        prev,
        next,
      },
    })
  })

  // Create a page containing all "event" posts and paginate.
  paginate({
    createPage,
    component: path.resolve(`./src/templates/events.js`),
    items: events,
    itemsPerFirstPage: config.siteMetadata.postsPerFirstPage || 7,
    itemsPerPage: config.siteMetadata.postsPerPage || 6,
    pathPrefix: eventsBasePath,
    context: {
      basePath: eventsBasePath === '/' ? '' : eventsBasePath,
      paginationPath: eventsBasePath === '/' ? '' : `/${eventsBasePath}`,
    },
  })

  // Create a page containing all blog "posts" and paginate.
  paginate({
    createPage,
    component: path.resolve(`./src/templates/posts.js`),
    items: posts,
    itemsPerFirstPage: config.siteMetadata.postsPerFirstPage || 7,
    itemsPerPage: config.siteMetadata.postsPerPage || 6,
    pathPrefix: blogBasePath,
    context: {
      basePath: blogBasePath === '/' ? '' : blogBasePath,
      paginationPath: blogBasePath === '/' ? '' : `/${blogBasePath}`,
    },
  })

  // Create "tag" page and paginate
  const tagsQuery = await graphql(query.data.tags)
  const tags = tagsQuery.data.allContentfulTag.edges

  tags.forEach((tag, i) => {
    const tagPagination =
      blogBasePath === '/'
        ? `/tag/${tag.node.slug}`
        : `/${blogBasePath}/tag/${tag.node.slug}`

    paginate({
      createPage,
      component: path.resolve(`./src/templates/tag.js`),
      items: tag.node.post || [],
      itemsPerPage: config.siteMetadata.postsPerPage || 6,
      pathPrefix: tagPagination,
      context: {
        slug: tag.node.slug,
        basePath: blogBasePath === '/' ? '' : blogBasePath,
        paginationPath: tagPagination,
      },
    })
  })

  // Create a page for each "page"
  const pagesQuery = await graphql(query.data.pages)
  const pages = pagesQuery.data.allContentfulPage.edges
  pages.forEach((page, i) => {
    createPage({
      path: `/${page.node.slug}/`,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        slug: page.node.slug,
      },
    })
  })

  // Create home page
  const homePageQuery = await graphql(query.data.pages)
  const home = homePageQuery.data.allContentfulPage.edges.find(
    page => page.node.slug === 'home'
  )
  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/page.js`),
    context: {
      hideTitle: true,
      slug: home.node.slug,
    },
  })
}
