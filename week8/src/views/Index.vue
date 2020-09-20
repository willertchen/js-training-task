<template>
  <div>
    <Sidebar></Sidebar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Index',
  components: {
    Sidebar,
  },
  data() {
    return {
    };
  },
};
</script>
