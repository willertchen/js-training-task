<template>
  <div class="dashboard">
    <div class="nav">
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/">返品前台首頁</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
    };
  },
};
</script>
