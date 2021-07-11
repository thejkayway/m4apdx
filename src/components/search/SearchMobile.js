import React, { useState } from 'react'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import SearchResult from './SearchResult'

const Closed = css`
  height: 0;
  padding: 0;
  * {
    display: none;
  }
`

const AlgoliaComponents = styled.div`
  transition: 0.2s all;
  position: relative;
  .ais-SearchBox-form {
    display: flex;
    justify-content: space-between;
  }
  .ais-SearchBox-input {
    flex: 200 1 auto;
    width: 0;
    size: 0;
  }
  .ais-SearchBox-submit {
    flex: 1 1 auto;
  }
  .ais-SearchBox-reset {
    flex: 1 1 auto;
  }
`

const SearchBar = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 0.5em;
  padding: 0.5em;
  margin-bottom: 1em;
`

const SearchResultArea = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 0.3em;
  padding: 0.5em;
  margin-bottom: 1em;
  transition: 0.3s all;
  font-size: 0.9em;
  ${({ show }) => show || Closed}
`

const SearchMobile = ({ indices, searchClient }) => {
  const [query, setQuery] = useState()
  const [searchBarHasFocus, setSearchBarHasFocus] = useState(false)

  return (
    <AlgoliaComponents>
      <InstantSearch
        indexName="Pages"
        searchClient={searchClient}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBar>
          <SearchBox
            hasFocus={searchBarHasFocus}
            onFocus={() => setSearchBarHasFocus(true)}
          />
        </SearchBar>
        <SearchResultArea show={query && query.length > 0 && searchBarHasFocus}>
          <SearchResult indices={indices} />
        </SearchResultArea>
      </InstantSearch>
    </AlgoliaComponents>
  )
}

export default SearchMobile
