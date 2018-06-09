const webpack = require('webpack');
const resolve = require('path').resolve;//当前目录的绝对路径
const shelljs = require('shelljs');// node 平台可以使用shell命令行
const _ = require('lodash');
const pkg = require('./package.json');//获取package.json中的信息

const entry = {
  G6: './src/index.js',
  G6Plugins: './plugins/index.js'
};

// 为plugins中的文件夹添加打包
shelljs.ls(resolve(__dirname, 'plugins')).forEach(pluginPath => {
  // 遍历某个文件下面的文件名
  if (pluginPath !== 'index.js') {
    const moduleName = _.upperFirst(_.camelCase(pluginPath)); // 转换成大驼峰
    entry[moduleName] = `./plugins/${pluginPath}/index.js`;   
  }
});

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  entry,
  output: {
    filename: substitutions => `${_.lowerFirst(substitutions.chunk.name)}.js`,
    library: '[name]',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/')
  },
  externals: {
    '@antv/g6': 'G6' // 指定不编译文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /global\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '____G6_VERSION____',
            replace: pkg.version
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // 错误继续编译不输出
    new webpack.optimize.AggressiveMergingPlugin() // 合并块
  ]
};
