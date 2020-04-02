import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Config from '../views/Config.vue'
import ServerSide from '../views/ServerSide.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/config',
    name: 'config',
    component: Config,
    children: [{
      path: '/config',
      name: 'config',
      component: ServerSide,
    }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
