// 00. 그냥 함수 만들어서 사용하기 -> 전역스코프 문제
// console.log(sum(1, 2));

// 01. IIFE
// console.log(math.sum(1, 2));

// 02. ES2015, 표준 모듈 시스템
// import * as math from "./math.js";
// console.log(math.sum(1, 2));

import * as Styles from './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(THREE);
console.log(api.domain);
