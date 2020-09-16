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
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    isLoading: false,
  },
  methods: {
    checkSubmit() {
      console.log(this.form);
    }
  }
});