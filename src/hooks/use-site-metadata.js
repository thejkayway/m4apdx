import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query siteMetaData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            menuLinks {
              name
              slug
              highVisibility
            }
            searchIndices {
              name
              title
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
