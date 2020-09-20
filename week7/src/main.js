import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Loading 套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.component('Loading', Loading);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
