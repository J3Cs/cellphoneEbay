import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },{
    path: '/detalle:id',
    name: 'DetalleAnuncio',
    component: () => import('../views/Detalles.vue')
  },
  {
    path: '/nuevo',
    name: 'NuevoAnuncio',
    component: () => import('../views/NuevoAnuncio.vue')
  },
  {
    path: '/stats',
    name: 'Estadisticas',
    component: () => import('../views/Estadisticas.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
];

const router = new VueRouter({
  routes
});

export default router;
