// 00. 그냥 함수 만들어서 사용하기 -> 전역스코프 문제
// function sum(a, b) {
//     return a + b
// }


// 01. IIFE
var math = math || {};

(function() {
  function sum(a, b) {
      return a + b
  }
  math.sum = sum
})();