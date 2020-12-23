<template>
  <div class="containerd">
    <v-row style="margin-top: -4em">
      <v-text-field
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        v-model="search"
      ></v-text-field>
    </v-row>
    <v-row class="d-flex d-md-none">
      <v-col class="d-flex">
        <v-expansion-panels class="col-8">
          <v-expansion-panel>
            <v-expansion-panel-header> Ordenar por: </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn class="btns col-12" @click="orderByPrecio()">Precio</v-btn>
              <v-btn class="btns col-12">Fecha</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col class="col-3">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo darken-4" v-bind="attrs" v-on="on" dark>
              <v-icon> mdi-filter </v-icon>
            </v-btn>
          </template>

          <div class="filtros" style="background: rgba(255, 255, 255, 0.9)">
            <div class="filtros__marcas">
              <h3>Marcas</h3>
              <ul>
                <li v-for="(marca, index) in contMarca" :key="index">
                  <input
                    type="checkbox"
                    @click="
                      filtrosCheck(marca.marca);
                      dialog = false;
                    "
                  />
                  <label for="check">
                    {{ marca.marca }}
                    <v-chip style="background: brown; color: #fff">{{
                      marca.cant
                    }}</v-chip>
                  </label>
                </li>
              </ul>
            </div>
            <div class="filtros__marcas">
              <h3>Sistema</h3>
              <ul>
                <li v-for="(sistema, index) in contSistema" :key="index">
                  <input
                    type="checkbox"
                    @click="
                      filtrosCheck(sistema.sistema);
                      dialog = false;
                    "
                  />
                  <label for="check">
                    {{ sistema.sistema }}
                    <v-chip style="background: brown; color: #fff">{{
                      sistema.cant
                    }}</v-chip>
                  </label>
                </li>
              </ul>
            </div>
            <div class="filtros__marcas">
              <h3>Pantalla</h3>
              <ul>
                <li v-for="(pantalla, index) in contPantalla" :key="index">
                  <input
                    type="checkbox"
                    @click="
                      filtrosCheck(pantalla.pantalla);
                      dialog = false;
                    "
                  />
                  <label for="check">
                    {{ pantalla.pantalla }}
                    <v-chip style="background: brown; color: #fff">{{
                      pantalla.cant
                    }}</v-chip>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" class="d-none d-md-flex">
        <div class="filtros">
          <div class="filtros__marcas">
            <h3>Marcas</h3>
            <ul>
              <li v-for="(marca, index) in contMarca" :key="index">
                <input type="checkbox" @click="filtrosCheck(marca.marca)" />
                <label for="check">
                  {{ marca.marca }}
                  <v-chip style="background: brown; color: #fff">{{
                    marca.cant
                  }}</v-chip>
                </label>
              </li>
            </ul>
          </div>
          <div class="filtros__marcas">
            <h3>Sistema</h3>
            <ul>
              <li v-for="(sistema, index) in contSistema" :key="index">
                <input type="checkbox" @click="filtrosCheck(sistema.sistema)" />
                <label for="check">
                  {{ sistema.sistema }}
                  <v-chip style="background: brown; color: #fff">{{
                    sistema.cant
                  }}</v-chip>
                </label>
              </li>
            </ul>
          </div>
          <div class="filtros__marcas">
            <h3>Pantalla</h3>
            <ul>
              <li v-for="(pantalla, index) in contPantalla" :key="index">
                <input
                  type="checkbox"
                  @click="filtrosCheck(pantalla.pantalla)"
                />
                <label for="check">
                  {{ pantalla.pantalla }}
                  <v-chip style="background: brown; color: #fff">{{
                    pantalla.cant
                  }}</v-chip>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </v-col>
      <v-col class="col-sm-12 col-md-10">
        <div class="d-none d-md-flex">
          <v-row>
            <v-col cols="8" class="utils">
              <v-row>
                <small
                  class="red text-center rounded-pill col-12 white--text text-700"
                  v-show="priceErr"
                >
                  Por favor, ingrese un rango valido
                </small>
              </v-row>
              <v-row>
                <h3 class="col-12">Precio</h3>
                <v-text-field
                  label="Desde"
                  v-model="desde"
                  style="margin-right: 1em"
                />
                <v-text-field label="Hasta" v-model="hasta" />
                <v-btn
                  class="btns"
                  @click="filtroPrecio(desde, hasta)"
                  :disabled="hasta == 0"
                >
                  Buscar
                </v-btn>
              </v-row>
            </v-col>
            <v-col cols="2" style="margin-left: 1em" class="utils">
              <v-row>
                <h3 class="col-12">Ordenar</h3>
                <v-btn
                  class="btns col-12"
                  @click="orderByPrecio()"
                  style="margin-right: 1em"
                >
                  Precio
                  <v-icon>mdi-order-numeric-ascending</v-icon>
                </v-btn>
                <v-btn class="btns col-12">
                  Fecha
                  <v-icon>mdi-order-bool-ascending</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <v-row v-if="loading">
          <v-progress-circular
            :width="9"
            :value="100"
            :size="200"
            style="margin-top: 1em"
            indeterminate
            v-show="loading"
            class="col-10"
            color="deep-orange lighten-2"
          ></v-progress-circular>
        </v-row>
        <v-row v-else>
          <v-card
            v-for="(anuncio, index) in anuncios"
            :key="index"
            v-show="filtrar(index)"
            class="mx-auto col-3 card-p"
            max-width="320"
          >
            <div v-for="(image, index) in images" :key="index">
              <div v-if="anuncio.id == image.id">
                <v-img height="250" :src="image.url"></v-img>
              </div>
            </div>
            <v-card-title>{{ anuncio.titulo }}{{ images.url }}</v-card-title>
            <v-card-subtitle>$ {{ anuncio.precio }}</v-card-subtitle>

            <v-card-text>
              <div>
                {{ anuncio.descripcion.descripcion }}
              </div>
              <div class="my-4 subtitle-1">
                <router-link
                  :to="{ name: 'DetalleAnuncio', params: { id: anuncio.id } }"
                  class="detalles"
                  >ver detalles</router-link
                >
              </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db, storage } from "../db";
export default {
  name: "Anuncios",

  data: () => ({
    anuncios: [],
    loading: true,
    search: "",
    marcas: [],
    sistemas: [],
    pantallas: [],
    contMarca: [],
    contSistema: [],
    contPantalla: [],
    check: false,
    desde: "0",
    hasta: "0",
    asc: false,
    dialog: false,
    images: [],
    priceErr: false
  }),
  methods: {
    getAll() {
      this.loading = true;
      db.collection("anuncios")
        .get()
        .then(querySnapshot => {
          this.anuncios = [];
          querySnapshot.docs.map(doc => {
            this.anuncios.push({
              id: doc.id,
              image: this.getImages(doc.id),
              ...doc.data()
            });
          });
          console.log(this.images);
          this.loading = false;
        });
    },
    async getImages(id) {
      this.images = [];
      const ref = storage.ref();
      const carpeta = id;
      await ref
        .child(`${carpeta}/`)
        .list({ maxResults: 1 })
        .then(res => {
          res.items.forEach(imgRef => {
            imgRef.getDownloadURL().then(url => {
              this.images.push({ id, url });
            });
          });
        });
    },
    filtrosCheck(valor) {
      this.loading = true;
      this.check = !this.check;
      if (this.check) {
        db.collection("anuncios")
          .get()
          .then(querySnapshot => {
            this.anuncios = [];
            querySnapshot.docs.map(doc => {
              if (doc.data().descripcion.marca === valor) {
                this.anuncios.push({ id: doc.id, ...doc.data() });
              } else if (doc.data().descripcion.sistema === valor) {
                this.anuncios.push({ id: doc.id, ...doc.data() });
              } else if (doc.data().descripcion.pantalla === valor) {
                this.anuncios.push({ id: doc.id, ...doc.data() });
              }
            });
            this.loading = false;
          });
      } else {
        this.getAll();
      }
    },
    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.anuncios[valor].titulo +
        this.anuncios[valor].precio +
        this.anuncios[valor].descripcion +
        this.anuncios[valor].descripcion.marca +
        this.anuncios[valor].descripcion.sistema +
        this.anuncios[valor].descripcion.pantalla
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
    },
    filtroPrecio(desde, hasta) {
      this.loading = true;
      desde = Number(desde);
      hasta = Number(hasta);
      if (hasta < desde) {
        this.getAll();
        this.priceErr = true;
      } else {
        this.priceErr = false;
        db.collection("anuncios")
          .where("precio", ">=", desde)
          .where("precio", "<=", hasta)
          .get()
          .then(querySnapshot => {
            this.anuncios = [];
            querySnapshot.docs.map(doc => {
              this.anuncios.push({ id: doc.id, ...doc.data() });
            });
            this.loading = false;
          });
      }
    },
    orderByPrecio() {
      this.loading = true;
      if (this.asc) {
        this.asc = false;
        db.collection("anuncios")
          .orderBy("precio", "desc")
          .get()
          .then(querySnapshot => {
            this.anuncios = [];
            querySnapshot.docs.map(doc => {
              this.anuncios.push({ id: doc.id, ...doc.data() });
            });
            this.loading = false;
          });
      } else {
        this.asc = true;
        db.collection("anuncios")
          .orderBy("precio", "asc")
          .get()
          .then(querySnapshot => {
            this.anuncios = [];
            querySnapshot.docs.map(doc => {
              this.anuncios.push({ id: doc.id, ...doc.data() });
            });
            this.loading = false;
          });
      }
    },
    countSistemas() {
      this.loading = true;
      db.collection("anuncios")
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
            this.sistemas.push(doc.data().descripcion.sistema);
          });
          let arr = [];
          for (let index = 0; index < this.sistemas.length; index++) {
            let sistema = this.sistemas[index];
            arr.push(this.sistemas.filter(marc => marc === sistema));
          }
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index][0] === arr[index + 1][0]) {
              arr.splice(index, 1, "");
            } else {
              this.contSistema.push({
                sistema: arr[index][0],
                cant: arr[index].length
              });
              if (index + 1 === arr.length - 1) {
                this.contSistema.push({
                  sistema: arr[index + 1][0],
                  cant: arr[index + 1].length
                });
              }
            }
          }
        });
      this.loading = false;
    },
    countMarcas() {
      this.loading = true;
      db.collection("anuncios")
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
            this.marcas.push(doc.data().descripcion.marca);
          });
          let arr = [];
          for (let index = 0; index < this.marcas.length; index++) {
            let marca = this.marcas[index];
            arr.push(this.marcas.filter(marc => marc === marca));
          }
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index][0] === arr[index + 1][0]) {
              arr.splice(index, 1, "");
            } else {
              this.contMarca.push({
                marca: arr[index][0],
                cant: arr[index].length
              });
              if (index + 1 === arr.length - 1) {
                this.contMarca.push({
                  marca: arr[index + 1][0],
                  cant: arr[index + 1].length
                });
              }
            }
          }
        });
      this.loading = false;
    },
    countPantallas() {
      this.loading = true;
      db.collection("anuncios")
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
            this.pantallas.push(doc.data().descripcion.pantalla);
          });
          let arr = [];
          for (let index = 0; index < this.pantallas.length; index++) {
            let pantalla = this.pantallas[index];
            arr.push(this.pantallas.filter(marc => marc === pantalla));
          }
          for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index][0] === arr[index + 1][0]) {
              arr.splice(index, 1, "");
            } else {
              this.contPantalla.push({
                pantalla: arr[index][0],
                cant: arr[index].length
              });
              if (index + 1 === arr.length - 1) {
                this.contPantalla.push({
                  pantalla: arr[index + 1][0],
                  cant: arr[index + 1].length
                });
              }
            }
          }
        });
      this.loading = false;
    }
  },
  created() {
    this.getAll();
    this.countMarcas();
    this.countSistemas();
    this.countPantallas();
  }
};
</script>
<style scoped>
.containerd {
  margin-top: 4em;
  margin-left: 3em;
  margin-right: 3em;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: transparent;
  color: #15042b;
  font-weight: 600;
  border: 1px solid #15042b;
  box-sizing: border-box;
  transition: 0.5s;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: #15042b;
  color: #fff;
}
.filtros {
  padding: 0.5em;
  margin-right: 0.5em;
  box-sizing: border-box;
  border-right: 5px solid;
  border-bottom: 5px solid;
  border-top: 3px solid;
  border-left: 1px solid;
  border-radius: 15px;
}
.utils {
  padding: 2em;
  border-radius: 15px;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff,
    inset -5px -5px 5px rgba(255, 255, 255, 0.5),
    inset 5px 5px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 1em;
}
.filtros__marcas {
  margin-bottom: 1em;
}
.filtros__marcas h3 {
  text-transform: uppercase;
  border: 1px solid;
  padding: 0.5em 0.25em;
  border-radius: 15px 0 15px 0;
  background: rgb(255, 0, 103);
  color: #fff;
}
.filtros__marcas ul {
  list-style: none;
  text-align: left;
  position: relative;
  padding-left: 0 !important;
}
.filtros__marcas li {
  position: relative;
  border-radius: 15px 0 15px 0;
  padding: 0.5em 0.25em;
  border: 1px solid;
  transition: 0.6s;
}
.filtros__marcas li:hover {
  filter: blur(0);
  background: rgb(56, 4, 126);
  color: #fff;
}
.filtros__marcas label {
  text-transform: capitalize;
  font-weight: 700;
}
.v-card__title {
  justify-content: center;
  background: rgb(56, 4, 126);
  color: #fff;
  border-radius: 25px;
}
.v-card__subtitle {
  font-size: 2em;
}
.v-card__title + .v-card__subtitle {
  margin-top: 16px;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: #000;
}
.card-p {
  margin-top: 10px;
  transition: 0.5s;
  cursor: pointer;
  margin-right: 1.5em;
}
.card-p:hover {
  transform: scale(1.1);
}
.detalles {
  margin-top: 12px;
  text-decoration: none;
  border: 1px solid #a61919;
  color: #a61919;
  border-radius: 5px;
  padding: 5px;
  text-transform: capitalize;
  transition: 0.5s;
}
.detalles:hover {
  background: #a61919;
  color: #fff;
}
</style>
