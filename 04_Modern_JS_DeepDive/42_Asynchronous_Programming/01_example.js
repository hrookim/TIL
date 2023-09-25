function foo() {
  console.log('FOO');
}

function bar() {
  console.log('BAR');
}

setTimeout(foo, 0);
bar();
