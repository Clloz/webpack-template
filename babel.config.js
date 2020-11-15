/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:01:02
 * @LastEditTime: 2020-11-15 13:35:18
 * @LastEditors: Clloz
 * @Description: babel 配置文件
 * @FilePath: /webpack-template/babel.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                modules: false, // for tree shaking
            },
        ],
    ];
    const plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];
    return {
        presets,
        plugins,
    };
};
