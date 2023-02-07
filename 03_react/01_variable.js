// 변수 선언
let age = 25;

console.log(age); // 25

age = 30;

console.log(age); // 30

// INFO: 변수명의 규칙
// 기호 사용 금지, "_"와 "$"는 사용 가능
// 변수명이 시작될 때는 숫자가 붙을 수 없다.
// 예약어 사용금지

var me = 20;

// var vs let
// var 중복 선언이 가능함ㅠㅜ 문제가 되니까 사용하지 말자

// 상수
const you = 25;

you = 30; // [x] 불가능하다, read-only이기 때문
console.log(you);
