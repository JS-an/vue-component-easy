# vue-component-easy

## install

#### npm

```diff
npm install vue-component-easy --save
```

#### yarn

```diff
yarn add vue-component-easy
```

## Usage

```js
// main.js

import Vue from "vue";

// 单独引用/alone
import { VueNumberEasy } from "vue-component-easy";
Vue.use(VueNumberEasy);

// 或/or

// 全部引用/all
import VueComponentEasy from "vue-component-easy";
Vue.use(VueComponentEasy);
```

```js
<template>
  <VueNumberEasy v-model="value"></VueNumberEasy>
</template>

<script>

export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
```

## CDN

例如: [使用 jsdelivrCDN](https://www.jsdelivr.com/package/npm/vue-component-easy "使用jsdelivrCDN")

```html
<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-component-easy@latest/lib/vue-component-easy.umd.min.js"></script>
```

如果 Vue 通过 npm 安装(不通过 CDN 引入),则需要加入下列代码

```js
// main.js
Vue.use(window["vue-component-easy"].default);
```

## 全局配置

在引入时，可以传入一个全局配置对象。该对象目前支持 UIClass 字段。UIClass 用于改变组件的默认样式。按照引入的方式，具体操作如下：

完整引入:

```js
// main.js
import Vue from "vue";
import VueComponentEasy from "vue-component-easy";
Vue.use(VueComponentEasy, { UIClass: "ant" });
```

按需引入:

```js
// main.js
import Vue from "vue";
import { VueNumberEasy } from "vue-component-easy";
Vue.prototype.$EASY = { UIClass: "ant" };
Vue.use(VueNumberEasy);
```

## Options

### Props

| Props           | Type   | Default     | Description                                                                       |
| --------------- | ------ | ----------- | --------------------------------------------------------------------------------- |
| value / v-model | number | null        | 绑定值                                                                            |
| numberType      | String | positiveInt | 类型; 例如:正整数(positiveInt), 整数(int), 正浮点数(positiveFloat), 浮点数(float) |
| decimal         | number | 2           | 小数点保留位数(需在`positiveFloat`或`float`模式下使用)                            |
| prepend         | String | ""          | 前置字符                                                                          |
| append          | String | ""          | 后置字符                                                                          |
| UIClass         | String | "element"   | 使用样式: "element" 或 "ant"(需引入相应的框架样式)                                |

### event

| event  | Description | Callback Arguments |
| ------ | ----------- | ------------------ |
| input  | 输入事件    | value              |
| focus  | 聚焦事件    | value              |
| blur   | 失焦事件    | value              |
| change | 值变化事件  | value              |
