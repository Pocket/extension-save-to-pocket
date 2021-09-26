import path from 'path'
import linaria from 'linaria/rollup'
import css from 'rollup-plugin-css-only'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import { chromeExtension } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'
import keys from './keys.json' // See README on how to get a key

const isProduction = process.env.NODE_ENV === 'production'
const projectRootDir = path.resolve(__dirname)

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'build',
    format: 'esm',
    chunkFileNames: path.join('chunks', '[name]-[hash].js'),
  },
  onwarn: function onwarn(warning, warn) {
    if (warning.code === 'FILE_NAME_CONFLICT') return // We are require to conflict due to manifest
    warn(warning)
  },
  plugins: [
    chromeExtension({ verbose: false }),
    alias({
      entries: {
        actions: path.resolve(projectRootDir, 'src/actions.js'),
        assets: path.resolve(projectRootDir, 'src/assets'),
        common: path.resolve(projectRootDir, 'src/common'),
        components: path.resolve(projectRootDir, 'src/components'),
        connectors: path.resolve(projectRootDir, 'src/connectors'),
        containers: path.resolve(projectRootDir, 'src/containers'),
        pages: path.resolve(projectRootDir, 'src/pages'),
      },
    }),
    // Replace environment variables
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    replace({
      preventAssignment: false,
      __consumerKey__: keys.chrome,
    }),
    resolve(),
    commonjs({
      exclude: 'src/**',
    }),
    linaria(),
    babel({
      // Do not transpile dependencies
      ignore: ['node_modules'],
      babelHelpers: 'bundled',
    }),
    css({ output: 'assets/pocket-save-extension.css' }),

    // Empties the output dir before a new build
    emptyDir(),
    copy({
      targets: [
        { src: 'src/assets/fonts/*', dest: 'build/assets/fonts' },
        { src: 'src/assets/images/*', dest: 'build/assets/images' },
      ],
      hook: 'writeBundle',
    }),
    // Outputs a zip file in ./releases
    isProduction && zip({ dir: 'releases' }),
  ],
}
