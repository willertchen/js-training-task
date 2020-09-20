<template>
  <div class="dashboard">
    <div class="nav">
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/">返品前台首頁</router-link> |
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 從 Cookies 取得 hexToken
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;

      // 預設帶入 token
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      this.$http.post(api, { api_token: this.token }).then((res) => {
        if (!res.data.success) {
          this.$router.push({
            path: 'login',
          });
        } else {
          this.checkSuccess = true;
        }
      });
    },
  },
};
</script>
