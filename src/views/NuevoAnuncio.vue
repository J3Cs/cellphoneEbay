<template>
  <v-row style="margin-top: 1em; margin-left: 1em">
    <v-col class="col-11 col-md-5 border mb-2">
      <v-form ref="form1" v-model="valid" lazy-validation>
        <v-row>
          <v-text-field
            v-model="nuevo.descripcion.marca"
            :counter="10"
            :rules="txtRules"
            append-icon="mdi-briefcase"
            label="Marca"
            class="margin__r"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevo.descripcion.modelo"
            label="Modelo"
            :rules="txtRules"
            append-icon="mdi-cellphone"
            required
          ></v-text-field>
          <v-row class="ml-1">
            <v-text-field
              v-model="nuevo.descripcion.pantalla"
              label="Pantalla (en pulgadas)"
              :rules="numRules"
              append-icon="mdi-tablet-cellphone"
              class="margin__r"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.ram"
              :rules="numRules"
              class="margin__r"
              append-icon="mdi-chip"
              label="RAM"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.rom"
              :rules="numRules"
              class="margin__r"
              label="ROM"
              append-icon="mdi-memory"
              required
            ></v-text-field>

            <v-text-field
              v-model="nuevo.descripcion.sistema"
              label="Sistema (Android, iOS, etc)"
              :rules="txtRules"
              class="margin__r"
              append-icon="mdi-android"
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
              append-icon="mdi-checkbox-multiple-marked"
              :rules="txtRules"
            ></v-text-field>
          </v-row>
          <v-textarea
            v-model="nuevo.descripcion.descripcion"
            label="Descripcion"
            append-icon="mdi-text-box"
            :rules="desRules"
          ></v-textarea>
        </v-row>
      </v-form>
    </v-col>

    <v-col class="col-11 col-md-5 offset-md-1 border">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="nuevo.nombre"
          :counter="10"
          :rules="txtRules"
          label="Vendedor"
          append-icon="mdi-account"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.titulo"
          label="Titulo del anuncio"
          :rules="txtRules"
          append-icon="mdi-text-box-multiple"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.telefono"
          label="Numero de telefono"
          :rules="telRules"
          append-icon="mdi-cellphone"
          required
        ></v-text-field>

        <v-text-field
          v-model="nuevo.precio"
          label="Precio"
          :rules="numRules"
          append-icon="mdi-cash-usd"
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
      <v-btn
        color="light-green accent-4"
        @click="procesar"
        :loading="loading"
        :disabled="archivo == null"
        class="mr-3"
      >
        <v-icon>mdi-book-plus</v-icon>Crear
      </v-btn>
      <v-btn
        color="orange darken-4"
        @click="cancel"
        :disabled="archivo != null"
      >
        <v-icon>mdi-book-cancel</v-icon>Cancelar
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { db, storage } from "../db";
import Swal from "sweetalert2";
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
    cancel() {
      this.archivo = null;
      this.$router.push("/");
    },
    procesar() {
      this.loading = true;
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
            Swal.fire({
              toast: true,
              icon: "success",
              title: "Agregado con Exito",
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              this.upload(docRef.id);
            });
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
.margin__r {
  margin-right: 1em;
}
.border {
  border: 1px solid #fff;
  border-radius: 15px;
  padding: 1.5em;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 20px #fff,
    inset -5px -5px 5px rgba(255, 255, 255, 0.5),
    inset 5px 5px 5px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}
.border:hover {
  transform: scale(1.01);
}
</style>