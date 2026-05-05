<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="logo-area">
        <img src="@/assets/images/logo.png" class="logo-icon" />
        <h1 class="brand">aitdesk</h1>
      </div>

      <!-- Step 1: Enter email -->
      <div v-if="step === 1" class="form-area">
        <h2 class="form-title">{{ mode === \'login\' ? $t("登录") : $t("注册账号") }}</h2>
        <n-input v-model:value="form.email" type="text" :placeholder="$t("邮箱地址")" class="mb-10" />
        <n-button v-if="mode === \'register\'" type="default" block :loading="sending" @click="handleSendCode">
          {{ sending ? $t("发送中...") : $t("发送验证码") }}
        </n-button>
        <div v-if="mode === \'login\'" class="switch-mode">
          {{ $t("还没有账号？") }} <span class="link" @click="mode = \'register\'; step = 1">{{ $t("立即注册") }}</span>
        </div>
      </div>

      <!-- Step 2: Enter code + password (register) -->
      <div v-else-if="step === 2 && mode === \'register\'" class="form-area">
        <h2 class="form-title">{{ $t("输入验证码") }}</h2>
        <p class="sub-title">{{ $t("验证码已发送至") }} {{ form.email }}</p>
        <n-input v-model:value="form.code" :placeholder="$t("6位验证码")" class="mb-10" maxlength="6" />
        <n-input v-model:value="form.password" type="password" :placeholder="$t("设置密码（至少6位）")" class="mb-10" />
        <n-input v-model:value="form.confirm" type="password" :placeholder="$t("确认密码")" class="mb-10" @keydown.enter="handleRegister" />
        <n-button type="primary" block :loading="loading" @click="handleRegister">{{ $t("注册") }}</n-button>
        <div class="switch-mode">
          <span class="link" @click="step = 1; form.code = \'\'; form.password = \'\'; form.confirm = \'\'">{{ $t("重新输入邮箱") }}</span>
        </div>
      </div>

      <!-- Step 2: Enter password (login) -->
      <div v-else-if="step === 2 && mode === \'login\'" class="form-area">
        <h2 class="form-title">{{ $t("输入密码") }}</h2>
        <p class="sub-title">{{ form.email }}</p>
        <n-input v-model:value="form.password" type="password" :placeholder="$t("密码")" class="mb-10" @keydown.enter="handleLogin" />
        <n-button type="primary" block :loading="loading" @click="handleLogin">{{ $t("登录") }}</n-button>
        <div class="switch-mode">
          <span class="link" @click="step = 1; form.password = \'\'">{{ $t("重新输入邮箱") }}</span>
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

const { t: $t } = useI18n();
const auth = useAuthStore();

const mode = ref<"login" | "register">("login");
const step = ref<1 | 2>(1);
const sending = ref(false);
const loading = ref(false);
const errorMsg = ref("");
const form = reactive({ email: "", code: "", password: "", confirm: "" });

async function handleSendCode() {
  errorMsg.value = "";
  if (!form.email || !form.email.includes("@")) {
    errorMsg.value = $t("请输入有效的邮箱地址");
    return;
  }
  sending.value = true;
  try {
    await auth.sendCode(form.email);
    message.success($t("验证码已发送"));
    step.value = 2;
  } catch (e: any) {
    errorMsg.value = e.message || $t("发送失败");
  } finally {
    sending.value = false;
  }
}

async function handleRegister() {
  errorMsg.value = "";
  if (!form.code || form.code.length !== 6) {
    errorMsg.value = $t("请输入6位验证码");
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
    await auth.register(form.email, form.code, form.password);
    message.success($t("注册成功"));
    window.location.href = "/#/";
  } catch (e: any) {
    errorMsg.value = e.message || $t("注册失败");
  } finally {
    loading.value = false;
  }
}

async function handleLogin() {
  errorMsg.value = "";
  if (!form.password) {
    errorMsg.value = $t("请输入密码");
    return;
  }
  loading.value = true;
  try {
    await auth.login(form.email, form.password);
    message.success($t("登录成功"));
    window.location.href = "/#/";
  } catch (e: any) {
    errorMsg.value = e.message || $t("登录失败");
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
  .logo-icon { width: 64px; height: 64px; margin-bottom: 10px; }
  .brand { font-size: 28px; font-weight: bold; color: #1a1a2e; margin: 0; }
}
.form-area {
  .form-title { font-size: 20px; color: #333; text-align: center; margin-bottom: 20px; }
  .sub-title { font-size: 13px; color: #888; text-align: center; margin-bottom: 16px; }
  .mb-10 { margin-bottom: 10px; }
  .switch-mode { text-align: center; margin-top: 16px; color: #666; font-size: 14px; }
  .link { color: #3B51A8; cursor: pointer; &:hover { text-decoration: underline; } }
}
.error-tip {
  margin-top: 12px; padding: 8px 12px; background: #fff2f0;
  border: 1px solid #ffccc7; border-radius: 6px;
  color: #ff4d4f; font-size: 13px; text-align: center;
}
</style>
