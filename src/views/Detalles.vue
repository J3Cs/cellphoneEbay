<template>
  <div>
    <v-row style="margin-top: 4em; margin-left: 0.5em">
      <v-col cols="6">
        <v-carousel height="400" v-show="items.length > 0">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item"
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="6" offset="1">
        <div class="informacion">
          <h2 class="informacion__titulo">{{ anuncio.titulo }}</h2>
          <h3 class="informacion__precio">${{ anuncio.precio }}</h3>
          <v-btn> Comprar </v-btn>
          <div class="informacion__contacto">
            <span class="informacion__contacto__label">vendedor: </span
            ><span class="informacion__contacto__vendedor">{{
              anuncio.nombre
            }}</span>
            <span class="informacion__contacto__label">Telefono: </span
            ><span class="informacion__contacto__telefono">{{
              anuncio.telefono
            }}</span>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h1 style="text-decoration: underline">Descripcion</h1>
        <v-col cols="12" class="especs">
          <div class="col-5 descripcion__especificaciones">
            <ul>
              <li>Estado: {{ anuncio.descripcion.estado }}</li>
              <li>Marca: {{ anuncio.descripcion.marca }}</li>
              <li>Modelo: {{ anuncio.descripcion.modelo }}</li>
              <li>Pantalla: {{ anuncio.descripcion.pantalla }}</li>
              <li>Sistema: {{ anuncio.descripcion.sistema }}</li>
              <li>RAM: {{ anuncio.descripcion.ram }}</li>
              <li>ROM: {{ anuncio.descripcion.rom }}</li>
            </ul>
          </div>

          <div class="col-5 descripcion__especificaciones">
            <p>{{ anuncio.descripcion.descripcion }}</p>
          </div>
        </v-col>
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
        descripcion: {},
      },
      id: this.$route.params.id,
      items: [],
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
        .then((result) => {
          result.items.forEach((imgRef) => {
            imgRef.getDownloadURL().then((url) => {
              this2.items.push(url);
            });
          });
        });
    },
  },
  async created() {
    this.anuncio = await db
      .collection("anuncios")
      .doc(this.id)
      .get()
      .then((snapshot) => {
        return snapshot.data();
      });
    this.getImages();
  },
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
}
.informacion__contacto__label {
  font-weight: 600;
  margin-right: 0.5em;
  text-transform: capitalize;
}
.informacion__contacto__vendedor {
  margin-right: 2em;
}
.especs {
  display: flex;
  align-content: space-between;
}
.descripcion__especificaciones {
  padding: 1em;
  text-align: left;
  border: 1px solid #000;
  border-radius: 15px;
  margin-right: 3em;
  margin-left: 4em;
}
.descripcion__especificaciones ul {
  list-style: none;
}
.descripcion__especificaciones li {
  margin: 0.5rem;
  font-size: 1.5em;
  margin-left: 3em;
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
</style>