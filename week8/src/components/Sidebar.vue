<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">後台管理系統</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: '產品頁面'}">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: '優惠券'}">優惠卷列表</router-link>
        </li><li class="nav-item">
          <router-link class="nav-link" :to="{ name: '圖片頁面'}">圖片頁面</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: '訂單列表'}">訂單列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: '用戶訂單'}">模擬下單系統</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="signOut">
            登出
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
    };
  },
  methods: {
    signOut() {
      document.cookie = 'hexToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.$router.push('/login');
    },
  },
};
</script>
