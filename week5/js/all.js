// 匯入語系檔
import zh_TW from './zh_TW.js';
// 自定義設定檔，供外層綁定「錯誤的」className
// 剛好跟 bootstrap 的樣式寫法是一樣的
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

// 將語系加入 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

// 載入 VeeValidate input 驗證工具，並註冊成全域元件
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 載入 VeeValidate 完整表單 驗證工具，並註冊成全域元件
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 載入 vue-loading
Vue.component('loading', VueLoading);

new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
      num: 0,
    },
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    isLoading: false,
    uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8',
    apiPath: 'https://course-ec-api.hexschool.io',
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${this.apiPath}/api/${this.uuid}/ec/products?sort=asc`;
      axios.get(api).then((response) => {
        this.products = response.data.data;
        this.isLoading = false;
      });
    },
  },
});