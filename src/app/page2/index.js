/*
 * @Author: Clloz
 * @Date: 2020-11-12 21:06:37
 * @LastEditTime: 2020-11-14 17:31:40
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /webpack-template/src/app/page2/index.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
import './style.css';
import './style.less';
import './style.scss';
import '../../assets/style/common.css';

import { foo } from './tree-shaking';

import img from '../../assets/images/3.jpg';

foo();

function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
const g = gen();
console.log(g.next());
console.log(22222);

const imgEl = document.createElement('img');
imgEl.src = img;
document.body.appendChild(imgEl);
