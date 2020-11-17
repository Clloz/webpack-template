/*
 * @Author: Clloz
 * @Date: 2020-11-12 21:06:37
 * @LastEditTime: 2020-11-17 16:02:13
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /webpack-template/src/app/index/index.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
import './style.css';
import './style.less';
import './style.scss';
import '../../assets/style/common.css';
import React from 'react';
import ReactDOM from 'react-dom';
import libFlexible from 'raw-loader!babel-loader!../../../node_modules/lib-flexible/flexible'; //eslint-disable-line
import common from '../../assets/js/common';

import img from '../../assets/images/1.jpg';
import icon from '../../assets/images/todo.png';

const _ = require('lodash');

console.log(libFlexible);

console.log(React, ReactDOM);

common();
console.log(_.flatten([1, [2, [3, [4]], 5]]));
console.log(112312231123123123231231);

const el = document.createElement('p');
const text = document.createTextNode('sdfsdfsdfs');
el.appendChild(text);
document.body.appendChild(el);
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
const g = gen();
console.log(g.next());
console.log(g.next());

const imgEl = document.createElement('img');
imgEl.src = img;
document.body.appendChild(imgEl);

const iconEl = document.createElement('img');
iconEl.src = icon;
document.body.appendChild(iconEl);
