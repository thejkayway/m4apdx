import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import { startCase } from 'lodash'
import PageTitle from '../components/PageTitle'

const Events = ({ data, pageContext }) => {
  const events = data.allContentfulEvent.edges
  const { humanPageNumber, basePath } = pageContext
  const isFirstPage = humanPageNumber === 1
  let featuredEvent
  let ogImage

  try {
    featuredEvent = events[0].node
  } catch (error) {
    featuredEvent = null
  }
  try {
    ogImage = events[0].node.heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <PageTitle>Events</PageTitle>
      <SEO title={startCase(basePath)} image={ogImage} />
      <Container>
        {isFirstPage ? (
          <CardList>
            <Card {...featuredEvent} featured basePath={basePath} />
            {events.slice(1).map(({ node: event }) => (
              <Card key={event.id} {...event} basePath={basePath} />
            ))}
          </CardList>
        ) : (
          <CardList>
            {events.map(({ node: event }) => (
              <Card key={event.id} {...event} basePath={basePath} />
            ))}
          </CardList>
        )}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulEvent(
      sort: { fields: [eventStartDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            ogimg: resize(width: 1800) {
              src
            }
          }
          eventStartDate
          eventEndDate
          eventUrl
          description {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`

export default Events
