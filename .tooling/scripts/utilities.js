const fs = require('fs-extra')
const path = require('path')
const YAML = require('yamljs')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')

const descriptionKey = {
  chrome: '__MSG_extDescriptionGoogleChrome__',
  opera: '__MSG_extDescriptionOpera__',
  yandex: '__MSG_extDescriptionYandex__',
  edge: '__MSG_extDescriptionEdge__',
  vivaldi: '__MSG_extDescriptionVivaldi__',
  brave: '__MSG_extDescriptionBrave__',
  firefox: '__MSG_extDescriptionFirefox__'
}

module.exports = {
  descriptionKey,
  copyPublicFolder: function(paths) {
    fs.copySync(paths.appPublic, paths.dev, {
      dereference: true,
      filter: file => file !== paths.appHtml
    })
  },

  copyLocalesFolder: function(paths) {
    if (fs.existsSync(paths.locales)) {
      fs.copySync(paths.locales, path.join(paths.dev, '_locales'), {
        dereference: true,
        filter: file =>
          !(file.includes('strings.json') || file.includes('locales.js'))
      })
    }
  },

  generateManifest: function(paths, key, patch) {
    // Generate the manifest
    const manifest = YAML.load(paths.manifest)

    if (fs.existsSync(paths.locales)) {
      manifest.description = descriptionKey[key]
    }

    fs.writeFileSync(
      path.join(paths.dev, 'manifest.json'),
      JSON.stringify(manifest, null, 4)
    )
  },

  getKeys: function(paths, index) {
    const keyPosition = index || 0

    // Warn and crash if required files are missing
    if (!checkRequiredFiles([paths.keys])) {
      console.log(chalk.yellow('\nYou`re missing an API key.'))
      console.log(
        chalk.green('Get one from https://getpocket.com/developer/\n')
      )
      process.exit(1)
    }

    return require(paths.keys)
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
  }
}
