const path = require('path');
const { config } = require('@granite-js/react-native/jest');

module.exports = config({
  rootDir: __dirname,
  moduleNameMapper: {
    '@babel/runtime(.*)': `${path.dirname(require.resolve('@babel/runtime/package.json'))}$1`,
  },
});

