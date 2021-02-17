import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Compiler, Configuration, DefinePlugin, WebpackOptionsNormalized, WebpackPluginInstance } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

declare module 'webpack' {
  interface Configuration {
    devServer?: { static?: string; dev?: { publicPath?: string } } & WebpackDevServer.Configuration;
  }
}

export const moduleFederationShared = {
  axios: { singleton: true, requiredVersion: '>=0.21.1' },
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router-dom': { singleton: true },
  '@material-ui/core': { singleton: true },
  '@material-ui/styles': { singleton: true }
};

const webpackConfig = (name: string, entry: string | undefined, outputPath: string) => (
  argv: WebpackOptionsNormalized
): Configuration => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  return {
    entry,
    devtool: isDevelopment && 'inline-cheap-module-source-map',
    target: isDevelopment ? 'web' : 'browserslist',
    resolve: {
      plugins: [
        // @ts-ignore because of defintion issue with webpack 4 types
        new TsconfigPathsPlugin()
      ],
      modules: [path.join(__dirname, '../node_modules'), path.join(__dirname, '../node_modules/.pnpm/node_modules')],
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      filename: `${name}.bundle.js`,
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
            configFile: path.join(__dirname, '../.babelrc')
          }
        },
        {
          test: /\.css$/,
          use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(scss|sass)$/,
          use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/inline'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: /\.[jt]sx$/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: { not: [/\.[jt]sx$/] },
          type: 'asset/inline'
        }
      ]
    },
    stats: 'errors-warnings',
    devServer: {
      host: 'localhost',
      hot: false,
      compress: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          secure: false
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    optimization: {
      minimizer: [
        // @ts-ignore because of defintion issue with webpack 4 types
        new CssMinimizerPlugin(),
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
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: ([
      isProduction && new CleanWebpackPlugin(),
      isProduction && new MiniCssExtractPlugin(),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode)
        }
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}'
        }
      })
    ] as WebpackPluginInstance | ((this: Compiler, compiler: Compiler) => void)[]).filter(Boolean)
  };
};

export default webpackConfig;
