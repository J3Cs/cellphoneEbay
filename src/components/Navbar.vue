<template>
  <div>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/log.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title style="color: #fff; font-weight: 700; margin-left: 3px">
        Cellphone Ebay</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <router-link to="/">
          <v-btn class="inicio"> Inicio </v-btn>
        </router-link>
        <router-link to="/">
          <v-btn class="estadisticas"> estadisticas </v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <router-link to="/nuevo">
          <v-btn> Nuevo Anuncio </v-btn>
        </router-link>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  background: #a52a2a;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #ff0067;
  color: #fff;
  font-weight: 800;
  transition: 0.3s;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  transform: scale(1.1);
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined).inicio {
  background: #109e68;
  margin-right: 5px;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined).estadisticas {
  background: #699e10;
}
</style>