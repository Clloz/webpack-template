/*
 * @Author: Clloz
 * @Date: 2020-11-12 21:06:37
 * @LastEditTime: 2020-11-14 22:37:26
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /webpack-template/src/app/page1/index.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
import './style.css';
import './style.less';
import './style.scss';
import '../../assets/style/common.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import common from '../../assets/js/common';

import img from '../../assets/images/2.jpg';

Vue.use(VueRouter);
console.log(Vue, VueRouter);

const _ = require('lodash');

console.log(12323432123123124234);
common();

console.log(_.flatten([1, [2, [3, [4]], 5]]));

function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
const g = gen();
console.log(g.next());

const imgEl = document.createElement('img');
imgEl.src = img;
document.body.appendChild(imgEl);
