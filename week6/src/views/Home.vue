<template>
  <div class="home">
    <div class="nav">
      <router-link to="/">前台首頁</router-link> |
      <router-link to="/about">關於</router-link> |
      <router-link to="/products">產品列表</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
};
</script>
