import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import './legacyCodePolyfills'
import './setupEnzyme'
import fs from 'fs-extra'

fs.mkdirp('./.debug') // create debug directory used in tests
registerRequireContextHook(); // required for storyshots to use webpack require.context
