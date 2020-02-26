import Vue from "vue";
import App from "./App.vue";
import Ionic from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import { IonicVueRouter } from "@ionic/vue";

Vue.use(IonicVueRouter);
Vue.config.productionTip = false;
Vue.use(Ionic);


const router = new IonicVueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "Home",
      component: () => import("./components/HomePage")
    },
    {
      path: "/map",
      name: "Map",
      component: () => import("./components/Map")
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

