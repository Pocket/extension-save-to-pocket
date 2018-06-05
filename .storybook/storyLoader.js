import React from 'react'
import styled, { css } from 'react-emotion'
import { storiesOf, addDecorator } from '@storybook/react'
import { configure } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { Themes } from 'Elements/Themes/themes'

import { SVGSymbols } from 'Elements/Icons/icon.symbols'
import { SVGForStories } from './svg.guides'

addDecorator(story => {
  const content = story()
  const themeArray = ['light', 'dark']

  const WrapStories = styled('div')`
    margin: 2em;
    box-sizing: border-box;
    font-family: 'Proxima Nova', 'proxima-nova', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
      'Helvetica Neue', Helvetica, sans-serif;
    width: 320px;
  `

  return (
    <React.Fragment>
      <SVGForStories />
      <SVGSymbols />
      <ThemeProvider theme={Themes['light']}>
        <WrapStories>{content}</WrapStories>
      </ThemeProvider>
    </React.Fragment>
  )
})

const req = require.context('../src/', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
