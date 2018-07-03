import React from 'react'
import styled from 'react-emotion'
import { Colors, Shades } from 'Elements/Colors/colors'

const TagErrorWrapper = styled('div')`
  background: ${Colors.hotCoral};
  color: ${Shades.white};
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
    <TagErrorWrapper data-positioned>
      Tags are limited to {characterLimit} characters
    </TagErrorWrapper>
  )
}

export default TagError
