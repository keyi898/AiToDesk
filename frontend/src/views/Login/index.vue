<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="logo-area">
        <img src="@/assets/images/logo.png" class="logo-icon" />
        <h1 class="brand">aitdesk</h1>
      </div>

      <!-- 登录表单 -->
      <div v-if="mode === \'login\'" class="form-area">
        <h2 class="form-title">{{ $t("登录") }}</h2>
        <n-input v-model:value="form.username" :placeholder="$t(\"用户名\")" class="mb-10" />
        <n-input v-model:value="form.password" type="password" :placeholder="$t(\"密码\")" class="mb-10" @keydown.enter="handleLogin" />
        <n-button type="primary" block :loading="loading" @click="handleLogin">{{ $t("登录") }}</n-button>
        <div class="switch-mode">
          {{ $t("没有账号？") }} <span class="link" @click="mode = \'register\'">{{ $t("立即注册") }}</span>
        </div>
      </div>

      <!-- 注册表单 -->
      <div v-else class="form-area">
        <h2 class="form-title">{{ $t("注册") }}</h2>
        <n-input v-model:value="form.username" :placeholder="$t(\"用户名（至少3位）\")" class="mb-10" />
        <n-input v-model:value="form.password" type="password" :placeholder="$t(\"密码（至少6位）\")" class="mb-10" />
        <n-input v-model:value="form.confirm" type="password" :placeholder="$t(\"确认密码\")" class="mb-10" @keydown.enter="handleRegister" />
        <n-button type="primary" block :loading="loading" @click="handleRegister">{{ $t("注册") }}</n-button>
        <div class="switch-mode">
          {{ $t("已有账号？") }} <span class="link" @click="mode = \'login\'">{{ $t("去登录") }}</span>
        </div>
      </div>

      <div v-if="errorMsg" class="error-tip">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { message } from "@/utils/naive-tools";
import { useRouter } from "vue-router";
import Home from "@/views/Home/index.vue";

const { t: $t } = useI18n();
const auth = useAuthStore();
const router = useRouter();

const mode = ref<"login" | "register">("login");
const loading = ref(false);
const errorMsg = ref("");
const form = reactive({ username: "", password: "", confirm: "" });

async function handleLogin() {
  errorMsg.value = "";
  if (!form.username || !form.password) {
    errorMsg.value = $t("请输入用户名和密码");
    return;
  }
  loading.value = true;
  try {
    await auth.login(form.username, form.password);
    message.success($t("登录成功"));
    // 登录成功后跳转到主页
    window.location.href = "/#/";
  } catch (e: any) {
    errorMsg.value = e.message || $t("登录失败");
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  errorMsg.value = "";
  if (!form.username || !form.password) {
    errorMsg.value = $t("请输入用户名和密码");
    return;
  }
  if (form.username.length < 3) {
    errorMsg.value = $t("用户名至少3位");
    return;
  }
  if (form.password.length < 6) {
    errorMsg.value = $t("密码至少6位");
    return;
  }
  if (form.password !== form.confirm) {
    errorMsg.value = $t("两次密码不一致");
    return;
  }
  loading.value = true;
  try {
    await auth.register(form.username, form.password);
    message.success($t("注册成功，已自动登录"));
    window.location.href = "/#/";
  } catch (e: any) {
    errorMsg.value = e.message || $t("注册失败");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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

  .mb-10 {
    margin-bottom: 10px;
  }

  .switch-mode {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;

    .link {
      color: #3B51A8;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
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
</style>
