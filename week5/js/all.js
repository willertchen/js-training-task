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
    status: {
      loadingItem: '', //透過此屬性，可以綁定單一個產品的 Btn，取資料時，Btn 則會帶有「旋轉效果」
    },
    cart: {},
    cartTotal: 0,
    isLoading: false,
    uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8',
    apiPath: 'https://course-ec-api.hexschool.io',
  },
  created() {
    this.getProducts();
    this.getCart();
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
    getProductDetail(id) {
      this.status.loadingItem = id;
      const api = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`;
      axios.get(api).then((response) => {
        this.tempProduct = response.data.data;

        // 使用 $set 在 tempProdct 裡面，新增屬性 num，供 option 選定數量時能存起來
        // 因 tempProduct 沒有 num 的預設值
        // 如果直接用物件新增屬性則會雙向綁定失敗
        this.$set(this.tempProduct, 'num', 0);
        $('#productModal').modal('show');
        this.status.loadingItem = ''; // 結束 btn 的等待效果
      });
    },
    getCart() {
      this.isLoading = true;
      const api = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      axios.get(api).then((response) => {
        this.cart = response.data.data;
        // 重新計算購物車價格時，要先歸 0，避免把上次的金額一並加上去
        this.cartTotal = 0;
        // 購物車累加金額
        this.cart.forEach(item => {
          this.cartTotal += (item.product.price * item.quantity);
        });
        this.isLoading = false;
      });
    },
    addToCart(item, quantity = 1) {
      this.status.loadingItem = item.id;
      const api = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      const cart = {
        product: item.id,
        quantity,
      };
      axios.post(api, cart).then(() => {
        this.status.loadingItem = '';
        $('#productModal').modal('hide');
        this.getCart();
      }).catch((err) => {
        this.status.loadingItem = '';
        console.log(err.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
    quantityUpdata(id, num) {
      // 避免新增的數量是 0
      if(num <= 0) return;

      this.isLoading = true;
      const api = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };

      axios.patch(api, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const api = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`;
      axios.delete(api).then(() => {
        this.isLoading = true;
        this.getCart();
      });
    },
    removeCartAllItem() {
      this.isLoading = true;
      const api = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`;
      axios.delete(api).then(() => {
        this.isLoading = true;
        this.getCart();
      });
    }
  }
});