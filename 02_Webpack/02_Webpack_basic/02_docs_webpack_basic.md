# 웹팩 (기본)

## 웹팩 주요 개념 ([공식문서 Concepts](https://v4.webpack.js.org/concepts/))

> 웹팩은 static module bundler이고, 웹팩이 프로젝트를 처리할 때 내부적으로 dependency graph를 생성한다. 그리고 이 dependency graph에서 프로젝트 내의 모든 모듈을 연결하고, 번들을 생성한다.
>
> 웹팩 4.0.0 버전 이후로 번들에 configuration file을 필요로 하지 않지만, 개인의 니즈에 맞게 설정이 가능하다.



### 1. Entry

* **Entry point**는 내부 dependency graph 빌딩을 시작할 때 사용되는 모듈을 의미한다. 웹팩은 이후 엔트리 포인트와 직/간접적으로 의존되어 있는 모듈과 라이브러리를 찾아나간다. 
* default로는 `./src/index.js`를 엔트리 포인트로 사용한다. 하지만 웹팩 config에서 다른 파일이나 멀티 엔트리 포인트를 설정할 수 있다.



**Entry point 설정 방법: webpack.config.js**

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```



### 2. Output

* **Output** 속성은, 생성된 번들들을 어디르 emit할지 그리고 어떻게 이 파일(번들)을 명명할지를 설정하는 것이다. 
* default로는 `./dist/main.js`가 메인 output file이 되고, `./dist` 폴더에 다른 생성된 파일들이 위치하게 된다.
* 웹팩 config의 `output` 필드에서 이 설정을 변경할 수 있다.



**Output 설정 방법: webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

> 이 예시에서,  `output.filename`과 `output.path`속성 사용해서 웹팩이 번들의 이름과 어디로 위치시키면 좋을지를 알려준다. 
>
> 최상단에 위치한 `path` 모듈은, 코어 Node.js 모듈로 파일 경로를 조작하는데에 사용된다. 



### 3. Loaders

* 웹팩은 JS 혹은 JSON 파일만 이해할 수 있다. 
* **Loader**는 웹팩이 다른 종류의 파일을 처리하고, 그것들을 유효한 모듈로 변경할 수 있게 하여, 의존성 그래프에 추가한다.

> 어떤 종류의 모듈이든 `import`를 사용할 수 있는 것은 웹팩의 특징인 것이고, 다른 번들러나 태스크러너에서는 지원되지 않을 수 있다.

* `Loader`는 웹팩 config에서 두개의 속성을 가지고 있다.
  1. `test`: 어떤 파일(들)이 변형될 것인지를 확인한다.
  2. `use`: 변형 과정에 어떤 로더를 사용할 것인지를 명시한다.



**Loader 설정 방법: webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```

>  위 설정해서는 `rules` 속성을 정의했다. (이 속성에는 `test`와 `use`라는 두 속성이 더 필요하다) 위 코드는 아래와 같은 의미를 갖는다.
>
>  "웹팩 컴파일러야, '.txt' 파일을  `require()`/`import` 구문에 포함하고 있는 경로를 발견한다면, `raw-loader`를 사용해서 번들에 추가되기 전에 변형해주렴."

* 주의 사항
  * `module.rules`에서 설정하는 것이다!
  * regex를 사용해 매칭되는 파일을 찾는 것이라면, 인용을 하면 안된다. 
    * `/\.txt$/` *is not the same as* `'/\.txt$/'` *or* `"/\.txt$/"`
    * 전자는 .txt로 끝나는 어떤 파일이든  웹팩에게 지시하는 것이라면, 후자들은 웹팩에게 절대 경로로 '.txt'인 파일 하나를 의미하는 것이다.  
  * *추가적인 cumstomization은 loaders 설정 검색해보기*



### 4. Plugins

* loader는 모듈의 특정 타입을 변환하는 데에 사용된다면, **Plugin**은 번들 최적화, 애셋 관리, 환경 변수 주입 등의 넓은 범위의 업무를 수행하는 데에 사용될 수 있다.
* plugin을 사용하기 위해서는, `require()` 함수로 플러그인을 부르고, `plugins`라는 array에 넣어줘야 한다. 
* 대부분의 plugin은 옵션을 통해 커스텀할 수 있고, config에서 다른 목적으로 여러번 plugin을 사용할 수 있으므로, `new` 생성자를 통해 새로운 객체로 생성해 놓는 것이 좋다.



**Plugins 설정 방법: webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

> 위 예시에서, `html-webpack-plugin`은 모든 생성된 번들을 자동적으로 주입시킴으로써 프로젝트에 HTML 파일을 생성한다. 

* plugin을 사용하는 것은 직관적이다. 하지만 좀 더 알아봐야 하는 용례가 많으니, 더 알아봐라!



### 5. Mode

* **Mode**를 `development`, `production` or `none`로 설정함으로써, 각각의 환경에 맞는 웹팩의 내장 최적화를 사용할 수 있다. 
* default는 `production`이다.

```javascript
module.exports = {
  mode: 'production'
};
```



### 6. Browser Compatibility

웹팩은 ES5+를 지원하는 모든 브라우저에서 지원된다. 웹팩은 `import()`와 `require.ensure()`를 위해  `Promise`를 필요로 한다. 더 오래된 브라우저에서 지원하길 원한다면, polyfill을 로드해야 한다.

