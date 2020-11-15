/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:48:05
 * @LastEditTime: 2020-11-15 11:59:15
 * @LastEditors: Clloz
 * @Description: postcss 配置文件
 * @FilePath: /webpack-template/postcss.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [autoprefixer], // 添加 autoprefixer 支持，需要配置 browserslist
};
