import baseWebpackConfig from '../../webpack.config.base';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const webpackConfig = (env: { production: string; development: string }) => {
  const { name } = require(`./package.json`);
  const config = baseWebpackConfig(name, './src/app.tsx', path.join(__dirname, '/dist'))(env);

  config.plugins?.unshift(
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  );

  return config;
};

export default webpackConfig;
