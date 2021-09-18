
import VueNumberEasy from './vueNumberEasy/index.js';

const components = [VueNumberEasy];

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$EASY = {
    UIClass: opts.UIClass || 'element',
  };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const VueComponentEasy = {
  install,
  VueNumberEasy,
}

export default VueComponentEasy

export { VueNumberEasy }
