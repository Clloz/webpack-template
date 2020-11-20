/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:00:21
 * @LastEditTime: 2020-11-20 19:04:44
 * @LastEditors: Clloz
 * @Description: 开发环境的打包配置，用 webpack-merge 和基础配置进行合并
 * @FilePath: /webpack-template/build/webpack.dev.conf.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const devConfig = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [path.resolve(__dirname, '../src/assets/style/global.scss')],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true } },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [path.resolve(__dirname, '../src/assets/style/global.less')],
                        },
                    },
                ],
            },
        ],
    },
    // 开启模块热更新
    plugins: [new webpack.HotModuleReplacementPlugin()],
    // 配置 devserver
    devServer: {
        contentBase: './', // devServer 的启动目录，必须要以 / 结尾，因为需要是一个目录，一般不需要开启
        // publicPath: '../public/', // 告诉当前启动的 devServer 你的静态资源路径是什么，主要是为了在我们设置了 output.publicPath 的时候能够在开发环境正常访问静态资源
        host: '127.0.0.1',
        port: '8082',
        hot: true,
        open: true,
        stats: 'errors-only',
    },
    // 开启 source-map
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
