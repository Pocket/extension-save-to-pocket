const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const alias = {
      actions: path.join(__dirname, '../src/actions'),
      assets: path.join(__dirname, '../src/assets'),
      common: path.join(__dirname, '../src/common'),
      components: path.join(__dirname, '../src/components'),
      connectors: path.join(__dirname, '../src/connectors'),
      pages: path.join(__dirname, '../src/pages'),
    }
    config.resolve.alias = { ...config.resolve.alias, ...alias }

    // add support for Linaria preprocessing
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        }
      ]
    })

    // Return the altered config
    return config
  }
}
