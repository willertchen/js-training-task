<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="navbar-brand"
        to="/Home">Navbar</router-link>
    <button class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarNavAltMarkup" class="collapse navbar-collapse justify-content-end">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link mr-4"
          class-active="active" to="/Home">Home</router-link>
        <router-link class="nav-item nav-link mr-4"
          class-active="active" to="/products">Products</router-link>
        <router-link class="nav-item nav-link mr-4"
          class-active="active" to="/cart">
          <i class="fas fa-shopping-cart"></i>
        </router-link>
        <router-link class="nav-item nav-link mr-4"
          class-active="active" to="/login">Login</router-link>
      </div>

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
  },
};
</script>
