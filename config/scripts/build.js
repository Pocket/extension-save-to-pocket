'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../env')
const utilities = require('./utilities.js')
const path = require('path')
const YAML = require('yamljs')
const chalk = require('react-dev-utils/chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const configFactory = require('../webpack.config')
const paths = require('../paths')
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
// if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
//   process.exit(1)
// }

// Generate configuration
const config = configFactory('production')

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    return measureFileSizesBeforeBuild(paths.appBuildDefault)
  })
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild)

    // Merge with the public folder
    utilities.copyPublicFolder(paths)
    utilities.copyLocalesFolder(paths)

    // Start the webpack build
    return build(previousFileSizes)
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('\n⚠ ... Compiled with warnings.\n'))
        console.log(warnings.join('\n\n'))
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        )
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        )
      } else {
        console.log(chalk.green('✔ ... Compiled successfully.'))
        deploy()
      }

      // console.log()
      // console.log('File sizes after gzip:\n')
      // printFileSizesAfterBuild(
      //   stats,
      //   previousFileSizes,
      //   paths.appBuildDefault,
      //   WARN_AFTER_BUNDLE_GZIP_SIZE,
      //   WARN_AFTER_CHUNK_GZIP_SIZE
      // )
      // console.log()
    },
    err => {
      console.log(chalk.red('✖ ... Failed to compile.\n'))
      printBuildError(err)
      process.exit(1)
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log()
  console.log(chalk.blue('🚜 ... Creating an optimized production build.'))

  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages
      if (err) {
        if (!err.message) {
          return reject(err)
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: []
        })
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        )
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings
      })
    })
  })
}

function deploy() {
  console.log()
  console.log(chalk.green('🚀 ... Begin Deployment'))

  const keys = utilities.getKeys(paths)
  const manifest = YAML.load(paths.appManifest)

  Object.keys(keys).map(key => {
    fs.copySync(paths.appBuildDefault, path.join(paths.appBuild, key), {
      dereference: true
    })

    fs.outputFile(
      path.join(paths.appBuild, `${key}/js/key.js`),
      `const CONSUMER_KEY = '${keys[key]}'`
    )

    manifest.description = utilities.descriptionKey[key]

    fs.writeFileSync(
      path.join(paths.appBuild, `${key}/manifest.json`),
      JSON.stringify(manifest, null, 4)
    )

    console.log(
      `${chalk.green('✔ ')} ... ${chalk.blue(
        utilities.capitalize(key)
      )} bundle created`
    )
  })

  console.log(chalk.green('👍 ... Deployment Complete.'))
  console.log()
}
