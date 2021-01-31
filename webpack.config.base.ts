import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Configuration, WebpackOptionsNormalized } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const webpackConfig = (name: string, entry: string, outputPath: string) => (
  argv: WebpackOptionsNormalized
): Configuration => ({
  entry,
  ...(argv.mode !== 'development' ? {} : { devtool: 'inline-cheap-module-source-map' }),
  resolve: {
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin()
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: `${name}.[contenthash].bundle.js`,
    path: outputPath,
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /bootstrap\.(ts|tsx|js|jsx)$/,
        loader: 'bundle-loader',
        options: {
          lazy: true
        }
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.join(__dirname, '/.babelrc')
        }
      }
    ]
  },
  devServer: {
    stats: 'errors-warnings',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}'
      }
    })
  ]
});

export default webpackConfig;
