module.exports = function myWebpackLoader(content) {
  // 1. loader가 파일을 읽으면, 그 파일이 content인자로 들어온다.
  // 2. 변환 처리는 이 안에 작성한다.
  return content.replaceAll("console.log(", "alert(");
};
