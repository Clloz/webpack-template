/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:48:05
 * @LastEditTime: 2020-11-17 17:52:52
 * @LastEditors: Clloz
 * @Description: postcss 配置文件
 * @FilePath: /webpack-template/postcss.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
// const postcssImport = require('postcss-import');
// const postcssUrl = require('postcss-url');

module.exports = {
    plugins: [
        autoprefixer, // 添加 autoprefixer 支持，需要配置 browserslist
        postcssPresetEnv(),
        // postcssImport,
        // postcssUrl({
        //     url: 'rebase',
        //     assetsPath: '../images/',
        // }),
    ],
};
