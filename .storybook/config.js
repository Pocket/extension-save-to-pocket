import React from 'react'
import { addParameters, configure, addDecorator } from '@storybook/react'
import { create, themes } from '@storybook/theming'
import styled from '@emotion/styled'
import PocketLogo from './pocket_logo_wordmark.svg'

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Add story decorator
const WrapStories = styled('div')`
  width: 335px;
  position: relative;
`

addDecorator(story => {
  const content = story()

  return <WrapStories>{content}</WrapStories>
})

// Option defaults:
addParameters({
  options: {
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: false,
    /**
     * where to show the addon panel
     * @type {('bottom'|'right')}
     */
    panelPosition: 'bottom',
    /**
     * sorts stories
     * @type {Boolean}
     */
    sortStoriesByKind: true,
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\//,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: true,
    /**
     * show/hide tool bar
     * @type {Boolean}
     */
    isToolshown: false,
    /**
     * theme storybook, see link below
     */
    theme: create({
      base: 'light',

      // Typography
      fontBase: '"Graphik Web", sans-serif',

      brandTitle: 'Pocket Web App',
      brandUrl: 'https://app.getpocket.com',
      brandImage: PocketLogo
    })
  }
})

configure(loadStories, module)
