<template>
  <v-row class="ml-md-2">
    <div class="col-md-4 col-12">
      <chart :chart-data="datacollection"></chart>
      <v-btn color="green" class="white--text" @click="fillData()">Randomize</v-btn>
    </div>
    <div class="col-md-4 col-12">
      <chart :chart-data="datacollection"></chart>
      <v-btn color="green" class="white--text" @click="fillData()">Randomize</v-btn>
    </div>
    <div class="col-md-4 col-12">
      <chart :chart-data="datacollection"></chart>
      <v-btn color="green" class="white--text" @click="fillData()">Randomize</v-btn>
    </div>
  </v-row>
</template>

<script>
import Chart from "../assets/js/Chart";

export default {
  components: {
    Chart,
  },
  data() {
    return {
      datacollection: {},
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Ventas",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Anuncios",
            backgroundColor: "#cccccc",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>