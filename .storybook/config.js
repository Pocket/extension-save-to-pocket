import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options';

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Option defaults:
setOptions({
    name: 'Storybook: Save to Pocket',
    url: 'https://extension.save-to-pocket.getpocket.com',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: false,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    selectedAddonPanel: undefined // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
});

configure(loadStories, module);
