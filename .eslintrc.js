module.exports = {
  overrides: [
    {
      files: ['*.test.js'],
      env: { jest: true },
    },
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
    webextensions: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'skipUndeclared',
  },
}
