import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home/index.vue"
import Login from "@/views/Login/index.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

// Navigation guard - check auth before each route
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const saved = localStorage.getItem("aitdesk_auth");
    if (!saved) {
      return { name: 'login' };
    }
    try {
      const data = JSON.parse(saved);
      const res = await fetch("http://154.40.49.200:3000/api/auth/verify", {
        headers: { "Authorization": `Bearer ${data.token}` },
      });
      if (!res.ok) {
        return { name: 'login' };
      }
    } catch {
      return { name: 'login' };
    }
  }
  return true;
});

export default router
