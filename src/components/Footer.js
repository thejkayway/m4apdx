import React from 'react'
import styled from '@emotion/styled'
import { SocialIcon } from 'react-social-icons';

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidth};
`

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  padding: 0.5em 0 1em;
  margin: 0 1.5em;
`

const Item = styled.li`
  display: inline-block;
  padding: 0.25em 0;
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    width: auto;
  }
  a {
    font-weight: 600;
    transition: all 0.2s;
    color: ${props => props.theme.colors.text};
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
    &:visited {
      color: ${props => props.theme.colors.text};
    }
  }
  .social-icon {
    margin-right: 1em;
  }
`

const Footer = () => (
  <Wrapper>
    <List>
      <Item>
        <a
          href="https://www.bk.com/"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <img
            src="https://images.ctfassets.net/7sv3zhq42l8v/7hAULZQuiXnAO3F9O7Se1O/0e4fcab3b057139a5615843617e783dc/M4A_Poster_New_2.png"
            style={{ width: '100px' }}
            alt="Medicare for All PDX Logo"
          />
        </a>
      </Item>
      <Item>
        <SocialIcon url="https://www.facebook.com/Central.Intelligence.Agency" label="Portland M4A Facebook Page" />
        <SocialIcon url="https://instagram.com/arbys" label="Portland M4A Instagram Page" />
        <SocialIcon url="https://twitter.com/thejkayway" label="Portland M4A Twitter Page" />
      </Item>
    </List>
  </Wrapper>
)

export default Footer
