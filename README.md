# Save To Pocket Extension

![Save to Pocket Extension](http://assets.getpocket.com/images/github/Save_to_Pocket.png)

## Introduction

Save to Pocket is a browser extension that is used to save pages to a connected Pocket account when clicking a toolbar button, selecting a context menu item, or pressing keyboard shortcut. When a page is saved, a “Page Saved!” notification appears and offers additional actions, including: 

* Add Tags (with support for Suggested Tags for Pocket Premium subscribers)
* Archive Page
* Remove Page
* View List
* Settings

Save to Pocket also includes article Recommendations. These recommendations are displayed below the “Page Saved!” notification and are related to the item that was just saved. 

In addition, when the extension is installed, Save buttons will be injected on Twitter, Hacker News, and Reddit so links posted to these sites can be saved in one click.

## About this Repository

This is the skeleton structure for the Save to Pocket extension codebase.

It leverages an external build script (to be moved to an official repo) to keep things simple when working with the operational code.

At this time it is set up to use the following:

- React
- Redux
- Jest for testing
- Eslint for JS linting
- Babel for ES6/7
- Stylelint for Style linting
- SASS
- CSS modules
- Webpack for compiling

## Updating
As functionality is added the readme should be updated with the module added. Testing coverage thresholds will also be added.


## Conventions

#### React
[React](https://facebook.github.io/react/) is a view library developed by Facebook to create declarative, component based UI.  It will automatically update the UI based on the state of the application using a virtual dom.

#### Redux
[Redux](http://redux.js.org/) is a library used to create a predictable state container.  It uses

#### React-Chrome-Redux
[React Chrome Redux](https://github.com/tshaddix/react-chrome-redux) allows us to build react/redux seamlessly with the background messaging convention in extensions.  The background page holds the Redux store, while Popovers and Content-Scripts act as UI Components, passing actions and state updates between themselves and the background store.

## Getting Started

### Setup
Before you get started you will need to do the following:

1. Register an API key from [https://getpocket.com/developer/](https://getpocket.com/developer/)
2. Create a keys.js file with the folowing format:

```javascript
export function getKey(){
    return 'YOUR_API_KEY_HERE'
}
```

3. Add the file you created to the `src/common/` directory

### Installation
The app is bundled with webpack via node.  You may use Yarn or NPM to run the build/start/test scripts.

`yarn install` OR `npm install`

### Creating a build

Run `yarn start` OR `npm run start`

The build will be placed in `_build` at the root directory.


### Loading The Extension

To load the extension:

1. Open chrome and navigate to [chrome://extensions](chrome://extensions)
2. Check the `Developer mode` in the upper right
3. Select `Load unpacked extension...`
4. Select the `_build` folder when prompted


### Third Party Tools Licenses
-  [autosize-input](https://github.com/JedWatson/react-input-autosize) - MIT License - Copyright (c) 2017 Jed Watson.
-  [blueimp-md5](https://github.com/blueimp/JavaScript-MD5) - MIT License - Copyright (c) 2011 Sebastian Tschan
-  [classnames](https://github.com/JedWatson/classnames) - MIT License - Copyright (c) 2016 Jed Watson.
-  [prop-types](https://github.com/facebook/prop-types) - MIT License - Copyright (c) 2013-present, Facebook, Inc.
-  [react](https://github.com/facebook/react) - MIT License - Copyright (c) 2013-present, Facebook, Inc.
-  [react-chrome-redux](https://github.com/tshaddix/react-chrome-redux) - MIT License - Copyright (c) 2016 Tyler Shaddix
-  [react-dom](https://github.com/facebook/react) - MIT License - Copyright (c) 2013-present, Facebook, Inc.
-  [react-motion](https://github.com/chenglou/react-motion) - MIT License - Copyright (c) 2015 React Motion authors
-  [react-onclickoutside](https://github.com/Pomax/react-onclickoutside) - MIT License
-  [react-redux](https://github.com/reactjs/react-redux) - MIT License - Copyright (c) 2015-present Dan Abramov
-  [redux](https://github.com/reactjs/redux) - MIT License - Copyright (c) 2015-present Dan Abramov
-  [redux-saga](https://github.com/redux-saga/redux-saga) - MIT License - Copyright (c) 2015 Yassine Elouafi
-  [semver](https://github.com/npm/node-semver) - ISC License - Copyright (c) Isaac Z. Schlueter and Contributors

