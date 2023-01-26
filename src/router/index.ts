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
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/new-dictionary",
      name: "create-dictionary",
      component: () => import("../views/CreateDictionaryView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/login" && authStore.isLoggedIn) {
    return next("/dashboard");
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next("/login");
  }
  return next();
});

export default router;
