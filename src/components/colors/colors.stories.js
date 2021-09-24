import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '@emotion/styled'
import { COLORS } from './colors'

const ColorBlock = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
`
const Swatch = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => COLORS[props.color]};
`

const Name = styled.div`
  padding-left: 10px;
`

storiesOf('Elements | Colors', module).add('swatches', () => {
  return Object.keys(COLORS).map(color => {
    return (
      <ColorBlock>
        <Swatch color={color} key={color} />
        <Name>{color}</Name>
      </ColorBlock>
    )
  })
})
