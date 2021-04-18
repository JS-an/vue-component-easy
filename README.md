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
import VueCalendar from 'vue-number-easy'

export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
```

## Options

### Props

| Props      | Type   | Default     | Description                                                                            |
| ---------- | ------ | ----------- | -------------------------------------------------------------------------------------- |
| value      | number | null        | 绑定值                                                                                 |
| numberType | String | positiveInt | 类型; 例如:正整数(positiveInt), 整数(int), 正浮点数(positiveFloat), 浮点数(twoDecimal) |
| prepend    | String | ""          | 前置字符                                                                               |
| append     | String | ""          | 后置字符                                                                               |
| UIClass    | String | "element"   | 使用样式: "element" 或 "ant"(需引入相应的框架样式)                                     |

### event

| event  | Description | Callback Arguments |
| ------ | ----------- | ------------------ |
| input  | 输入事件    | value              |
| focus  | 聚焦事件    | value              |
| blur   | 失焦事件    | value              |
| change | 值变化事件  | value              |