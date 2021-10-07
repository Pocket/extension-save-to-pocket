import React from 'react'
import { GlobalVariables } from 'pages/injector/globalStyles'
import { css, cx } from 'linaria'

const storyWrapperStyles = css`
  height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;
  font-family: var(--fontSansSerif);
  background-color: var(--color-canvas);
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
