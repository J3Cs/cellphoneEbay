<template>
  <div>
    <v-row class="ml-1">
      <v-col class="col-md-6 col-12">
        <v-carousel height="400" v-show="items.length > 0">
          <v-carousel-item v-for="(item, i) in items" :key="i">
            <img :src="item" style="height: 100%; width: 100%" />
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col class="col-12 offset-md-1 col-md-5">
        <div class="informacion">
          <h2 class="informacion__titulo" style="text-align: center">
            {{ anuncio.titulo }}
          </h2>
          <h3 class="informacion__precio">${{ anuncio.precio }}</h3>
          <v-btn> Comprar <v-icon color="green">mdi-handshake</v-icon></v-btn>
          <div class="informacion__contacto">
            <span class="informacion__contacto__label" >
              <v-icon>mdi-account</v-icon>vendedor:</span
            ><span class="informacion__contacto__vendedor" >{{
              anuncio.nombre
            }}</span>
            <span class="informacion__contacto__label" ><v-icon>mdi-phone</v-icon>Telefono: </span
            ><span class="informacion__contacto__telefono" >{{
              anuncio.telefono
            }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h1
          style="text-decoration: underline; text-align: center;"
          class="col-12"
        >
          Descripcion
        </h1>
        <v-row>
          <v-col class="col-12 col-md-6">
            <div class="descripcion__especificaciones">
              <ul>
                <li><v-icon color="white">mdi-checkbox-multiple-marked</v-icon>Estado: {{ anuncio.descripcion.estado }}</li>
                <li><v-icon color="white">mdi-briefcase</v-icon>Marca: {{ anuncio.descripcion.marca }}</li>
                <li><v-icon color="white">mdi-cellphone</v-icon>Modelo: {{ anuncio.descripcion.modelo }}</li>
                <li><v-icon color="white">mdi-tablet-cellphone</v-icon>Pantalla: {{ anuncio.descripcion.pantalla }}</li>
                <li><v-icon color="white">mdi-android</v-icon>Sistema: {{ anuncio.descripcion.sistema }}</li>
                <li><v-icon color="white">mdi-chip</v-icon>RAM: {{ anuncio.descripcion.ram }}</li>
                <li><v-icon color="white">mdi-memory</v-icon>ROM: {{ anuncio.descripcion.rom }}</li>
              </ul>
            </div>
          </v-col>
          <v-col class="col-12 col-md-6">
            <div class="descripcion__especificaciones">
              <p><v-icon color="white">mdi-text-box</v-icon>{{ anuncio.descripcion.descripcion }}</p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db, storage } from "../db";
export default {
  data() {
    return {
      anuncio: {
        descripcion: {}
      },
      id: this.$route.params.id,
      items: []
    };
  },
  methods: {
    getImages() {
      this.items = [];
      const ref = storage.ref();
      const carpeta = this.id;
      let this2 = this;
      ref
        .child(`${carpeta}/`)
        .listAll()
        .then(result => {
          result.items.forEach(imgRef => {
            imgRef.getDownloadURL().then(url => {
              this2.items.push(url);
            });
          });
        });
    }
  },
  async created() {
    this.anuncio = await db
      .collection("anuncios")
      .doc(this.id)
      .get()
      .then(snapshot => {
        return snapshot.data();
      });
    this.getImages();
  }
};
</script>
<style scoped>
.informacion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
.informacion__titulo {
  font-size: 3em;
  color: #000;
  font-weight: 800;
}
.informacion__precio {
  font-size: 3em;
  color: #000;
}
.informacion__contacto {
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  border: 2px solid #000;
  border-radius: 15px;
  padding: 1.5em;
  box-shadow: -3px 5px 5px rgba(0, 0, 0, 0.5);
}
.informacion__contacto__label {
  font-weight: 600;
  margin-right: 0.5em;
  text-transform: capitalize;
}
.informacion__contacto__vendedor {
  margin-right: 2em;
}
.descripcion__especificaciones {
  padding: 1em;
  text-align: left;
  border: 1px solid #fff;
  box-shadow: -6px 10px 5px #1a237e;
  border-radius: 15px;
  margin-right: 3em;
  margin-left: 4em;
  background: linear-gradient(270deg, #1a237e, #5c6bc0);
  color: #fff;
  height: 100%;
  transition: 0.3s;
}
.descripcion__especificaciones:hover {
  box-shadow: 6px -10px 5px #1a237e;
  background: linear-gradient(270deg, #5c6bc0, #1a237e);
}
.descripcion__especificaciones ul {
  list-style: none;
}
.descripcion__especificaciones li {
  margin: 0.5rem;
  font-size: 1.5em;
}
.descripcion__especificaciones p {
  margin: 0.5rem;
  font-size: 1em;
  margin-left: 3em;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  margin-top: 2em;
  background: transparent;
  border: 1px solid rgb(7, 201, 39);
  color: rgb(7, 201, 39);
  box-shadow: none;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background: rgb(7, 201, 39);
  color: #fff;
  box-shadow: none;
}
</style>
