<template>
  <div>
    <h1>單一產品</h1>
    <table>
      <tr>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      this.$http.get(api).then((res) => {
        this.product = res.data.data;
      });
    },
  },
  created() {
    // 透過 prototype this.$route 取得 params 屬性
    const { id } = this.$route.params;
    this.getProduct(id);
  },
};
</script>
