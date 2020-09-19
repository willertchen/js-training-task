<template>
  <div>
    <h1>產品列表</h1>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>{{ item.price }}</td>
        <td>
          <router-link :to="`product/${item.id}`">看產品</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?sort=asc`;

      this.$http.get(api).then((response) => {
        this.products = response.data.data;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
