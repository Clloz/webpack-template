/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:00:21
 * @LastEditTime: 2020-11-19 12:38:49
 * @LastEditors: Clloz
 * @Description: 开发环境的打包配置，用 webpack-merge 和基础配置进行合并
 * @FilePath: /webpack-template/build/webpack.prod.conf.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin'); // 代码压缩工具，支持并行压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理打包目录
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); // 分离 CSS 生成文件而不是用 style 标签插入

// webpack 5 之前的版本进行 CSS 压缩的工具
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const cssnano = require('cssnano');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // webpack 5 推荐使用的 CSS 压缩工具，支持并行
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 模块缓存 webpack 5 不再需要，因为内置了缓存配置，添加 `cache` 字段即可，详细配置参考官方文档

// 一些效率工具，自行选择
// const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 生成图片直观显示打包信息
const DashboardPlugin = require('webpack-dashboard/plugin'); // 图形化命令行打包输出
// const Bundlesize = require('bundlesize'); // 自动化体积监控工具，需要在 `package.json` 进行配置
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 分析构建过程中在各个 `loader` 和 `plugin` 上花费的时间

const baseConfig = require('./webpack.base.conf');

const prodConfig = {
    // mode: 'none', //test tree shaking
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name][chunkhash:8].js',
        // publicPath 设置在浏览器访问的时候资源的前缀，
        // 比如你打包出一个文件 mmm.jpg, 如果你设置了 publicPath，实际访问的时候的 url 就成为 /public/mmm.jpg，意味着你需要把图片放到对应的 public 目录中才能访问到。
        // 所以这是一个用来设置静态资源的配置，因为项目部署的时候可能静态资源没有按开发时候的路径部署，需要统一修改的时候使用
        // 在使用 html-webpack-plugin 插件打包后的html文件，引入js文件的路径为 publicPath + 打包路径
        // 设置相对路径就是相对于 入口 HTML的路径，如果你设置 / 开始的路径就是相对于服务器根目录的路径，需要开启 web 服务器，或者使用绝对路径，比如 cdn
        publicPath: './', // 这里我设置了 /dist/ 就需要在项目根目录开启 http-server，如果想直接打开 dist 中的 html 访问就设置为 ./ 即可
        chunkFilename: '[name][chunkhash:8].js', // 设置非入口 chunk 的 name
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
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
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    // style-resources-loader 目前在 webpack 5 无法工作
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [path.resolve(__dirname, './src/assets/style/globa.scss')],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true } },
                    // style-resources-loader 目前在 webpack 5 无法工作
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: '../src/assets/style/globa.less',
                        },
                    },
                ],
            },
        ],
    },
    // webpack 5 新特性，开启缓存，缓存默认只在 development 模式下开启，有 memery 和 filesystem 两种，具体参考文档
    cache: {
        type: 'memory',
    },
    plugins: [
        // 分离提取 CSS 文件
        new MiniCSSExtractPlugin({
            filename: '[name]_[contenthash:8].css',
            chunkFilename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(), // 清理打包目录
        // webpack 5 之前使用的 css 压缩工具，webpack 5 之后建议用 CssMinimizerPlugin 代替
        // new OptimizeCSSAssetsPlugin({
        //     assetsNameRegExp: /\.css$/g,
        //     cssProcessor: cssnano,
        // }),

        // new HardSourceWebpackPlugin(), // 模块缓存 webpack 5 不再需要，因为内置了缓存配置，添加 `cache` 字段即可，详细配置参考官方文档

        new DashboardPlugin(),
        // new SpeedMeasurePlugin(),
        // new Bundlesize(),
        // new BundleAnalyzer(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true, // 开启并行压缩
                extractComments: false, // 不生成 license.text
            }),
            // webpack 5 CSS 压缩工具
            new CssMinimizerPlugin({
                parallel: true, // 开启并行压缩
            }),
        ],
    },
};

module.exports = merge(baseConfig, prodConfig);
