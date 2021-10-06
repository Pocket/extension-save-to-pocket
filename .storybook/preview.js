import React from 'react'
import { GlobalVariables } from "../src/pages/injector/globalStyles"
import { cx } from 'linaria'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <div className={cx(GlobalVariables, 'pocket-theme-light')}>
      <Story />
    </div>
  ),
]
