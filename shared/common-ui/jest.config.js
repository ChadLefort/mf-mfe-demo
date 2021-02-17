const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../../config/tsconfig.app.json');

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  displayName: '@fake-company/common-ui',
  coverageDirectory: '../../coverage/shared/common-ui'
};
