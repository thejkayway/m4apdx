import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
} from 'react-instantsearch-dom'

const Results = styled.div`
  .ais-Hits-item {
    border-bottom: 1px solid lightgray;

    &:last-of-type {
      border: none;
    }
  }
`

const Result = styled.div`
  background: ${props => props.theme.colors.background};
  border: none;
  padding: 0.3em;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  white-space: normal;

  &:last-of-type {
    border: none !important;
    margin-bottom: 0.5em;
  }

  a {
    color: ${props => props.theme.colors.text} !important;
    border: none !important;
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.colors.contrast} !important;
      background: ${props => props.theme.colors.background};
      border: none;
    }
  }
`
const ResultTitle = styled.div`
  font-size: 1em;
  font-weight: 520;
  padding-bottom: 0.2em;
`

const ResultExcerpt = styled.div`
  font-size: 0.9em;
  font-weight: 300;
`

const IndexHeader = styled.div`
  border-bottom: 0.1em solid ${props => props.theme.colors.text};
  display: flex;
  font-size: 1.2em;
  font-weight: 550;
  padding-bottom: 0.2em;
`

const IndexTitle = styled.h3`
  background: ${props => props.theme.colors.contrast};
  border-radius: 0.2em;
  color: ${props => props.theme.colors.highlight} !important;
  padding: 0.3em;
`

const IndexHitCount = styled.h3`
  margin-left: auto;
  font-weight: 350;
`

const HitCount = ({ hitCount }) => {
  return hitCount > 0 ? (
    <IndexHitCount>
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </IndexHitCount>
  ) : null
}

const Hit = ({ hit }) => {
  const { slug } = hit
  return (
    <Result>
      <Link key={slug} to={`/${slug}`}>
        <ResultTitle>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </ResultTitle>
        <ResultExcerpt>
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </ResultExcerpt>
      </Link>
    </Result>
  )
}

const IndexResults = connectStateResults(
  ({ searchResults, searchState, indexName }) => {
    const hitCount = searchResults && searchResults.nbHits
    return (
      <>
        <IndexHeader>
          <IndexTitle>{indexName}</IndexTitle>
          <HitCount hitCount={hitCount} />
        </IndexHeader>
        <Results>
          {hitCount > 0 ? (
            <Hits hitComponent={Hit} />
          ) : (
            <Result>
              <ResultExcerpt>
                No results found for "{searchState.query}"
              </ResultExcerpt>
            </Result>
          )}
        </Results>
      </>
    )
  }
)

const IndexDisplay = ({ index }) => (
  <Index indexName={index.title}>
    <IndexResults indexName={index.name} />
  </Index>
)

const SearchResult = ({ indices }) => (
  <div>
    {indices.map(index => (
      <IndexDisplay index={index} key={index.name} />
    ))}
  </div>
)

export default SearchResult
