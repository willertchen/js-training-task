new Vue({
  el: '#app',
  data () {
    return {
      products: [],
      uuid: 'd5cc7331-56ba-49f5-9c9f-6c2038f2b0a8'
    }
  },
  mounted () {
    axios
      .get(`https://course-ec-api.hexschool.io/api/${this.uuid}/ec/products`)
      .then(response => (this.products = response.data.data));
  }
});