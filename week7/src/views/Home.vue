<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    >
    <router-link
      class="btn btn-outline-primary"
      to="/login"
    >
      登入後台
    </router-link>
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
