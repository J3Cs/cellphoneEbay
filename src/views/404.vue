<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1>Ooops!</h1>
          <h1><span style="color: red">404</span></h1>
          <h1>El contenido que buscas no esta disponible</h1>
          <img src="../assets/images/404.png" alt="" />
          <router-link :to="{ name: 'Home' }"
            ><h4 class="col-3 offset-4 col-md-2 offset-md-5">
              Ir a la pagina principal
            </h4></router-link
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.container--fluid {
  height: 93vh;
  margin: 0;
  padding: 0;
  background: url("../assets/images/404bg.png") rgba(0, 0, 0, 0.7);
  border: none;
  background-size: cover;
}
span {
  font-size: 2em;
}
h1 {
  color: #fff;
  text-shadow: 0 0 15px #fff;
}
img {
  width: 15em;
  height: 20em;
  animation: animate 3.5s linear infinite;
}
@keyframes animate {
  0% {
    transform: translateX(10px) translateY(10px);
  }
  50% {
    transform: translateX(-20px) translateY(-10px);
  }
  100% {
    transform: translateX(10px) translateY(10px);
  }
}
a {
  text-decoration: none;
}
a h4 {
  color: #fff;
  background: rgb(221, 39, 7);
  border: 2px solid rgb(221, 39, 7);
  border-radius: 15px;
  padding: 0.5em;
  transition: 0.5s;
}
a h4:hover {
  transform: scale(1.1);
}
</style>