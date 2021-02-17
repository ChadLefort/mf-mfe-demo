import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

const webpackConfig = (configFile: string) => ({ config }: { config: Configuration }) => {
  const tsPaths = new TsconfigPathsPlugin({
    configFile
  });

  // @ts-ignore
  config.resolve.plugins ? config.resolve.plugins.push(tsPaths) : (config.resolve.plugins = [tsPaths]);

  return config;
};

export default webpackConfig;
