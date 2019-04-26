# less-plugin-import-ignore-prefix

Ignore specific prefix when import in less.js.

## Usage

In less file:

```less
@import "~themes/default.less";
```

## Programmatic usage

```js
var createImportIgnorePrefixPlugin = require("less-plugin-import-ignore-prefix");
var options = { plugins: [createImportIgnorePrefixPlugin({ prefix: '~' })] };
less.render(css, options)
    .then(...
```

从 less-loader 4 开始，用户可以选择使用 less 内建模块机制还是 webpack 模块机制，默认是 webpack 模块机制。但是如果你需要使用 webpack `resolve.module` 功能，需要在 `@import` 时添加 `~`，例如：

```less
@import '~bootstrap/less/bootstrap';
```

但是对于跨端项目（rn, web 三端项目）, React-Native 编译使用 `react-native-less-transformer` 解析 less 文件，使用的是 less 内建模块，`~` 就会导致模块找不到，rn 编译报错。此时就需要引入本项目插件。
