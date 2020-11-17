/*
 * @Author: Clloz
 * @Date: 2020-11-12 20:47:19
 * @LastEditTime: 2020-11-17 16:17:16
 * @LastEditors: Clloz
 * @Description: stylelint 的配置文件，详细配置规则参考官方文档
 * @FilePath: /webpack-template/stylelint.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
module.exports = {
    defaultSeverity: 'error',
    extends: ['stylelint-config-standard'],
    rules: {
        'declaration-block-semicolon-newline-after': 'always',
        indentation: [
            4, // 这里设置 4 防止和 prettier 冲突
            {
                baseIndentLevel: 1,
            },
        ],
        'declaration-no-important': true, // 强制不可以写 important 规则
        'font-family-no-missing-generic-family-keyword': [
            true,
            {
                ignoreFontFamilies: ['sail'],
            },
        ],
    },
};
