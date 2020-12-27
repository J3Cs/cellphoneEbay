<template>
  <div>
    <v-app-bar app class="d-none d-md-block" color="white">
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
      <v-toolbar-title class="title"> Cellphone Ebay</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <router-link to="/">
          <v-btn class="inicio">
            <v-icon>mdi-home-circle</v-icon> Inicio
          </v-btn>
        </router-link>
        <router-link to="/stats">
          <v-btn class="estadisticas">
            <v-icon>mdi-chart-bar</v-icon> estadisticas
          </v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex mr-2">
        <router-link to="/nuevo">
          <v-btn>
            Nuevo Anuncio
            <v-icon>mdi-clipboard-plus</v-icon>
          </v-btn>
        </router-link>
        <v-badge class="mt-1" color="error" content="1">
          <v-icon color="primary" class="ml-3 text-h4">mdi-cart</v-icon>
        </v-badge>
      </div>
    </v-app-bar>

    <v-app-bar color="white" dark class="d-md-none d-block">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="primary"></v-app-bar-nav-icon>

      <v-toolbar-title class="title">Cellphone Ebay</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      color="white"
    >
      <v-list nav dense>
        <div class="information">
          <v-list-item-avatar>
            <v-img src="../assets/log.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="title">Cellphone Ebay</v-list-item-title>
        </div>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <router-link class="link" to="/">
              <v-icon>mdi-home-circle</v-icon>Inicio
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link class="link" to="/nuevo">
              <v-icon>mdi-clipboard-plus</v-icon> Nuevo Anuncio
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link class="link" to="/stats">
              <v-icon>mdi-chart-bar</v-icon> Estadisticas
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.information {
  display: flex;
  color: #fff;
  margin-left: 1.2em;
}
.link {
  margin-top: 1em;
  background: #fff;
  color: #1a237e;
  font-weight: 500;
  border: 1px solid #fff;
  text-align: center;
  border-radius: 15px;
  width: 100%;
  padding: 0.4em;
  box-shadow: 0 5px 5px rgba(255, 255, 255, 0.5);
}
.title {
  color: #1A237E;
  font-weight: 700;
  margin-left: 3px;
  text-shadow: 0 2px 15px rgba(0, 0, 255, 0.5);
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
