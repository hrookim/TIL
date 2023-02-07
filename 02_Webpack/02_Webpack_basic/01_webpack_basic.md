# 웹팩 (기본)

[toc]



## 1. 웹팩이 필요한 이유 (배경)

> ES2015(ES6)부터 문법 수준에서 모듈을 지원하기 시작했다.
>
> 모듈을 지원했다 == import/export로 모듈을 사용했다!
>
> 그렇다면, 모듈을 지원하기 이전에는 어떻게 사용을 했을까..?



### [이전에 사용한 방법]

| 폴더구조                                                     | math.js                                                      | app.js                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230130213652236](01_webpack_basic.assets/image-20230130213652236.png) | ![image-20230130213710977](01_webpack_basic.assets/image-20230130213710977.png) | ![image-20230130213727328](01_webpack_basic.assets/image-20230130213727328.png) |

| index.html                                                   |
| ------------------------------------------------------------ |
| ![image-20230130213831750](01_webpack_basic.assets/image-20230130213831750.png) |

* 문제가 발생한다. -> **전역스코프가 오염된다.**
* `math.js` 안에 있는 `sum 함수`는 이 파일 안에서만 유효한 것이 아니라, 어느 곳에서든 접근이 가능하다.
  * <img src="01_webpack_basic.assets/image-20230130214025614.png" alt="image-20230130214025614" style="zoom:67%;" />
  * 이렇게 보는 것처럼, 전역인 `window`에 `sum 함수`가 등록되어 버린다.
  * js에서는 함수에 새로운 값을 할당할 수 있으므로, 전역에 등록된 함수가 오염이 되면 원하던 모듈을 그대로 사용할 수 없게 된다.
  * <img src="01_webpack_basic.assets/image-20230130214236005.png" alt="image-20230130214236005" style="zoom:67%;" />



### [해결법 1] IIFE 모듈

* 즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression): 정의되자마자 즉시 실행되는 JS 함수를 의미한다.
* 이렇게 되면, 함수 안에 독립적인 scope가 생기게 된다. (전역스코프 문제를 피할 수 있다.)

| math.js                                                      | app.js                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230130215032639](01_webpack_basic.assets/image-20230130215032639.png) | ![image-20230130215057002](01_webpack_basic.assets/image-20230130215057002.png) |

* 이렇게 되면, `math`라는 namespace에서만 `sum 함수`를 접근할 수 있고, 전역에서는 접근할 수 없게 된다.
  * <img src="01_webpack_basic.assets/image-20230130215226808.png" alt="image-20230130215226808" style="zoom:67%;" />



### [해결법 2] 다양한 모듈 스펙

#### CommonJS

* JS를 사용하는 모든 환경에서 모듈을 사용하는 것이 목표이다.
* `exports` 키워드로 모듈을 만들고, `require()` 함수로 불러 들이는 방식
* 대표적으로 서버 사이드 플랫폼인 <u>Node.js에서 이를 사용한다</u>.
* <img src="01_webpack_basic.assets/image-20230131094556061.png" alt="image-20230131094556061" style="zoom:67%;" />

#### AMD(Asynchronous Module Definition)

* 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표이다.
* 주로 브라우저 환경

#### UMB(Universal Module Definition) 

* AMD 기반으로 CommonJS 방식까지 지원하는 통합 형태



### [해결법 3] 표준 모듈 시스템 (ES2015)

* 지금은 바벨과 웹팩을 사용해서 이 모듈 시스템을 사용하는 것이 일반적이다.
* `export` 구문으로 모듈을 만들고, `import`구문으로 가져와 사용할 수 있다.

| math.js                                                      | app.js                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20230131100236160](01_webpack_basic.assets/image-20230131100236160.png) | ![image-20230131100225577](01_webpack_basic.assets/image-20230131100225577.png) |

| index.html                                                   |
| ------------------------------------------------------------ |
| ![image-20230131100320699](01_webpack_basic.assets/image-20230131100320699.png) |

* `script`태그에서 `app.js`만 가져오면 사용할 수 있고, `type="module"`이라는 어트리뷰트를 입력해주면 된다.

* 그러나 이것을 브라우저에서 오픈해보면 CORS 에러가 난다.

* ![image-20230131100436813](01_webpack_basic.assets/image-20230131100436813.png)

  * 브라우저가 바로 파일을 읽지 못해서 생기므로, 서버를 돌려야 한다.

  * `lite-server`라는 간단한 node 서버를 돌려보자! 그러면 똑같이 `3`이라는 결과를 얻을 수 있다.

    ```bash
    $ npx lite-server
    ```

    

**브라우저에서 모두 모듈을 사용할 수 있는게 아니므로, 이를 사용하게 해주는 장치가 필요한데 그것이 바로 웹팩이다!!!!!!!**



## 2. 엔트리/아웃풋

![image-20230131103524877](01_webpack_basic.assets/image-20230131103524877.png)

> 위처럼 모듈로 파일을 작성하게 되면, 왼쪽처럼 여러 파일이 존재하고 서로 의존해있는 형태를 띄게 된다.

* 웹팩: 여러개의 파일을 하나의 파일로 합쳐주는 번들러(bundler)
  의존관계에 있는 여러개의 파일들을 하나로 합쳐준다!!!!!
  * 이렇게 하나로 합쳐진 파일을 **번들(bundle)**이라고 한다. (번들을 만들어줘서 번들러)



### 웹팩 설치하기

* 번들 작업을 하는 웹팩 패키지와 웹팩 터미널 도구를 설치한다.

* ```bash
  $ npm i webpack webpack-cli --save-dev
  ```

  * 이렇게 설치를 하면 `--save-dev` 옵션 때문에 `package.json`에서 `devDependencies`에 버전이 작성되게 된다.
  * ![image-20230131105235137](01_webpack_basic.assets/image-20230131105235137.png)

  * 이것은 개발용 패키지라고 보면 된다!

* 설치를 완료하면, `node_modules/.bin/` 폴더에 `webpack`과 `webpack-cli`가 생성된다. 이걸로 웹팩을 터미널에서 실행할 수 있다. 

> `.bin` 폴더의 정체
>
> * 바이너리 파일들이 저장되는 곳 (바이너리 파일이란, 0과 1로만 이루어진 파일)
> * `npm install`로 모듈를 설치하고 나면 발생하는 일
>   1. 모듈이 `node_modules/{패키지명}` 폴더에 설치된다.
>   2. 모듈을 바이너리로 컴파일한다.
>   3. 컴파일된 바이너리 파일을 `node_modules/.bin`에 복사한다.
> * 설치한 모듈을 사용하기 위해서는 두가지 방법이 사용될 수 있다.
>   1. node 명령어 사용
>   2. npm script 사용:  `.bin` 폴더에 들어있는 실행파일을 직접 실행하는 것이다.



* webpack을 실행할 때에는 필수적인 옵션이 3개 있다.
  1. `--mode`
  2.  `--entry`: 모듈의 시작점을 의미한다.
  3.  `--output`: 모든 모듈을 하나로 합치고 저장하는 경로를 설정하는 곳이다.

* 명령어에 직접 입력할 수 있지만, 매번 명령어로 실행할 수 없으므로, 설정파일을 사용한다

  * `webpack.config.js`

  * ```javascript
    const path = require("path");
    
    module.exports = {
      mode: "development",
      entry: {
        main: "./src/app.js",
      },
      output: {
        path: path.resolve("./dist"),
        filename: "[name].js",
      },
    };
    ```

    > 여기에 있는 `module`은 ES6가 아닌, node.js에서 제공하는 모듈이다!

    * `entry`: 객체를 전달하고, 이때 `main`이라는 키에 엔트리포인트의 경로를 입력한다.
    * `output`: 객체를 전달하고 그 안에 두개의 키로 필요한 내용을 입력한다.
      `path`는 output dir명을 입력하는 것이고, 절대경로를 입력한다. node.js의 path 모듈을 가져와서 절대경로를 지정해준다.
      `filename` 번들링된 파일의 이름이 된다. `[name].js`라고 작성한 것은 entry에서 설정한 키 값인 `main`으로 치환될 것이다! 이렇게 사용하면, 여러 엔트리를 가졌을 때 동적으로 output 파일의 이름을 설정해준다.



### 웹팩으로 코드를 번들링하는 과정을, npm script에 등록하는 법

* `package.json`을 아래와 같이 변경한다.

```json
{
  ...,
  "scripts": {
    "build": "webpack"
  },
  ...
}

```

> node_modules/.bin 경로는 생략해도 괜찮다. 이를 제외한 실행파일명을 알맞게 작성해주자!





## 2-1. 엔트리와 아웃풋 [실습]

npm으로 프로젝트를 셋팅하고, webpack을 셋팅하고, entry와 아웃풋을 설정하고 나면 빌드된 파일이 생기는데, TODO에 빌드한 js 파일을 로딩하는 실습을 해보자!





## 3. 로더

* JS는 모든 파일을 모듈로 바라본다. css, image, font 등을 모두 모듈로 보기 때문에 ES6의 `import` 구문을 사용하여 가져올 수 있다.
* 이것이 가능한 이유가 **Loader** 때문이다.

* 로더를 사용하려면 webpack.config.js의 `module` 객체에 추가해주면 된다.

```javascript
module.exports = {
  ...
  module: {
    // 이 배열 안에 객체로 로더를 넘겨준다!  
    // 객체는 test와 use라는 키를 가진 객체이다.  
    rules: [
      {
        test: "",
        use: "",
      },
    ],
  },
};

```

* `test`: 로더가 처리해야 할 파일의 패턴(정규표현식)을 입력한다.
* `use`: 사용되는 로더를 입력한다.



## 3-1. 자주 사용하는 로더

### css-loader

* 설치하기

```bash
$ npm install css-loader@3 --save-dev
```

> 버전에 매우 민감! 호환되는지를 확인하고 설치



* webpack.config 설정 방법

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["css-loader"], // css-loader를 적용한다
      },
    ],
  },
}
```



### style-loader

* 설치하기

```bash
$ npm install style-loader@1 --save-dev
```

* 모듈로 변경된 스타일시트는 돔에 추가되어야만 브라우저가 해석할 수 있다.
* `css-loader`만 사용하면 js 코드로만 변경되었을 뿐, DOM에 적용되지 않았기 때문에 스타일이 적용되지 않는다.
* `style-loader`는 js로 변경된 스타일을 동적으로 돔에 추가하는 로더, css를 번들링하기 위해서는 이 두 로더를 함께 사용해야 한다.



* webpack.config 설정 방법

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
      },
    ],
  },
}
```

> loader를 읽는 순서가 뒤에서부터 앞이므로, css-loader를 styled-loader보다 뒤에 적는다!



### file-loader

* CSS뿐만 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용하게끔 할 수 있따. 
* `file-loader`: 파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨주는 것

* 설치하기

```bash
$ npm install file-loader@5 --save-dev
```



* 예시) 이미지 파일을 배경으로 넣고 싶다면

* style.css

```css
body {
    background-image: url(bg.png)
}
```

* 그리고 `npm run build`를 실행하면, 다음과 같은 에러메시지가 나온다.

<img src="01_webpack_basic.assets/image-20230206231528374.png" alt="image-20230206231528374" style="zoom:80%;" />

> Module parsing에서 에러가 났다. css-loader가 구문에서 `bg.png`를 불러오는데 이것을 불러올 수 없다는 에러



* webpack.config 설정 방법

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
      },
    ],
  },
}
```

* 웹팩이 .png파일을 인식해서 file-loader를 실행한다
* 로더가 동작하고 나면 output 경로에 이미지 파일이 복사되고, 파일명이 해시값으로 변경된다.
  * 캐시 갱신을 위해서 처리한 것을 보임
  * 정적파일은 브라우저에서 성능을 위해서 캐싱을 하고 있는데, 파일 내용이 달라지고 이름이 같으면 이전에 저장했던 캐시 내용을 사용한다.
  * 그래서 이를 예방하는 것이 이름을 해시로 변경해버리는 것이다.
* 그런데, `index.html`을 실행해서 확인해보면 **이미지가 뜨지 않는다!!!!**

<img src="01_webpack_basic.assets/image-20230206232300354.png" alt="image-20230206232300354" style="zoom:67%;" />



* why? 브라우저에서 실행된 `index.html`을 보면 알 수 있다.

![image-20230206232424790](01_webpack_basic.assets/image-20230206232424790.png)

* `url()` 내에 작성했던 파일의 이름이 변경되어 있다.
  * 그런데 이 파일은 `src`폴더가 아닌, `dist`폴더에 있다. 그러므로, `src`에서 부르려는 현재의 동작에서는 파일을 찾을 수 없다는 에러를 반출하는 것이다.
* 그렇다면, 이를 해결하기 위해 변경을 해보자!!!



* webpack.config.js 설정 방법

```javascript
module: {
    rules: [
      {
        test: /\.png$/,
        // use: ['file-loader'], 원래 있던 형태는 지우고 아래를 입력한다.
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]'
        }
      },
    ],
  },
```

> `loader`의 `options`는 그 로더의 옵션을 지정할 수 있다.
>
> * `publicPath`는 파일로더가 처리하는 파일을 모듈로 사용했을 때, 경로부분 앞에 추가되는 문자열이다! 
>   * 우리가 설정한 output 경로와 동일하게 설정을 하면 된다.
> * `name`은 파일로더가 output에 복사를 할때 만드는 파일이름의 형태를 지정한다.
>   * 현재 작성된 형태는, `원본파일명`.`확장자`?`해시`를 해서 우리가 알아보면서도 캐싱에서의 문제점도 해결하게 했다!

* 그러면 이렇게 해결이 되어있다!!!

<img src="01_webpack_basic.assets/image-20230206233138324.png" alt="image-20230206233138324" style="zoom:67%;" />



### url-loader

* 사용하는 이미지 갯수가 많다면 네트워크 부담이 많아지고 사이트 성능에도 영향을 줄 수 있다.
* 만약... 한 페이지에서 작은 이미지를 여러개 사용한다며 **[Data URI Scheme](https://en.wikipedia.org/wiki/Data_URI_scheme)**을 사용하는 것이 더 낫다
  * ![image-20230206233452389](01_webpack_basic.assets/image-20230206233452389.png)
  * 이미지 태그를 쓸 때 src에 경로가 아닌 문자열을 넣을 수 있는데, data 포맷을 지정하고 인코딩 방식을 지정한 후 그 값을 넣어주면 이미지로 렌더링한다!
  * 그래서 작은 파일은 이렇게 바로 html로 넣어주는 것이 효율적이다. (주소를 쓰면 네트워크 통신을 하는데, 이런 방식은 통신을 하지 않기 때문!!!!!!!!!)
* `url-loader`가 이처럼 base64로 인코딩하여 문자열 형태로 소스코드에 넣어주는 것을 자동화하는 로더이다!!!

* 설치하기

```bash
$ npm install url-loader@3 --save-dev
```



* 예시) 사이즈가 작은 jpg 파일을 가져와서 사용해보자

* app.js

<img src="01_webpack_basic.assets/image-20230206234338273.png" alt="image-20230206234338273" style="zoom:80%;" />

> nyancat을 모듈로 만들어서 import를 했다.
>
> DOM이 만들어졌을 때 이미지 태그를 추가하는데, 이 때 이미지는 import한 nyancat이다.



* jpg 파일은 기본적으로 `file-loader`가 처리할 수 있다.
* webpack.config.js 설정 방법

```javascript
  module: {
    rules: [
      ...
      {
        test: /\.(png|jpg|gif|svg)$/,  // 대표적인 네가지 이미지 파일을 넣는다.
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
```

* 이렇게 실행하면 `dist/`폴더에 `nyancat.jpg`도 잘 들어가 있고, `index.html`에도 잘 나타나는 것을 확인할 수 있다.

<img src="01_webpack_basic.assets/image-20230206234700637.png" alt="image-20230206234700637" style="zoom:80%;" />

* 그러면, nyancat.jpg의 이미지 크기를 확인해보자
* <img src="01_webpack_basic.assets/image-20230206234838394.png" alt="image-20230206234838394" style="zoom:80%;" />

> `ll`이라는 명령어란, ls 란 해당 디렉토리에 존재하는 파일목록을 표시해주며, **ll** 이란 **ls 명령어에 -l 옵션을 준 형태**이다. (참고로, -l 옵션은 long 옵션으로 상세히 출력하라는 의미이다.)	

* 18kb로 매우 작은 크기이다. 이런것들은 dist로 옮길 필요없이 base64로 바로 넣어버린다.!!!!	



* webpack.config.js 설정 방법

```javascript
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',  // file-loader -> url-loader
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, 
          // 20kb, url-loader가 20kb미만 크기의 파일들만 처리를 하고 그 외는 file-loader가 실행된다.
        },

      },
    ],
  },
```

* `dist/` 폴더를 날린 후, 다시 `npm run build`를 한다. 그리고 `dist/main.js`를 확인해보면..

<img src="01_webpack_basic.assets/image-20230206235718107.png" alt="image-20230206235718107" style="zoom:80%;" />

* 이렇게 base64파일로 변경이 된 것을 알 수 있다!!



## 4. 플러그인

* 플러그인의 역할: 번들된 결과물을 처리한다.
  * 번들된 JS 코드를 난독화 하거나 특정 텍스트를 추출하는 용도로 사용한다.



* 커스텀 플러그인 만들어보기 -> 동작원리를 이해해보자!
  * 플러그인은 `class`로 정의를 한다 (로더가 함수로 정의된 것과는 다르게,)
* my-webpack-plugin.js

```javascript
class MyWebpackPlugin {
  // compiler라는 객체
  apply(compiler) {
    compiler.hooks.done.tap('My Plugin', (stats) => {
      // 플러그인이 잘 동작했는지를 확인하기 위한 콘솔
      console.log('MyPlugin: done');
    });
  }
}

module.exports = MyWebpackPlugin;
```

* webpack.config.js

```javascript
const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [], // 로더가 들어가는 곳
  },
  // plugin이 들어가는 곳  
  plugins: [new MyWebpackPlugin()],
};

```

> 웹팩 설정 객체의 `plugins` 배열에 설정한다. 
>
> 클래스로 제공되는 플러그인의 생성자 함수를 실행해서 넘기는 방식!!

* `npm run build`를 실행해보면 아래와 같은 결과물이 나온다. 그리고 로더와 다르게 번들된 파일에 대해 실행되므로 한번만 실행된 것을 확인할 수 있다.
* ![image-20230207200950808](01_webpack_basic.assets/image-20230207200950808.png)
  * 우리 예제에서는 main.js로 결과물이 하나이기 때문에 플러그인이 한 번만 동작한 것이라 추측할 수 있다.



* **그렇다면, 어떻게 번들된 결과에 접근할 수 있을까???**

```js
class MyPlugin {
  apply(compiler) {
    // compiler.plugin() 함수로 후처리한다
    compiler.plugin("emit", (compilation, callback) => {
      const source = compilation.assets["main.js"].source()
      console.log(source)
      callback()
    })
  }
}
```

> `source`가 번들된 결과물인 `main.js`를 그대로 갖고 있는다.



## 4-1. 자주 사용하는 플러그인

* 개발하면서 플러그인을 직접 작성할 일은 거의 없다. 
* 웹팩에서 직접 제공하는 플러그인을 사용하거나 3rd party 라이브러리를 찾아 사용하는데, 자주 사용하는 플러그인은 아래와 같다.



### BannerPlugin

* 결과물에 빌드 정보나 커밋 버전같은 것을 추가할 수 있는 플러그인
* 웹팩의 기본 제공 플러그인이다.



* webpack.config.js 설정 방법

```javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      banner: '이것은 배너입니다><',
    }),
  ],
};
```

* dist/main.js 결과물 -> 배너가 삽입된 것을 확인할!

<img src="01_webpack_basic.assets/image-20230207202618310.png" alt="image-20230207202618310" style="zoom:67%;" />



* 이것을 더 의미있게 사용한다면..
  * 빌드의 일시와 커밋 버전, 그리고 작업자의 이름을 넣을 수 있따.
* webpack.config.js 설정 방법

```java
const webpack = require('webpack');
const childProcess = require('child_process'); 

module.exports = {
  // 생략
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `,
    }),
  ],
};

```

> * `'child_process'`는 node.js의 내장 모듈로, 이것을 사용하면 터미널의 명령어를 실행할 수 있다.
>
> * 현재 배너에는 tempalte literal로 js 코드 실행된 결과들이 들어가 있다.
> * `childProcess.execSync()`를 이용해서 터미널에 작성하는 명령어를 실행시킬 수 있다.

* 실행 결과

<img src="01_webpack_basic.assets/image-20230207203357086.png" alt="image-20230207203357086" style="zoom:67%;" />



### DefinePlugin

* 프론트엔드 소스코드는 개발환경과 운영환경을 나눠서 운영한다. 
* 간혹 환경에 따라 API 서버 주소가 다를 수 있다.
  * 개발일때는 `test.com/server/api/v1/`
  * 운영일때는 `test.com/api/v1/`
* 배포할 때마다 코드를 수정하게 되면 오류가 생길 수 있으니, 환경 의존적인 정보는 소스코드가 아닌 다른 곳에서 관리하는 것이 좋다!!!
* **웹팩은 이러한 환경 정보를 제공하기 위해 DefinePlugin을 제공한다.**



* webpack.config.js 설정 방법

```javascript
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  ...
  plugins: [
    new webpack.DefinePlugin({}),
  ],
};

```

> * 이렇게 빈 객체만 전달해도 기본적으로 넣어주는 값이 있다.
>   * 노드 환경정보인 `process.env.NODE_ENV`이고, 여기에는 웹팩 설정의 `mode`에 설정한 값이 들어간다.
>   * 즉 우리 코드에서는 `"development"`가 들어가는 것이다!!

* 실제로 `app.js`에서 `process.env.NODE_ENV`를 확인해보면 아래처럼 나오게 된다.

![image-20230207204515640](01_webpack_basic.assets/image-20230207204515640.png)



* 그 외 환경변수를 넣고 싶다면, webpack.config.js 설정 방법

```javascript
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  ...
  plugins: [
    new webpack.DefinePlugin({
      TWO: '1+1',
      THREE: JSON.stringify('1+2')
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
  ],
};

```

> 이 때! TWO: `'1+1'`은 string이 아닌 코드이다. 즉 TWO라는 환경변수는 2라는 숫자가 나올 것이다.
>
> THREE처럼 작성해야 string 형태로 출력된다.
>
> 객체 형태로 넣어주는 것도 가능하다.. (미쳤다)

* 실제 결과를 보면 다음과 같다.

![image-20230207205409479](01_webpack_basic.assets/image-20230207205409479.png)



### HtmlWebpackPlugin

* 3rd party 플러그인으로, HTML 파일을 후처리하는데 사용한다.



* 패키지 다운로드

```bash
$ npm install -D html-webpack-plugin@3
```

* 해당 플러그인을 다운로드한 후, `index.html`을 `src/` 폴더로 옮긴다. (소스로 관리할 것이다!)
* 그리고 `script`를 지워준다.



* webpack.config.js 설정 방법

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  ...
  plugins: [
    new HtmlWebpackPlugin({
      // 템플릿 경로를 지정
      template: './src/index.html',
    }),
  ],
};

```

* 이러고 나면, `dist/` 폴더에 `index.html`이 들어간 것을 확인할 수 있다.
  * 그 안에 우리가 작성하지 않았던 js 로딩 코드가 들어가 있고 output 이름도 들어가 있다.
  * ![image-20230207210307171](01_webpack_basic.assets/image-20230207210307171.png)

* 그래서 이 index.html을 실행하면, 다른 것은 잘 나오나 `bg.png`가 로딩되지 않는다. 이는 url-loader 설정때문인데..

![image-20230207210526181](01_webpack_basic.assets/image-20230207210526181.png)

* 이미지 경로를 보면 `/dist/dist`가 되어있는 부분이 있다.
  * 이전에는 프로젝트 루트에 `index.html`이 존재해서, 빌드된 사진을 가져오려면 `dist/`폴더 내부라는 경로를 입력해줘야 했던 것이지만,
  * 이제는 `dist/`폴더에 `index.html`이 존재해서 그 경로를 없애주면 된다.
    * 즉, webpack.config.js에서 url-loader의 `publicPath`를 없애준다!!



* 이 플러그인을 사용하면 개발 환경에 따라 서로 다른 html을 생성해준다.
  * `src/index.html`의 `<title>`에 ejs 문법의 `<%= env %>`를 넣어준다.
  * 이 코드는 전달받은 env 변수 값을 출력한다.

* webpack.config.js 설정 방법

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
    })
  ]
}
```

> 환경 변수에 따라 타이틀 명 뒤에 "(개발용)" 문자열을 붙이거나 떼거나 하도록 했다. 
>
> NODE_ENV=development 로 설정해서 빌드하면 빌드결과 "Document(개발용)"으로 나온다. 
>
> NODE_ENV=production 으로 설정해서 빌드하면 빌드결과 "Document"로 나온다.

* 실제 빌드 결과

![image-20230207211337936](01_webpack_basic.assets/image-20230207211337936.png)



* 운영 환경에서는 파일을 압축하고, 불필요한 주석을 제거하는 것이 좋다.
* webpack.config.js 설정 방법

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
       minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
  ]
}
```

> * `collapseWhitespace`: 공백제거
> * `removeComments`: 주석제거

* 실행 결과 (운영환경일 때)

![image-20230207211742584](01_webpack_basic.assets/image-20230207211742584.png)

### CleanWebpackPlugin

### MiniCssExtractPlugin
