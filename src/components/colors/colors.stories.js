import React from 'react';
import { css } from 'linaria'
import { COLORS } from './colors'

const colorBlock = css`
  display: flex;
  align-items: center;
  align-content: center;
`
const swatch = css`
  width: 48px;
  height: 48px;
  background-color: transparent;
`

const name = css`
  padding-left: 10px;
`

export default {
  title: 'Components/Colors',
  component: Colors,
};

export const Colors = () => {
  return Object.keys(COLORS).map(color => {
    return (
      <div className={colorBlock}>
        <div className={swatch} key={color} style={{ backgroundColor: `${COLORS[color]}` }}/>
        <div className={name}>{color}</div>
      </div>
    )
  })
}
