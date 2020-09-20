<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">Navbar</a>
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
        <router-link class="nav-item nav-link mr-4" to="/">Home</router-link>
        <router-link class="nav-item nav-link mr-4" to="/products">Products</router-link>
        <router-link class="nav-item nav-link mr-4" to="/login">Login</router-link>
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
