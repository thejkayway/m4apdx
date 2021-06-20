import React from 'react'
import { Link } from 'gatsby'
import { slide as Burger } from 'react-burger-menu'
import styled from '@emotion/styled'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const activeClassName = 'currentlyActive'

const Header = styled.header`
  background: ${props => props.theme.colors.primary};
  width: 100%;
  padding: 1.5em 0;
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
    &:last-of-type {
      a {
        border: 2px solid ${props => props.theme.colors.text};
        border-radius: 0.4em;
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        &:hover {
          color: ${props => props.theme.colors.background};
          background: ${props => props.theme.colors.text};
        }
      }
      .${activeClassName} {
        color: ${props => props.theme.colors.background};
        background: ${props => props.theme.colors.text};
      }
    }
    white-space: nowrap;
  }

  a {
    text-decoration: none;
    border-radius: 0.4em;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.highlight};
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

    transition: all 0.2s;

    &:hover {
      border-radius: 0.4em;
      background: ${props => props.theme.colors.contrast};
      border: 1px solid ${props => props.theme.colors.text};
    }

    &:last-of-type {
      border: 2px solid ${props => props.theme.colors.text};
      border-radius: 0.4em;
      background: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
      &.${activeClassName} {
        color: ${props => props.theme.colors.background};
        background: ${props => props.theme.colors.text};
      }
      &:hover {
        color: ${props => props.theme.colors.background};
        background: ${props => props.theme.colors.text};
      }
    }
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`

const Menu = () => {
  const { menuLinks } = useSiteMetadata()
  return (
    <>
    <Header>
        <BurgerBar><Burger width='65%'>
            {menuLinks.map(link => (
                <Link key={link.name} to={link.slug} activeClassName={activeClassName}>
                  {link.name}
                </Link>
            ))}
          </Burger></BurgerBar>
        <Nav>
          <ul>
            {menuLinks.map(link => (
              <li key={link.name}>
                <Link to={link.slug} activeClassName={activeClassName}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Nav>
    </Header>
    </>
  )
}

export default Menu
