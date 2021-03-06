import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Hero from '../components/Hero'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDetails from '../components/PostDetails'
import SEO from '../components/SEO'
import moment from 'moment'

const EventTemplate = ({ data, pageContext }) => {
  const {
    title,
    metaDescription,
    heroImage,
    description,
    eventStartDate,
    eventUrl,
    tags,
  } = data.contentfulEvent

  const previous = pageContext.prev
  const next = pageContext.next
  const { basePath } = pageContext
  const eventDateLocalTime = moment(eventStartDate).format(
    'MMMM DD, YYYY h:mmA'
  )

  let ogImage
  try {
    ogImage = heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : description.childMarkdownRemark.excerpt
        }
        image={ogImage}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
        {tags && <TagList tags={tags} />}
        <PostDetails date={eventDateLocalTime} url={eventUrl} />
        <PageBody body={description} />
      </Container>
      <PostLinks previous={previous} next={next} basePath={basePath} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulEvent(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      eventStartDate
      eventEndDate(formatString: "h:mmA")
      eventUrl
      heroImage {
        title
        description
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
        }
      }
      tags {
        title
        id
        slug
      }
      description {
        childMarkdownRemark {
          timeToRead
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default EventTemplate
