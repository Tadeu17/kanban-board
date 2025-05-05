import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/tasks",
  },
  {
    path: "/tasks",
    name: "tasks",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/TheTasks.vue");
    },
  },
  {
    path: "/notifications",
    name: "notifications",
    component: function () {
      return import(
        /* webpackChunkName: "about" */ "../views/TheNotifications.vue"
      );
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/TheSettings.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
