import { pluginTester } from 'babel-plugin-tester'
import plugin from '../src'
import path from 'path'

pluginTester({
  plugin: plugin,
  snapshot: true,
  fixtures: path.join(__dirname, 'fixtures'),
  fixtureOutputName: 'snapshot',
  babelOptions: {
    presets: ['@babel/preset-typescript'],
    plugins: ['@babel/plugin-syntax-jsx'],
  },
})
