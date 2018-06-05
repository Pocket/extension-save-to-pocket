import React from 'react'
import styled from 'react-emotion'

const TagErrorWrapper = styled('div')`
  background: #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  left: 0;
  margin-top: 0.7em;
  padding: 0.5em 0.7em;
  position: absolute;
  top: 100%;
  width: 100%;
  & > div {
    transition: width 0.1s linear;
  }
`
const TagError = ({ characterLimit }) => {
  return (
    <TagErrorWrapper>
      Tags are limited to {characterLimit} characters
    </TagErrorWrapper>
  )
}

export default TagError
