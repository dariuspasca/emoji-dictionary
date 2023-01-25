import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: () => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) return "/";
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: () => {
        const authStore = useAuthStore();
        if (!authStore.isLoggedIn) return "/";
      },
    },
  ],
});

export default router;
