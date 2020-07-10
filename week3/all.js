new Vue({
  el: '#app',
  data: {
      products: [],
      uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8',
      tempProduct: {}
  },
  mounted () {
    axios
      .get(`https://course-ec-api.hexschool.io/api/${this.uuid}/ec/products`)
      .then(response => (this.products = response.data.data));
  },
  methods: {
    openModal(type, item) {
      switch (type) {
        case 'new':

          break;
        case 'edit':
          this.getProduct(item.id);
          break;
        case 'delete':
          break;
        default:
          break;
      }
    },
    getProduct(id) {
      axios
      .get(`https://course-ec-api.hexschool.io/api/${this.uuid}/ec/product/${id}`)
      .then(response => (this.tempProduct = response.data.data))
      .then(() => {
        $('#productModal').modal('show');  // 此處再接一個 .then() 以確保打個 Dialog 之前，能把資料下載好
      });
    }
  }
});