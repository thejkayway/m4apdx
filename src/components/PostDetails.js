import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  margin: 0 auto 2em;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  span {
    margin: 0 0.5rem;
  }
`

const Date = styled.p`
  display: inline-block;
`

const ReadingTime = styled.p`
  display: inline-block;
`

const Url = styled.a`
  margin: 1rem 1rem 0 1rem;
  text-decoration: none;
  color: gray;
`

const PostDetails = props => {
  return (
    <Wrapper>
      <Date>📅 {props.date}</Date>
      {props.timeToRead && <span>•</span>}
      {props.timeToRead && <ReadingTime>{`⏱️${props.timeToRead} min read `}</ReadingTime>}
      {props.url && <Url href={props.url}>{props.url}</Url>}
    </Wrapper>
  )
}

export default PostDetails
