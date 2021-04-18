
import VueNumberEasy from './vueNumberEasy/index.js';

const components = [VueNumberEasy];

const install = function (Vue) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  VueNumberEasy,
}

export default {
  install, // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  VueNumberEasy,
};
