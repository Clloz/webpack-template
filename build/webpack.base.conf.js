/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:00:21
 * @LastEditTime: 2020-11-20 18:46:56
 * @LastEditors: Clloz
 * @Description: 各环境通用配置
 * @FilePath: /webpack-template/build/webpack.base.conf.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin'); // 清除没有用到的 CSS
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 按模版自动生成入口 HTML，功能非常丰富，比如多入口，HTML 压缩等，参考官方文档，webpack 5 安装 html-webpack-plugin@next
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 优化打包命令行输出
const StyleLintPlugin = require('stylelint-webpack-plugin'); // CSS 检查，需要安装 stylelint 并进行配置，stylelint 的配置参考官方文档
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin'); // 将一些公共资源作为 tag 添加到入口 HTML 中，是对 HtmlWebpackPlugin 的增强

const PATHS = {
    src: path.join(__dirname, '../src'),
};

// 根据 src 目录生成 entry 和 html-webpack-plugin 的配置
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, '../src/app/*/index.js'));
    Object.keys(entryFiles).forEach(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/app\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                inlineSource: '.css$',
                template: path.join(__dirname, `../src/app/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName], // 这里似乎必须写成数组，不然所有chunk都会打包进每一个html
                excludeChunks: ['common'], // 这里有个没有解决的问题就是 splitChunk 分离出来的包会加到所有入口中去，即使该入口中没有用到这个模块
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            }),
        );
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    // 目前 webpack-dev-server 在配置 browserslist 的时候无法启用 live reloading & HMR, 需要加上下面的配置
    target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: [
                    {
                        loader: 'thread-loader', // 将后面的 loader 放置在一个 worker 池里面运行，以达到多线程构建。
                        options: {
                            workers: 3, // 配置 thread-loader 的 worker 数
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // 开启 babel-loader 缓存
                        },
                    },
                    'eslint-loader', // 配置 eslint 进行代码检查
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 4000, // 图片小于 4000 Bytes 会使用 base64 打包插入 HTML
                    name: 'images/[name][hash:8].[ext]',
                    // publicPath: '/images/', // 很多 loader 可以单独设置 publicPath
                },
            },
            {
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 3000, // 字体小于 4000 Bytes 会使用 base64 打包插入 HTML
                    name: 'fonts/[name].[hash:8].[ext]',
                },
            },
        ],
    },
    plugins: [
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/app/**/*`, { nodir: true }),
            // paths: globAll.sync([
            //     `${PATHS.src}/app/index/*`,
            //     `${PATHS.src}/app/page1/*`,
            //     `${PATHS.src}/app/page2/*`,
            // ]),
        }),
        // 用 stylelint 检查 CSS
        new StyleLintPlugin({
            context: path.join(__dirname, '../src'),
            files: ['**/*.{html,vue,css,sass,scss}'],
            fix: false,
            cache: true,
            emitErrors: true,
            failOnError: false,
        }),
        // 优化打包命令行输出
        new FriendlyErrorsWebpackPlugin(),

        // 调用处理好的 dll 包，可以配置多个
        new webpack.DllReferencePlugin({
            manifest: require('../dll/vue.json'), // eslint-disable-line
        }),
        new webpack.DllReferencePlugin({
            manifest: require('../dll/react.json'), // eslint-disable-line
        }),
        // 直接插入基础库，可以以 cdn 的形式
        new HtmlWebpackTagsPlugin({
            append: false, // 如果是 true 表示插入在最后
            scripts: [
                // { path: 'http://127.0.0.1:8080/react4099a463c42053c458c2.dll.js' },
                // { path: 'http://127.0.0.1:8080/vue31be234e8395380e3d75.dll.js' },
                { path: '../dll/react4099a463c42053c458c2.dll.js' },
                { path: '../dll/vue31be234e8395380e3d75.dll.js' },
                { path: '../node_modules/lib-flexible/flexible.js' },
            ],
        }),
    ].concat(htmlWebpackPlugins),
    optimization: {
        // 代码分割
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minRemainingSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            usedExports: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 2,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                common: {
                    minChunks: 2,
                    priority: -20,
                    name: 'common',
                    reuseExistingChunk: true,
                    minSize: 0,
                },
            },
        },
    },
    // stats: 'errors-only', // 只输出错误信息，简化打包的命令行输出
};
