new Vue({
  el: '#app',
  data: {
      products: [],
      uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8',
      token: '9eGzKr3bG6zhJlINdEk4DqjUW163r6VeZ1l4UMHIMrhQlw3ElSUeYzTdIWFj',
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
    },
    updateProduct() {

      const url = new URL(
          `https://course-ec-api.hexschool.io/api/${this.uuid}/admin/ec/product/${this.tempProduct.id}`
      );

      let headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${this.token}`,
      };

      let body = {
          "title": this.tempProduct.title,
          "category": this.tempProduct.category,
          "content": this.tempProduct.content,
          "description": this.tempProduct.description,
          "imageUrl": [
            this.tempProduct.imageUrl[0]
          ],
          "enabled": this.tempProduct.enabled,
          "origin_price": this.tempProduct.origin_price,
          "price": this.tempProduct.price,
          "unit": this.tempProduct.unit,
      };

      fetch(url, {
          method: "PATCH",
          headers: headers,
          body: body
      })
      .then(response => response.json())
      .then(json => console.log(json));

      // this.tempProduct = {};
      // $('#productModal').modal('hide');
    }
  }
});