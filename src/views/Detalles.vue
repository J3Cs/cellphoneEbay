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
          <v-btn @click="success"> Comprar <v-icon color="green">mdi-handshake</v-icon></v-btn>
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
                <li><v-icon color="black">mdi-checkbox-multiple-marked</v-icon>Estado: {{ anuncio.descripcion.estado }}</li>
                <li><v-icon color="black">mdi-briefcase</v-icon>Marca: {{ anuncio.descripcion.marca }}</li>
                <li><v-icon color="black">mdi-cellphone</v-icon>Modelo: {{ anuncio.descripcion.modelo }}</li>
                <li><v-icon color="black">mdi-tablet-cellphone</v-icon>Pantalla: {{ anuncio.descripcion.pantalla }}</li>
                <li><v-icon color="black">mdi-android</v-icon>Sistema: {{ anuncio.descripcion.sistema }}</li>
                <li><v-icon color="black">mdi-chip</v-icon>RAM: {{ anuncio.descripcion.ram }}</li>
                <li><v-icon color="black">mdi-memory</v-icon>ROM: {{ anuncio.descripcion.rom }}</li>
              </ul>
            </div>
          </v-col>
          <v-col class="col-12 col-md-6">
            <div class="descripcion__especificaciones">
              <p><v-icon color="black">mdi-text-box</v-icon>{{ anuncio.descripcion.descripcion }}</p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db, storage } from "../db";
import Swal from 'sweetalert2'
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
    success(){
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Agregado al carrito',
          timer: 2000,
          showConfirmButton: false
        })
    },
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
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff,
              inset -5px -5px 5px rgba(255, 255, 255, 0.5),
              inset 5px 5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  margin-right: 3em;
  margin-left: 4em;
  height: 100%;
  transition: 0.3s;
}
.descripcion__especificaciones:hover {
  box-shadow: 6px 10px 5px rgba(0, 0, 0, 0.5);
}
.descripcion__especificaciones ul {
  list-style: none;
}
.descripcion__especificaciones li {
  position: relative;
  margin: 0.5rem;
  font-size: 1.5em;
}
.descripcion__especificaciones li::before {
  position: absolute;
  content: '';
  top: 0;
  left: -0.5em;
  width: 0%;
  height: 100%;
  border-radius: 25px;
  background: rgba(0,0,255, 0.3);
  transition: 0.5s ease-in-out;
}
.descripcion__especificaciones li:hover::before {
  width: 100%;
}
.descripcion__especificaciones p {
  margin: 0.5rem;
  font-size: 1.2em;
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
