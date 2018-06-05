import React from 'react'
import styled, { css } from 'react-emotion'
import { Shades, Colors } from 'Elements/Colors/colors'
import { Icon } from 'Elements/Icons/icon'
import { localize } from 'Common/_locales/locales'
import { MenuDivider } from 'Elements/Foundations/foundation'

const ItemWrapper = styled('li')`
  display: block;
  text-align: left;
  &:before {
    ${props => (props.divider ? MenuDivider : '')};
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

export function OverflowItem({ name, method, divider }) {
  return (
    <ItemWrapper divider={divider}>
      <ItemButton onClick={method}>
        <Icon name={name} /> {localize('actions', name)}
      </ItemButton>
    </ItemWrapper>
  )
}
