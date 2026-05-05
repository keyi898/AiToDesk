import { defineStore } from "pinia";
import { ref, computed } from "vue";

const API_BASE = "http://154.40.49.200:3000";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>("");
  const username = ref<string>("");
  const email = ref<string>("");
  const isLoggedIn = computed(() => !!token.value);

  const saved = localStorage.getItem("aitdesk_auth");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      token.value = data.token || "";
      email.value = data.email || "";
    } catch {}
  }

  async function sendCode(userEmail: string) {
    const res = await fetch(`${API_BASE}/api/auth/send-code`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: userEmail }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "发送失败");
    return data;
  }

  async function register(userEmail: string, code: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: userEmail, code, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "注册失败");
    token.value = data.token;
    email.value = data.email;
    localStorage.setItem("aitdesk_auth", JSON.stringify({ token: data.token, email: data.email }));
    return data;
  }

  async function login(userEmail: string, password: string) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email: userEmail, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "登录失败");
    token.value = data.token;
    email.value = data.email;
    localStorage.setItem("aitdesk_auth", JSON.stringify({ token: data.token, email: data.email }));
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
    email.value = "";
    localStorage.removeItem("aitdesk_auth");
  }

  return { token, email, isLoggedIn, sendCode, register, login, verify, logout };
});
