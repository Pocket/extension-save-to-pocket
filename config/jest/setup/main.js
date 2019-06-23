require('./requestAnimationFrame.js')
require('./legacyCodePolyfills.js')
require('./setupEnzyme.js')
const fs = require('fs-extra')
fs.mkdirp('./.debug') // create debug directory used in tests
