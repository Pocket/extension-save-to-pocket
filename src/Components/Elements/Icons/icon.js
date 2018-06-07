import React from 'react'
import styled from 'react-emotion'

const MissingIcon = styled('span')`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
  background-color: #f00ba2;
`

export const Icon = ({
  name,
  size = '1.4em',
  padding = '0',
  margin = '0',
  color = 'currentColor',
  style = {}
}) => {
  return name ? (
    <svg
      style={{
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'middle',
        height: size,
        width: size,
        fill: color,
        padding: padding,
        margin: margin,
        ...style
      }}>
      <use xlinkHref={`#${name}`} />
    </svg>
  ) : (
    <MissingIcon />
  )
}
