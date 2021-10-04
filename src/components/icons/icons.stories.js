import React from 'react'
import { css } from 'linaria'

import IconHOC from './icon'
import * as icons from './icons'

export default {
  title: 'Components/Icons',
  component: IconHOC,
}

const Label = css`
  display: block;
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 24px;
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: var(--borderRadius);
  &:hover {
    background-color: var(--color-actionPrimarySubdued);
  }
`

const Grid = css`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  justify-content: space-between;
  justify-items: center;
  margin: 0 0 2em 0;

  & > div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
`

const iconStyle = css`
  font-size: 2em;
`

const iconKeysInAlphaOrder = Object.keys(icons).sort()

export const Icons = () => {
  const iconComponents = iconKeysInAlphaOrder.map((iconKey) => {
    const Icon = icons[iconKey]

    return (
      <div key={iconKey}>
        <div className={Label}>
          <Icon className={iconStyle} /> {iconKey}
        </div>
      </div>
    )
  })

  return <div className={Grid}>{iconComponents}</div>
}
