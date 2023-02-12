class MyWebpackPlugin {
  // compiler라는 객체
  apply(compiler) {
    // 플러그인이 종료되었을 때 실행됨 -> 잘 동작했는지를 확인하기 위한 콘솔
    compiler.hooks.done.tap('My Plugin', (stats) => {
      console.log('MyPlugin: done');
    });

    // compiler.plugin() 함수로 후처리한다
    compiler.plugin('emit', (compilation, callback) => {
      // 이 곳에서 번들링한 결과물에 접근할 수 있다.
      const source = compilation.assets['main.js'].source();
      compilation.assets['main.js'].source = () => {
        const banner = [
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Date: 2019-10-10',
          ' */',
        ].join('\n');
        return banner + '\n' + source;
      };
      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
