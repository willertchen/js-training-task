// 自定義設定檔，供外層綁定「錯誤的」className
// 剛好跟 bootstrap 的樣式寫法是一樣的
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

// 載入 VeeValidate input 驗證工具，並註冊成全域元件
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 載入 VeeValidate 完整表單 驗證工具，並註冊成全域元件
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

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
  },
  methods: {
    checkSubmit() {
      console.log(this.form);
    }
  }
});