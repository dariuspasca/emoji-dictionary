import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

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
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dictionary/:name",
      name: "dictionary",
      component: () => import("../views/DictionaryView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/new-dictionary",
      name: "create-dictionary",
      component: () => import("../views/CreateDictionaryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/edit-dictionary/:name",
      name: "edit-dictionary",
      component: () => import("../views/EditDictionaryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/") {
    return next("/dashboard");
  }

  if ((to.path === "/login" || to.path === "/") && authStore.isLoggedIn) {
    return next("/dashboard");
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next("/login");
  }
  return next();
});

export default router;
