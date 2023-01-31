// 00. 그냥 함수 만들어서 사용하기 -> 전역스코프 문제
// console.log(sum(1, 2));

// 01. IIFE
// console.log(math.sum(1, 2));

// 02. ES2015, 표준 모듈 시스템
import * as math from "./math.js";
console.log(math.sum(1, 2));
