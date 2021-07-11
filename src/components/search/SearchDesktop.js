import React, { useRef, useState } from 'react'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { MagnifyingGlass } from '@emotion-icons/entypo/MagnifyingGlass'
import SearchResult from './SearchResult'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useFocus } from '../../hooks/use-focus'

const Closed = css`
  height: 0;
  width: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  * {
    display: none;
  }
`

const Open = css`
  padding: 1em;
`

const AlgoliaDisplay = css`
  width: 12.5em;
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

const Popover = styled.div`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  z-index: 2;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  border-radius: 2px;
  background: ${props => props.theme.colors.background};
  transition: 0.1s all;
  ${({ show }) => (show ? Open : Closed)}

  .ais-Hits-list {
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 1em;

    li {
      margin-left: 0;
    }
  }
`

const AlgoliaComponents = styled.div`
  transition: 0.2s all;
  position: relative;
  ${({ show }) => (show ? AlgoliaDisplay : Closed)}
`

const SearchButton = styled.div`
  cursor: pointer;
  color: ${props => props.theme.colors.highlight};
  ${({ show }) => show || Closed}
`

const SearchWrapper = styled.div`
  .ais-SearchBox {
    background: ${props => props.theme.colors.background};
    border-radius: 0.4em;
    padding: 0.5em 0.8em;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SearchDesktop = ({ indices, searchClient }) => {
  const rootRef = useRef()
  const searchBarRef = useRef()
  const [query, setQuery] = useState()
  const [searchBarHasFocus, setSearchBarHasFocus] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const focusOnSearchBar = useFocus(searchBarRef)

  useClickOutside(rootRef, () => {
    setSearchBarHasFocus(false)
    setShowSearchBar(false)
  })

  return (
    <SearchWrapper ref={rootRef}>
      <SearchButton
        onClick={() => {
          setShowSearchBar(true)
          focusOnSearchBar()
        }}
        show={!showSearchBar}
      >
        <MagnifyingGlass size={'1.8em'} />
      </SearchButton>
      <AlgoliaComponents show={showSearchBar}>
        <InstantSearch
          indexName="Pages"
          searchClient={searchClient}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <SearchBox
            onFocus={() => setSearchBarHasFocus(true)}
            hasFocus={searchBarHasFocus}
            inputRef={searchBarRef}
          />
          <Popover show={query && query.length > 0 && searchBarHasFocus}>
            <SearchResult indices={indices} />
          </Popover>
        </InstantSearch>
      </AlgoliaComponents>
    </SearchWrapper>
  )
}

export default SearchDesktop
