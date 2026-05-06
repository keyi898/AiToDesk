<template>
  <div class="login-wrapper">
    <!-- Left panel: ads & announcements -->
    <div class="left-panel" v-if="!isMobile">
      <div class="left-content">
        <!-- Login Ad / Banner -->
        <div v-if="activeAd" class="ad-banner" @click="openAdLink">
          <div class="ad-badge">广告</div>
          <div class="ad-text">
            <p class="ad-title">{{ activeAd.title }}</p>
            <p class="ad-desc">{{ activeAd.desc }}</p>
          </div>
        </div>

        <!-- Announcements -->
        <div class="announcements" v-if="announcements.length > 0">
          <div class="ann-header">
            <span class="ann-icon">📢</span>
            <span>最新公告</span>
          </div>
          <div class="ann-list">
            <div class="ann-item" v-for="ann in announcements" :key="ann.date">
              <p class="ann-title">{{ ann.title }}</p>
              <p class="ann-content">{{ ann.content }}</p>
              <span class="ann-date">{{ ann.date }}</span>
            </div>
          </div>
        </div>

        <div v-else class="left-brand">
          <img src="@/assets/images/logo.png" class="left-logo" />
          <h2>aitdesk</h2>
          <p>简单好用的 AI 助手</p>
        </div>
      </div>
    </div>

    <!-- Right panel: login form -->
    <div class="right-panel">
      <div class="login-card">
        <div class="logo-area">
          <img src="@/assets/images/logo.png" class="logo-icon" />
          <h1 class="brand">aitdesk</h1>
        </div>

        <!-- Login form -->
        <div class="form-area">
          <h2 class="form-title">{{ mode === 'login' ? $t("登录") : $t("注册账号") }}</h2>
          <n-input v-model:value="form.email" type="text" :placeholder='$t("邮箱地址")' class="mb-10" @keydown.enter="handleSubmit" />
          <n-input v-if="mode === 'register'" v-model:value="form.password" type="password" :placeholder='$t("设置密码（至少6位）")' class="mb-10" @keydown.enter="handleSubmit" />
          <n-input v-if="mode === 'register'" v-model:value="form.confirm" type="password" :placeholder='$t("确认密码")' class="mb-10" @keydown.enter="handleSubmit" />
          <n-input v-if="mode === 'login'" v-model:value="form.password" type="password" :placeholder='$t("密码")' class="mb-10" @keydown.enter="handleSubmit" />
          <n-button type="primary" block :loading="loading" @click="handleSubmit">
            {{ mode === 'login' ? $t("登录") : $t("注册") }}
          </n-button>
          <div class="switch-mode">
            {{ mode === 'login' ? $t("还没有账号？") : $t("已有账号？") }}
            <span class="link" @click="mode = mode === 'login' ? 'register' : 'login'; resetForm()">
              {{ mode === 'login' ? $t("立即注册") : $t("去登录") }}
            </span>
          </div>
        </div>

        <div v-if="errorMsg" class="error-tip">{{ errorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { message } from "@/utils/naive-tools";

const { t: $t } = useI18n();
const auth = useAuthStore();
const router = useRouter();

const API_BASE = "http://154.40.49.200:3000";
const mode = ref<"login" | "register">("login");
const loading = ref(false);
const errorMsg = ref("");
const form = reactive({ email: "", password: "", confirm: "" });

// Ads & Announcements
const ads = ref<any[]>([]);
const announcements = ref<any[]>([]);
const isMobile = computed(() => window.innerWidth < 768);

onMounted(async () => {
  // Fetch ads
  try {
    const res = await fetch(`${API_BASE}/api/ads`);
    const data = await res.json();
    if (data.ads) ads.value = data.ads;
  } catch {}
  // Fetch announcements
  try {
    const res = await fetch(`${API_BASE}/api/announcements`);
    const data = await res.json();
    if (data.announcements) announcements.value = data.announcements;
  } catch {}
});

const activeAd = computed(() => {
  const ad = ads.value.find(a => a.slot === "banner" || a.slot === "login_ad");
  if (!ad || !ad.content) return null;
  try {
    const c = JSON.parse(ad.content);
    return { title: c.title, desc: c.desc, link: ad.link };
  } catch {
    return { title: "", desc: ad.content, link: ad.link };
  }
});

function openAdLink() {
  if (activeAd.value?.link) {
    window.open(activeAd.value.link, "_blank");
  }
}

function resetForm() {
  form.email = "";
  form.password = "";
  form.confirm = "";
  errorMsg.value = "";
}

async function handleSubmit() {
  errorMsg.value = "";
  if (!form.email || !form.email.includes("@")) {
    errorMsg.value = $t("请输入有效的邮箱地址");
    return;
  }
  if (!form.password || form.password.length < 6) {
    errorMsg.value = $t("密码至少6位");
    return;
  }
  if (mode.value === "register") {
    if (form.password !== form.confirm) {
      errorMsg.value = $t("两次密码不一致");
      return;
    }
    loading.value = true;
    try {
      await auth.register(form.email, form.password);
      message.success($t("注册成功"));
      router.push('/');
    } catch (e: any) {
      errorMsg.value = e.message || $t("注册失败");
    } finally {
      loading.value = false;
    }
  } else {
    loading.value = true;
    try {
      await auth.login(form.email, form.password);
      message.success($t("登录成功"));
      router.push('/');
    } catch (e: any) {
      errorMsg.value = e.message || $t("登录失败");
    } finally {
      loading.value = false;
    }
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  background: #f0f2f5;
  min-height: 100vh;
}

.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow-y: auto;

  .left-content {
    width: 100%;
    max-width: 420px;
  }

  .left-brand {
    text-align: center;
    color: white;

    .left-logo {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    p {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

.ad-banner {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .ad-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 10px;
  }

  .ad-text {
    .ad-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .ad-desc {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.announcements {
  .ann-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ann-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ann-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 14px 16px;

    .ann-title {
      color: white;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .ann-content {
      color: rgba(255, 255, 255, 0.6);
      font-size: 13px;
      line-height: 1.4;
      margin-bottom: 6px;
    }

    .ann-date {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
    }
  }
}

.right-panel {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  .logo-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 10px;
  }

  .brand {
    font-size: 28px;
    font-weight: bold;
    color: #1a1a2e;
    margin: 0;
  }
}

.form-area {
  .form-title {
    font-size: 20px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .sub-title {
    font-size: 13px;
    color: #888;
    text-align: center;
    margin-bottom: 16px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .switch-mode {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;
  }

  .link {
    color: #3B51A8;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
}

.error-tip {
  margin-top: 12px;
  padding: 8px 12px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  color: #ff4d4f;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 768px) {
  .left-panel { display: none; }
  .right-panel { width: 100%; padding: 20px; }
}
</style>
