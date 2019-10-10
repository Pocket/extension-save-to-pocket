'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../env')

const fs = require('fs-extra')
const utilities = require('./utilities.js')
const path = require('path')
const YAML = require('yamljs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')

const paths = require('../paths')
const configFactory = require('../webpack.config')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
// if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
//   process.exit(1)
// }

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    'If this was unintentional, check that you haven’t mistakenly set it in your shell.'
  )
  console.log(
    `Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`
  )
  console.log()
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    const config = configFactory('development')

    // Merge with the public folder
    utilities.copyPublicFolder(paths)
    utilities.copyLocalesFolder(paths)
    buildManifest()

    // Webpack watch
    webpack(config).watch({}, (err, stats) => {
      if (err) {
        console.error(err)
      }

      console.error(
        stats.toString({
          chunks: false,
          colors: true
        })
      )
    })
    ;['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        process.exit()
      })
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

function buildManifest() {
  const keys = utilities.getKeys(paths)
  const manifest = YAML.load(paths.appManifest)
  const key = 'chrome'

  fs.outputFile(
    path.join(paths.appBuildDefault, 'js/key.js'),
    `const CONSUMER_KEY = '${keys[key]}'`
  )

  manifest.description = utilities.descriptionKey[key]

  fs.writeFileSync(
    path.join(paths.appBuildDefault, 'manifest.json'),
    JSON.stringify(manifest, null, 4)
  )
}
