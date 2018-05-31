import React from 'react'
import styled, { css } from 'react-emotion'
import { Shades, Colors } from 'Elements/Colors/colors'

const divider = css`
  background-color: ${Shades.snow};
  content: '';
  display: block;
  height: 1px;
  margin: 5px auto;
  width: 90 %;
`

const ItemWrapper = styled('li')`
  display: block;
  text-align: left;
  &:before {
    ${props => (props.divider ? divider : '')};
  }
`

const ItemButton = styled('button')`
  all: unset;
  color: ${Shades.overcast};
  cursor: pointer;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 16px;
  padding: 5px 30px 5px 18px;
  width: 100%;

  &:hover {
    background-color: ${Colors.teal};
    color: ${Shades.white};
  }
`

export default function dropdownItem(entryObject, index) {
  const { divider, method, copy, icon } = entryObject

  return (
    <ItemWrapper key={index} divider={divider}>
      <ItemButton onClick={method}>
        {icon} {copy}
      </ItemButton>
    </ItemWrapper>
  )
}
