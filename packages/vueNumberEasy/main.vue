<!-- form表单测试 -->
<template>
  <div :class="getClass(UIClass).div">
    <div v-if="prepend" :class="getClass(UIClass).prepend">{{ prepend }}</div>
    <input
      :class="getClass(UIClass).input"
      ref="input"
      :value="viewValue"
      v-bind="$attrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <div v-if="append" :class="getClass(UIClass).append">{{ append }}</div>
  </div>
</template>

<script>
export default {
  name: "VueNumberEasy",
  props: {
    value: {
      type: [Number, null],
      default: null,
    },
    numberType: {
      type: String,
      default: "positiveInt",
    },
    decimal: {
      type: Number,
      default: 2,
    },
    prepend: {
      type: String,
      default: "",
    },
    append: {
      type: String,
      default: "",
    },
    UIClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      viewValue: null,
      actualValue: null,
    };
  },
  computed: {
    getDecimal() {
      return new RegExp(`^0*(-?\\d+)(\\.(\\d{0,${this.decimal}}))?\\S*?$`);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue === oldValue) return false;
        const val =
          Object.prototype.toString.call(newValue) === "[object Number]"
            ? newValue.toString()
            : "";
        var formatted = this.TransformNum(this.numberType, val);
        this.viewValue = formatted;
      },
    },
  },
  methods: {
    /**
     * 样式方法
     * @param type String("element","ant")
     * */
    getClass(t) {
      const type = t || (this.$EASY || {}).size || "";
      switch (type) {
        case "element":
          return {
            div: [
              this.$attrs.size ? "el-input--" + this.$attrs.size : "",
              {
                "el-input": true,
                "is-disabled": this.$attrs.disabled,
                "el-input-group": true,
                "el-input-group--append": true,
              },
            ],
            input: [{ "el-input__inner": true }],
            prepend: [{ "el-input-group__prepend": true }],
            append: [{ "el-input-group__append": true }],
          };
        case "ant":
          return {
            div: "ant-input-group",
            input: [
              this.$attrs.size ? "ant-input-" + this.$attrs.size : "",
              { "ant-input": true, disabled: this.$attrs.disabled },
            ],
            prepend: [{ "ant-input-group-addon": true }],
            append: [{ "ant-input-group-addon": true }],
          };
        default:
          return {
            div: "easy-number-group",
            input: "easy-number",
            prepend: [
              {
                "easy-number-group__addon": true,
                "easy-number-group__prepend": true,
              },
            ],
            append: [
              {
                "easy-number-group__addon": true,
                "easy-number-group__append": true,
              },
            ],
          };
      }
    },
    /**
     * 转换方法
     * @param numberType String
     * @param val String(需要转换的值)
     * */
    TransformNum(numberType, val) {
      switch (numberType) {
        // 正整数
        case "positiveInt":
          return val.length > 1
            ? val
                .replace(/^0/, "") // 首位零去除
                .replace(/[^0-9]/g, "") // 移除数字之外的所有字符
                .replace(/\B(?=(\d{3})+$)/g, ",") // 每三位","分割
            : val.replace(/\D+$/g, ""); // 移除数字之外的所有字符
        // 整数
        case "int":
          return val.length > 1
            ? val
                .replace(/^0/, "")
                .replace(/(?!^)-/g, "") // 移除第一个负号之外的所有负号
                .replace(/[^0-9-]/g, "") // 移除数字 负号之外的所有字符
                .replace(/\B(?=(\d{3})+$)/g, ",") // 每三位","分割
            : val.replace(/[^0-9-]/g, ""); // 移除数字 负号之外的所有字符
        // 正浮点数
        case "positiveFloat":
          return (
            val
              .replace(/^\d+-$/, val.replace(/-$/, ""))
              .replace(/[^0-9.]/g, "") // 移除数字 小数点之外的所有字符
              // .replace(/(?<!^[\d-]+)\./g, "") // 移除第一个小数点之外的所有句点(下一条正则可以实现此规则，且ie不支持回顾断言)
              .replace(this.getDecimal, "$1$2") // 保留小数
              .replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,")
          ); // 小数点前每三位","分割
        // 浮点数
        case "float":
          return (
            val
              // .replace(/^\d+-$/, val.replace(/-$/, ""))
              .replace(/[^0-9.-]/g, "") // 移除数字 小数点 负号之外的所有字符
              .replace(/-(\D+)/, "-") // 移除第一个负号之后的所有字符
              .replace(/^-0\d+$/, val.replace(/^-0/, "-"))
              .replace(/(?!^)-/g, "") // 移除第一个负号之外的所有负号
              // .replace(/(?<!^[\d-]+)\./g, "") // 移除第一个小数点之外的所有句点
              .replace(this.getDecimal, "$1$2") // 保留小数
              .replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,")
          ); // 小数点前金额每三位","分割
        default:
          return val;
      }
    },
    handleInput(e) {
      const val = e.target.value;
      const viewValue = this.TransformNum(this.numberType, val);
      if (viewValue !== val) this.viewValue = null;
      this.viewValue = viewValue;
      const num = parseFloat(viewValue.replace(/,/g, ""));
      this.actualValue = num;
      this.$emit("input", isNaN(num) ? null : num);
    },
    handleFocus() {
      this.$emit("focus", this.actualValue);
    },
    handleBlur() {
      this.$emit("blur", this.actualValue);
    },
    handleChange() {
      this.$emit("change", this.actualValue);
    },
  },
};
</script>
