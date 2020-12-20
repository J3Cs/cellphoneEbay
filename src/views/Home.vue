<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="d-none" />
    <Anuncios />
  </div>
</template>

<script>
// @ is an alias to /src
import Anuncios from "@/components/Anuncios.vue";

export default {
  name: "Home",
  components: {
    Anuncios,
  },
};
</script>
