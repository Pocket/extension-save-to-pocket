import React from 'react'
import styled from 'react-emotion'
import { Shades, Colors } from 'Elements/Colors/colors'
import { Icon } from 'Elements/Icons/icon'
import { localize } from 'Common/_locales/locales'
import { MenuDivider } from 'Elements/Foundations/foundation'
import { buttonReset } from 'Elements/Buttons/button'

const ItemWrapper = styled('li')`
  display: block;
  text-align: left;
  &:before {
    ${props => (props.divider ? MenuDivider : '')};
  }
`

const ItemButton = styled('button')`
  ${buttonReset};
  color: ${Shades.overcast};
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
        <Icon name={name} margin="0 8px 0 0" /> {localize('actions', name)}
      </ItemButton>
    </ItemWrapper>
  )
}
