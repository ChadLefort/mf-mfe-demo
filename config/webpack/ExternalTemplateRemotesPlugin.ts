import webpack from 'webpack';
import { RawSource } from 'webpack-sources';

const extractUrlAndGlobal = require('webpack/lib/util/extractUrlAndGlobal');
const PLUGIN_NAME = 'ExternalTemplateRemotesPlugin';

type Module = { externalType: string; request: string } & webpack.Module;

export class ExternalTemplateRemotesPlugin implements webpack.WebpackPluginInstance {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.make.tap(PLUGIN_NAME, (compilation) => {
      const scriptExternalModules: webpack.Module[] = [];

      compilation.hooks.buildModule.tap(PLUGIN_NAME, (module) => {
        if (module.constructor.name === 'ExternalModule' && (module as Module).externalType === 'script') {
          scriptExternalModules.push(module);
        }
      });

      compilation.hooks.afterCodeGeneration.tap(PLUGIN_NAME, function () {
        scriptExternalModules.forEach((module) => {
          const urlTemplate = (extractUrlAndGlobal((module as Module).request) as string[])[0];
          const urlExpression = toExpression(urlTemplate);
          // @ts-ignore
          const sourceMap = compilation.codeGenerationResults.get(module).sources as Map<string, RawSource>;
          const rawSource = sourceMap.get('javascript');
          sourceMap.set(
            'javascript',
            new RawSource((rawSource?.source() as string).replace(`"${urlTemplate}"`, urlExpression))
          );
        });
      });
    });
  }
}

const toExpression = (templateUrl: string) => {
  const result: string[] = [];
  const current: string[] = [];
  let isExpression = false;
  let invalid = false;

  for (const c of templateUrl) {
    if (c === '[') {
      if (isExpression) {
        invalid = true;
        break;
      }

      isExpression = true;

      if (current.length) {
        result.push(`"${current.join('')}"`);
        current.length = 0;
      }
    } else if (c === ']') {
      if (!isExpression) {
        invalid = true;
        break;
      }

      isExpression = false;

      if (current.length) {
        result.push(`${current.join('')}`);
        current.length = 0;
      }

      current.length = 0;
    } else {
      current.push(c);
    }
  }

  if (isExpression || invalid) {
    throw new Error(`Invalid template URL "${templateUrl}"`);
  }

  if (current.length) {
    result.push(`"${current.join('')}"`);
  }

  return result.join(' + ');
};
