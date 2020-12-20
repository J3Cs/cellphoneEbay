<template>
  <v-row style="margin-top: 6em; margin-left: 2em">
    <v-col cols="5">
      <v-form ref="form1" v-model="valid" lazy-validation>
        <v-row>
          <v-text-field
            v-model="nuevo.descripcion.marca"
            :counter="10"
            :rules="txtRules"
            label="Marca"
            class="col-12"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevo.descripcion.modelo"
            label="Modelo"
            :rules="txtRules"
            class="col-12"
            required
          ></v-text-field>
          <v-row>
            <v-text-field
              v-model="nuevo.descripcion.pantalla"
              label="Pantalla (en pulgadas)"
              :rules="numRules"
              class="margin__r"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.ram"
              :rules="numRules"
              class="margin__r"
              label="RAM"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.rom"
              :rules="numRules"
              class="margin__r"
              label="ROM"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.sistema"
              label="Sistema (Android, iOS, etc)"
              :rules="txtRules"
              class="margin__r"
              required
            ></v-text-field>
            <v-text-field
              v-model="nuevo.descripcion.versionSistema"
              label="Version del Sistema"
              class="margin__r"
              :rules="numRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.estado"
              class="margin__r"
              label="Estado del telefono (nuevo o usado)"
              :rules="txtRules"
            ></v-text-field>
          </v-row>
          <v-textarea
            v-model="nuevo.descripcion.descripcion"
            label="Descripcion"
            :rules="desRules"
          ></v-textarea>
        </v-row>
      </v-form>
    </v-col>

    <v-col cols="5" style="margin-left: 5em">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nuevo.nombre"
          :counter="10"
          :rules="txtRules"
          label="Vendedor"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.titulo"
          label="Titulo del anuncio"
          :rules="txtRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.telefono"
          label="Numero de telefono"
          :rules="telRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.precio"
          label="Precio"
          :rules="numRules"
          required
        ></v-text-field>
      </v-form>
      <div>
        <v-file-input
          label="Agregar Fotos"
          multiple
          v-model="archivo"
          prepend-icon="mdi-camera"
        ></v-file-input>
      </div>
      <v-btn @click="procesar" :loading="loading" :disabled="archivo == null">
        Crear
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { db, storage } from "../db";
export default {
  data() {
    return {
      valid: true,
      loading: false,
      nuevo: {
        descripcion: {},
      },
      archivo: null,
      imagenes: [],
      txtRules: [
        (v) => !!v || "Este campo es requerido",
        (v) => (v && v.length <= 20) || "Debe tener menos de 20 caracteres",
      ],
      desRules: [
        (v) => !!v || "Este campo es requerido",
        (v) => (v && v.length >= 20) || "Debe tener menos de 20 caracteres",
      ],
      telRules: [
        (v) => !!v || "El numero de telefono es requerido",
        (v) =>
          /^[6-7]{1}[0-9]{7}/.test(v) ||
          "El numero de telefono debe ser valido",
        (v) => (v && v.length <= 8) || "Debe tener 8 numeros",
      ],
      numRules: [
        (v) => !!v || "Este campo es requerido",
        (v) => /[0-9]/.test(v) || "El campo es numerico",
      ],
    };
  },

  methods: {
    procesar() {
      if (this.$refs.form1.validate() && this.$refs.form.validate()) {
        db.collection("anuncios")
          .add({
            titulo: this.nuevo.titulo,
            telefono: this.nuevo.telefono,
            precio: Number(this.nuevo.precio),
            nombre: this.nuevo.nombre,
            descripcion: this.nuevo.descripcion,
          })
          .then((docRef) => {
            console.log(docRef.id);
            this.upload(docRef.id);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$refs.form1.validate();
        this.$refs.form.validate();
      }
    },
    upload(id) {
      if (this.archivo) {
        this.loading = true;
        for (let index = 0; index < this.archivo.length; index++) {
          console.log(this.archivo[index].name);
          const ref = storage.ref();
          const carpeta = id;
          const archivoRef = ref.child(
            `${carpeta}/${this.archivo[index].name}`
          );
          let this2 = this;
          archivoRef.put(this.archivo[index]).then(() => {
            this2.archivo[index] = null;
            this.loading = false;
            this2.$router.push("/");
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.margin__r{
  margin-right: 1em;
}
</style>