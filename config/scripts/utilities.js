const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const YAML = require('yamljs')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')

const descriptionKey = {
  chrome: '__MSG_extDescriptionGoogleChrome__',
  opera: '__MSG_extDescriptionOpera__',
  yandex: '__MSG_extDescriptionYandex__',
  edge: '__MSG_extDescriptionEdge__',
  vivaldi: '__MSG_extDescriptionVivaldi__',
  brave: '__MSG_extDescriptionBrave__'
}

module.exports = {
  descriptionKey,
  copyPublicFolder: function(paths) {
    fs.copySync(paths.appPublic, paths.appBuildDefault, {
      dereference: true,
      filter: file => file !== paths.appHtml
    })
  },

  copyLocalesFolder: function(paths) {
    if (fs.existsSync(paths.appLocales)) {
      fs.copySync(
        paths.appLocales,
        path.join(paths.appBuildDefault, '_locales'),
        {
          dereference: true,
          filter: file =>
            !(file.includes('strings.json') || file.includes('locales.js'))
        }
      )
    }
  },

  generateManifest: function(paths, key, patch) {
    // Generate the manifest
    const manifest = YAML.load(paths.appManifest)

    if (fs.existsSync(paths.appLocales)) {
      manifest.description = descriptionKey[key]
    }

    fs.writeFileSync(
      path.join(paths.appBuildDefault, 'manifest.json'),
      JSON.stringify(manifest, null, 4)
    )
  },

  getKeys: function(paths, index) {
    const keyPosition = index || 0

    // Warn and crash if required files are missing
    if (!checkRequiredFiles([paths.appKeys])) {
      console.log(chalk.yellow('\nYou`re missing an API key.'))
      console.log(
        chalk.green('Get one from https://getpocket.com/developer/\n')
      )
      process.exit(1)
    }

    return require(paths.appKeys)
  },

  getDefaultKey: function(keys, index) {
    const keyIndex = index || 0
    const defaultKey = Object.keys(keys)[keyIndex]
    const apiKey = keys[defaultKey]

    if (typeof apiKey !== 'string') {
      console.log(chalk.yellow('\nYou`re API key is not formed correctly.'))
      console.log(chalk.green('Check the readme for the correct format.\n'))
      process.exit(1)
    }

    return { key: defaultKey, value: apiKey }
  },

  capitalize: function(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
