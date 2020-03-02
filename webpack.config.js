const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    mode: devMode ? 'development' : 'production',

    performance: {
      hints: 'warning'
    },

    optimization: {
      minimize: devMode ? false : true,
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        })
      ]
    },

    entry: [
      './assets/javascript/main.js',
      './assets/stylesheet/main.scss'
    ],

    output: {
      filename: devMode ? 'main.js' : 'main-[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      sourceMapFilename: '[file].map'
    },

    resolve: {
      symlinks: true,
      modules: [
        path.resolve(__dirname, 'vendor'),
        path.resolve(__dirname, 'assets/javascript'),
        'node_modules'
      ],
      alias: {
        vendor: path.resolve('/wp-content/themes/fogaonetv2/vendor')
      }
    },

    devtool: devMode ? 'source-map' : false,

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: devMode ? true : false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode ? true : false
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? 'main.css' : 'main-[contenthash].css',
        chunkFilename: '[id].css'
      }),
      new ManifestPlugin({
        fileName: 'assets-manifest.json'
      })
    ]
  }
}
