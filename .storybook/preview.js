import React from 'react'
import { GlobalVariables } from "../src/pages/injector/globalStyles"
import { css, cx } from 'linaria'

const storyWrapperStyles = css`
  height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;

  &.pocket-theme-dark {
    background-color: black;
  }
`

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen'
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'chromatic',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark']
    }
  }
}

export const decorators = [
  (Story, context) => (
    <div className={cx(GlobalVariables, storyWrapperStyles, `pocket-theme-${context.globals.theme}`)}>
      <Story />
    </div>
  )
]
