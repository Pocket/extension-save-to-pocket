module.exports = {
  rootDir: '../../../',
  setupFiles: ['<rootDir>/.tooling/config/jest/setup/main.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules', 'src', 'src/Components'],
  moduleNameMapper: {
    // 'Common(.*)': '<rootDir>/src/common/$1',
    // 'Components(.*)': '<rootDir>/src/components/$1',
    // 'Containers(.*)': '<rootDir>/src/containers/$1',
    // 'Store(.*)': '<rootDir>/src/store/$1'
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
