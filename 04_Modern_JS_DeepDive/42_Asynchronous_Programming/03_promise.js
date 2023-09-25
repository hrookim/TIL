const promise = new Promise((resolve, reject) => {
  // TODO: 비동기 처리 함수
  if (true) {
    resolve();
  } else {
    reject();
  }
});

const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject(new Error(xhr.status));
    }
  });
};

promiseGet('https://jsonplaceholder.typicode.com/todos/2');
