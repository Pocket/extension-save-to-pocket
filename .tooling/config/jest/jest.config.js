module.exports = {
  rootDir: '../../../',
  setupFiles: ['<rootDir>/.tooling/config/jest/setup/main.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'pocket/common/(.*)': '<rootDir>/src/common/$1',
    'pocket/components/(.*)': '<rootDir>/src/components/$1',
    'pocket/containers/(.*)': '<rootDir>/src/containers/$1',
    'pocket/store/(.*)': '<rootDir>/src/store/$1'
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.(css)$': '<rootDir>/.tooling/config/jest/setup/cssTransform.js',
    // Transform file imports into file names
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.tooling/config/jest/setup/fileTransformer.js'
  },
  testMatch: ['<rootDir>/**/**/*.test.js']
}
