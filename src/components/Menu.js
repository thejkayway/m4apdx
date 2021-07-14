import React, { useMemo } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'
import { slide as Burger } from 'react-burger-menu'
import styled from '@emotion/styled'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import SearchDesktop from './search/SearchDesktop'
import SearchMobile from './search/SearchMobile'

const activeClassName = 'currentlyActive'
const highVisibilityClassName = 'highVis'

const Header = styled.header`
  background: ${props => props.theme.colors.primary};
  width: 100%;
  @media (max-width: ${props => props.theme.responsive.small}) {
    padding: 1.5em 0;
  }
  @media (min-width: ${props => props.theme.responsive.small}) {
    padding: 0.4em 0;
  }
`
const Nav = styled.nav`
  @media (max-width: ${props => props.theme.responsive.small}) {
    display: none;
  }
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5em;

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    display: inline-block;
    margin-left: 1.5em;
    &:first-of-type {
      position: relative;
      margin: 0;
      flex-basis: 100%;
      a {
        color: ${props => props.theme.colors.highlight};
      }
    }

    white-space: nowrap;
  }

  a {
    text-decoration: none;
    border-radius: 0.4em;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.highlight};
    display: inline-block;
    font-size: 1.1em;
    font-weight: 550;
    padding: 0.5em 0.8em;

    transition: all 0.2s;
    &:hover {
      border-radius: 0.4em;
      border: 1px solid ${props => props.theme.colors.text};
      background: ${props => props.theme.colors.contrast};
    }
  }

  .${highVisibilityClassName} {
    border: 2px solid ${props => props.theme.colors.text} !important;
    border-radius: 0.4em;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    &:hover {
      border: 2px solid ${props => props.theme.colors.text};
      color: ${props => props.theme.colors.background};
      background: ${props => props.theme.colors.text};
    }
  }
  .${highVisibilityClassName}.${activeClassName} {
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.background};
  }

  .${activeClassName} {
    border-radius: 0.4em;
    border: 1px solid ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.contrast};
  }
`

const BurgerBar = styled.div`
  @media (min-width: ${props => props.theme.responsive.small}) {
    display: none;
  }

  margin: -1.5em 0;

  .bm-burger-button {
    position: absolute;

    display: block;
    width: 2em;
    height: 1.6em;
    left: 1.5em;
    top: 0.7em;
  }

  .bm-burger-bars {
    background: ${props => props.theme.colors.secondary};
  }

  .bm-burger-bars-hover {
    background: ${props => props.theme.colors.highlight};
  }

  .bm-cross-button {
    height: 1.2em;
    width: 1.2em;
  }

  .bm-cross {
    background: ${props => props.theme.colors.highlight};
  }

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  .bm-menu {
    background: ${props => props.theme.colors.primary};
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  .bm-item-list {
    padding: 0.8em;
    display: flex;
    flex-direction: column;

    .${activeClassName} {
      border-radius: 0.4em;
      border: 1px solid ${props => props.theme.colors.text};
      background: ${props => props.theme.colors.contrast};
    }
  }

  .bm-item {
    display: inline-block;
    color: ${props => props.theme.colors.highlight};
    border: 1px solid ${props => props.theme.colors.primary};
    padding: 0.7em;
    margin-bottom: 0.25em;
    text-decoration: none;
    text-align: center;
    width: 80%;
    align-self: center;

    transition: all 0.2s;

    &:hover {
      border-radius: 0.4em;
      background: ${props => props.theme.colors.contrast};
      border: 1px solid ${props => props.theme.colors.text};
    }
  }

  .bm-item.${highVisibilityClassName} {
    border: 2px solid ${props => props.theme.colors.text};
    border-radius: 0.4em;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    &:hover {
      color: ${props => props.theme.colors.background};
      background: ${props => props.theme.colors.text};
    }
  }
  .bm-item.${highVisibilityClassName}.${activeClassName} {
    color: ${props => props.theme.colors.background};
    background: ${props => props.theme.colors.text};
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`

const Menu = () => {
  const { menuLinks, searchIndices } = useSiteMetadata()
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <>
      <Header>
        <BurgerBar>
          <Burger width="75%">
            <SearchMobile indices={searchIndices} searchClient={searchClient} />
            {menuLinks.map(link => (
              <Link
                key={link.name}
                to={link.slug}
                className={link.highVisibility ? highVisibilityClassName : ''}
                activeClassName={activeClassName}
              >
                {link.name}
              </Link>
            ))}
          </Burger>
        </BurgerBar>
        <Nav>
          <ul>
            {menuLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.slug}
                  className={link.highVisibility ? highVisibilityClassName : ''}
                  activeClassName={activeClassName}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <SearchDesktop
                indices={searchIndices}
                searchClient={searchClient}
              />
            </li>
          </ul>
        </Nav>
      </Header>
    </>
  )
}

export default Menu
