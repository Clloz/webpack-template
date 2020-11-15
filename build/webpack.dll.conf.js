/*
 * @Author: Clloz
 * @Date: 2020-11-14 12:24:24
 * @LastEditTime: 2020-11-14 19:14:38
 * @LastEditors: Clloz
 * @Description: 模块预编译配置，用来打包一些不会经常变化的第三方模块或者库
 * @FilePath: /webpack-template/build/webpack.dll.conf.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 可以设置多入口，打包出多个 js 和 json
    entry: {
        react: ['react', 'react-dom'],
        vue: ['vue', 'vue-router'],
    },
    output: {
        filename: '[name][chunkhash].dll.js',
        path: path.join(__dirname, '../dll'),
        library: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new TerserPlugin({
            extractComments: false, // 不生成 license.text
            parallel: true, // 开启并行压缩
        }),
        new webpack.DllPlugin({
            name: '[name]', // 注意这里名字要和 library 相同，否则会导致后面访问失败
            path: path.join(__dirname, '../dll/[name].json'),
        }),
    ],
};
