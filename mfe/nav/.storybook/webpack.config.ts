import baseWebpackConfig from '../../../.storybook/webpack.config.base';
import path from 'path';
import { Configuration } from 'webpack';

const webpackConfig = ({ config }: { config: Configuration }) => {
  const baseConfig = baseWebpackConfig(path.join(__dirname, '../tsconfig.json'))({ config });

  return baseConfig;
};

export default webpackConfig;
