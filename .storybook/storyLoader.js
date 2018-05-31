import React from 'react'
import styled, { css } from 'react-emotion'
import { storiesOf, addDecorator } from '@storybook/react'
import { configure } from '@storybook/react'

import { SVGSymbols } from '../src/components/Elements/Icons/icon.symbols'

addDecorator(story => {
  const content = story()

  const WrapStories = styled('div')`
    padding: 2em;
    box-sizing: border-box;
    font-family: 'Proxima Nova', 'proxima-nova', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      'Helvetica Neue', Helvetica, sans-serif;
  `

  return (
    <React.Fragment>
      <SVGSymbols />
      <WrapStories>{content}</WrapStories>
    </React.Fragment>
  )
})

const req = require.context('../src/', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
