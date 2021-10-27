# Save To Pocket Extension

![Save to Pocket Extension](http://assets.getpocket.com/images/github/Save_to_Pocket.png)

## Introduction

Save to Pocket is a browser extension that is used to save pages to a connected Pocket account when clicking a toolbar button, selecting a context menu item, or pressing keyboard shortcut. When a page is saved, a “Saved to Pocket” notification appears and offers additional actions, including:

- Add Tags (with support for Suggested Tags for Pocket Premium subscribers)
- Remove Page
- View List
- Settings

## About this Repository

This is the skeleton structure for the Save to Pocket extension codebase.

It leverages a `rollup` build script to keep things simple when working with the operational code.

At this time it is set up to use the following:

- React
- Jest for testing
- Eslint for JS linting
- Babel for ES6/7
- Linaria
- Rollup
- Storybook

## Getting Started

### High level steps

1. [Prepare your project](#setupanchor)
1. [Install dependencies](#installanchor)
1. [Create a development/production build](#buildanchor)
1. [Load the extension into your browser](#loadinganchor)

---

<a name="setupanchor"></a>

### Setup

Before you get started you will need to do the following:

1. Register an API key from [https://getpocket.com/developer/](https://getpocket.com/developer/)
2. Create a keys.json file in the root directory of the project with the
   folowing format:

```json
{
  "browserName": "key"
}
```

3. During the build process it will inject the key into the manifest file

<a name="installanchor"></a>

### Installation

The app is bundled with rollup via node. You may use NPM to run the build/start/test scripts.

`npm install`

<a name="buildanchor"></a>

### Creating a build

##### _Development_

Run `npm run build`

This will create an optimized build and place it inside `_build` at the root
directory.

Running `npm run storybook` will open a development envorinment to allow for building and testing of simple components.

##### _Production_

Run `npm run release`

This will create an optimized build, zip it up, and place it inside `_releases` at the root
directory.

<a name="loadinganchor"></a>

### Loading The Extension

To load the extension:

1. Open chrome and navigate to [chrome://extensions](chrome://extensions)
2. Check the `Developer mode` in the upper right
3. Select `Load unpacked extension...`
4. Select the `_build` folder when prompted.

---

### Package Deployment

TBD

## Third Party Tools Licenses

- [downshift](https://github.com/downshift-js/downshift) - MIT License (MIT) Copyright (c) 2017 PayPal
- [linaria](https://github.com/callstack/linaria) - MIT License (MIT) Copyright (c) 2017 Callstack
- [match-sorter](https://github.com/kentcdodds/match-sorter) - MIT License (MIT) Copyright (c) 2020 Kent C. Dodds
- [prop-types](https://github.com/facebook/prop-types) - MIT License (MIT) Copyright (c) 2013-present, Facebook, Inc.
- [react](https://github.com/facebook/react) - MIT License (MIT) Copyright (c) 2013-present, Facebook, Inc.
- [react-dom](https://github.com/facebook/react) - MIT License (MIT) Copyright (c) 2013-present, Facebook, Inc.
- [autosize-input](https://github.com/JedWatson/react-input-autosize) - MIT License (MIT) Copyright (c) 2017 Jed Watson.
- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) - Mozilla Public License Version 2.0

- [babel](https://github.com/babel/babel) - MIT License (MIT) Copyright (c) 2014-present Sebastian McKenzie and other contributors
- [rollup](https://github.com/rollup/rollup) - MIT License (MIT) Copyright (c) 2017 [contributers](https://github.com/rollup/rollup/graphs/contributors)
- [storybook](https://github.com/storybookjs/storybook/) - MIT License (MIT) Copyright (c) 2017 Kadira Inc.
- [types](https://github.com/DefinitelyTyped/DefinitelyTyped) - MIT License (MIT)
- [cross-env](https://github.com/kentcdodds/cross-env) - MIT License (MIT) Copyright (c) 2017 Kent C. Dodds
- [eslint](https://github.com/eslint/eslint) - Copyright (c) OpenJS Foundation
- [jest](https://github.com/facebook/jest) - MIT License (MIT) Copyright (c) Facebook, Inc.
- [prettier](https://github.com/prettier/prettier) - MIT License (MIT) Copyright (c) James Long
- [styled-jsx](https://github.com/vercel/styled-jsx) - MIT License (MIT) Copyright (c) 2016-present Vercel, Inc.
