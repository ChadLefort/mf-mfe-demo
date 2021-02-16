const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../../config/tsconfig.app.json');

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  displayName: 'mfe_contacts',
  coverageDirectory: '../../coverage/shared/contacts'
};
