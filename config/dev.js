// Rollup plugins.
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'es',
  },
  external: ['ajv', 'final-form', 'final-form-arrays', 'react', 'react-dom', 'react-final-form', 'react-final-form-arrays'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ],
    }),
    commonjs({
      include: /node_modules/
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    })
  ],
  sourcemap: true
}
