<template>
  <div>
    <Sidebar></Sidebar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4">
          <router-view :token="token" v-if="checkSuccess"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
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
            path: '/Login',
          });
        } else {
          this.checkSuccess = true;
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.$router.push({
          path: '/Login',
        });
      });
    },
    // logOut() {
    //   document.cookie = 'hexToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //   this.$router.push({
    //     path: '/Login',
    //   });
    // },
  },
};
</script>
