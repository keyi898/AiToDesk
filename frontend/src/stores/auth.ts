import { defineStore } from "pinia";
import { ref, computed } from "vue";

const API_BASE = "http://154.40.49.200:3000";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>("");
  const username = ref<string>("");
  const isLoggedIn = computed(() => !!token.value);

  // Load from localStorage on init
  const saved = localStorage.getItem("aitdesk_auth");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      token.value = data.token || "";
      username.value = data.username || "";
    } catch {}
  }

  async function register(user: string, pass: string) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "注册失败");
    token.value = data.token;
    username.value = data.username;
    localStorage.setItem("aitdesk_auth", JSON.stringify({ token: data.token, username: data.username }));
    return data;
  }

  async function login(user: string, pass: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "登录失败");
    token.value = data.token;
    username.value = data.username;
    localStorage.setItem("aitdesk_auth", JSON.stringify({ token: data.token, username: data.username }));
    return data;
  }

  async function verify() {
    if (!token.value) return false;
    const res = await fetch(`${API_BASE}/api/auth/verify`, {
      headers: { "Authorization": `Bearer ${token.value}` },
    });
    const data = await res.json();
    if (!res.ok || !data.valid) {
      logout();
      return false;
    }
    return true;
  }

  function logout() {
    token.value = "";
    username.value = "";
    localStorage.removeItem("aitdesk_auth");
  }

  return { token, username, isLoggedIn, register, login, verify, logout };
});
