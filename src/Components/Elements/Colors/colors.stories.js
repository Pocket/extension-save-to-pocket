import React from 'react'
import styled, { css } from 'react-emotion'
import { storiesOf } from '@storybook/react'
import { Colors, Shades } from './colors'
import { PanelBase } from '../Foundations/foundation'

const ColorGrid = styled('div')`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 200px);
`

const ColorDisplay = styled('div')`
  ${PanelBase};
  display: inline-flex;
  flex-direction: column;
  width: 12em;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 6px;
  justify-content: center;
  overflow: hidden;
`

const ColorBlock = styled('div')`
  background-color: ${props => (props.color ? props.color : '#f7f7f7')};
  display: block;
  height: 5em;
  width: 100%;
  border-radius: 4px 4px 0 0;
`

const ColorContent = css`
  font-size: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding: 10px 0;
  text-transform: uppercase;
`

const ColorName = styled('div')`
  ${ColorContent};
  border-bottom: 1px solid ${Shades.snow};
`
const ColorDetail = styled('div')`
  ${ColorContent};
  display: block;
`

storiesOf('Elements|Colors', module)
  .addDecorator(story => <div>{story()}</div>)
  .add('Colors', () => displayColors({ Colors, Shades }))

function displayColors(colorObject) {
  return Object.keys(colorObject).map(colorType => {
    const colors = colorObject[colorType]

    return (
      <div>
        <h1
          className={css`
            font-weight: 100;
          `}>
          {colorType}
        </h1>
        <ColorGrid>
          {Object.keys(colors).map((color, index) => (
            <ColorDisplay color={colors[color]} key={color + index}>
              <ColorBlock color={colors[color]} />
              <ColorName color={colors[color]}>{color}</ColorName>
              <ColorDetail>Hex: {colors[color]}</ColorDetail>
            </ColorDisplay>
          ))}
        </ColorGrid>
      </div>
    )
  })
}

/*
          <ColorDisplay color={colors[color]} key={color + index}>
            <ColorBlock color={colors[color]} />
            <ColorName color={colors[color]}>{color}</ColorName>
            <ColorDetail>Hex: {colors[color]}</ColorDetail>
          </ColorDisplay>
          */
