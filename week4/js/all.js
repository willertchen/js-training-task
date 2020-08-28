new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
      imageUrl: [],
    },
    user: {
      token: '',
      uuid: '',
    },
  },
  created() {
    // 從 Cookies 取得 token & uuid
    // 會把 uuid 存 Cookies，這樣不同的帳號也可以使用這個網頁
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    this.user.uuid = document.cookie.replace(/(?:(?:^|.*;\s*)uuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (this.user.token === '' && this.user.uuid === '') {
      // 如果沒取得 token & uuid 就返回登入頁
      window.location = 'Login.html';
    }

    this.getProducts();
  },
  methods: {
    /**
     * 取得產品清單
     */
    getProducts() {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products`;

      // 預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((response) => {
        this.products = response.data.data;
      });
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          // 新增前先清空 tempProduct，避免下次打開 Modal 時，發生資料不正確的問題
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          // 先取得單一產品的詳細資訊，再打開 Modal
          this.getProduct(item.id);
          break;
        case 'delete':
          // 因下面的 item 是淺拷貝，需要用「深拷貝」的方式接資料，避免修改資料時，沒按儲取，一樣能修改資料
          this.tempProduct = Object.assign({}, item);
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    /**
     * 取得單一產品
     * @param id 傳入產品的 ID
     */
    getProduct(id) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/product/${id}`;
      axios.get(api).then((res) => {
        //  成功取得資料，丟到 tempProduct
        this.tempProduct = res.data.data;
        // 資料成功寫入 tempProduct，打開 Modal
        $('#productModal').modal('show');
      }).catch((error) => {
        console.log(error);  // 如果出現錯誤，就打印在 log
      });

    },
    updateProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((product, index) => {
          if (product.id === id) {
            this.products[index] = this.tempProduct;
          }
        });
      } else {
        const id = Math.floor(Date.now());
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }

      $('#productModal').modal('hide');
    },
    deleteProduct() {
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

      axios.delete(url).then(() => {
        $('#deleteModal').modal('hide'); // 刪除成功，關閉 Modal
        this.getProducts(); // 重新取得資料
      });

    }
  }
});