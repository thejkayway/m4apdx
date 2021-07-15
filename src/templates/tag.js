import React from 'react'
import { graphql } from 'gatsby'
import { startCase, orderBy } from 'lodash'
import SEO from '../components/SEO'
import moment from 'moment'
import Layout from '../components/Layout'
import Card from '../components/Card'
import CardList from '../components/CardList'
import PageTitle from '../components/PageTitle'
import Pagination from '../components/Pagination'
import Container from '../components/Container'

const TagTemplate = ({ data, pageContext }) => {
  const posts = orderBy(
    data.contentfulTag.post,
    // eslint-disable-next-line
    [object => new moment(object.publishDateISO)],
    ['desc']
  )
  const events = orderBy(
    data.contentfulTag.event,
    // eslint-disable-next-line
    [object => new moment(object.eventStartDate)],
    ['desc']
  )

  const { title } = data.contentfulTag
  const numberOfPosts = posts.length
  const numberOfEvents = events.length
  const skip = pageContext.skip
  const limit = pageContext.limit
  const { humanPageNumber, blogBasePath, eventsBasePath } = pageContext

  let ogImage
  try {
    ogImage = posts[0].heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const TaggedBlogPosts = () => (
    <>
      <PageTitle small>
        {numberOfPosts} Blog Post{numberOfPosts > 1 && `s`} Tagged: &ldquo;
        {title}
        &rdquo;
      </PageTitle>
      <CardList>
        {posts.slice(skip, limit * humanPageNumber).map(post => (
          <Card {...post} key={post.id} basePath={blogBasePath} />
        ))}
      </CardList>
    </>
  )

  const TaggedEvents = () => (
    <>
      <PageTitle small>
        {numberOfEvents} Event{numberOfEvents > 1 && `s`} Tagged: &ldquo;
        {title}
        &rdquo;
      </PageTitle>
      <CardList>
        {events.slice(skip, limit * humanPageNumber).map(event => (
          <Card {...event} key={event.id} basePath={eventsBasePath} />
        ))}
      </CardList>
    </>
  )

  return (
    <>
      <Layout>
        <SEO
          title={`Tag: ${startCase(title)}`}
          description={`Items Tagged: ${startCase(title)}`}
          image={ogImage}
        />
        <Container>
          {numberOfPosts > 0 && <TaggedBlogPosts />}
          {numberOfEvents > 0 && <TaggedEvents />}
        </Container>
        <Pagination context={pageContext} />
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      post {
        id
        title
        slug
        publishDate(formatString: "MMMM DD, YYYY")
        publishDateISO: publishDate(formatString: "YYYY-MM-DD")
        heroImage {
          title
          fluid(maxWidth: 1800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
          ogimg: resize(width: 1800) {
            src
          }
        }
        body {
          childMarkdownRemark {
            timeToRead
            html
            excerpt(pruneLength: 80)
          }
        }
      }
      event {
        title
        slug
        metaDescription {
          internal {
            content
          }
        }
        eventStartDate
        eventEndDate
        eventUrl
        heroImage {
          title
          fluid(maxWidth: 1800) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
          ogimg: resize(width: 1800) {
            src
          }
        }
        description {
          childMarkdownRemark {
            html
            excerpt(pruneLength: 320)
          }
        }
      }
    }
  }
`

export default TagTemplate
