<template>
  <div class="position-relative">
    <Sidebar></Sidebar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4">
          <router-view/>
          <Subscribe></Subscribe>
          <Footer></Footer>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';
import Subscribe from '@/components/Subscribe.vue';

export default {
  name: 'Index',
  components: {
    Sidebar, Footer, Subscribe,
  },
  data() {
    return {
    };
  },
};
</script>
