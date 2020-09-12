const paths = require('./paths');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap ? 'source-map' : false
      : isEnvDevelopment && 'eval-cheap-module-source-map',
    entry: [
      paths.appIndexJs,
    ],
    output: {
      path: paths.appBuild,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? '[name].js'
        : isEnvDevelopment && '[name].dev.js'
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // Adapted from renderer/webpack.config.js
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: shouldUseSourceMap,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
        }
      },
    },
    resolve: {
      modules: ['node_modules'],
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(paths.appSrc),
      ]
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|ts)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                // TODO: change formatter
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        {
          test: /\.(js|ts)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            compact: isEnvProduction,
          },
        }
      ]
    },
    plugins: [
      // module not found plugin
      // case sensitive paths
      // watch missing node modules
      // forktschecker
    ].filter(Boolean),
    target: 'electron-main',
  };
};