<template>
    <!-- 账号状态 -->
    <div class="account-status" v-if="isLoggedIn">
        <div class="flex items-center justify-start">
            <i class="i-ph:user-circle w-16 h-16 ml-8 mr-10 text-[var(--bt-tit-color-secondary)]"></i>
            <span class="account-email">{{ email }}</span>
        </div>
        <n-button text size="small" @click="handleLogout" class="logout-btn">{{ $t("退出") }}</n-button>
    </div>
    <ul class="recent-list">
        <li @click="openAgent">
            <div class="flex items-center justify-start">
                <i class="i-ph:star-four w-16 h-16 ml-8 mr-10 text-[var(--bt-tit-color-secondary)]"></i>
                <span>{{ $t("智能体") }}</span>
            </div>
        </li>
        <li @click="openThirdPartyModel">
            <div class="flex items-center justify-start">
                <i class="i-hugeicons:api w-16 h-16 ml-8 mr-10 text-[var(--bt-tit-color-secondary)]"></i>
                <span>{{ $t("第三方模型API") }}</span>
            </div>
        </li>
        <li @click="openModelManage">
            <div class="flex items-center justify-start">
                <i class="i-tdesign:desktop-1 w-16 h-16 ml-8 mr-10 text-[var(--bt-tit-color-secondary)]"></i>
                <span>{{ $t("本地模型") }}</span>
            </div>
        </li>
        <li @click="openSoftSettings">
            <div class="flex items-center justify-start">
                <i class="i-tdesign:setting-1 w-16 h-16 ml-8 mr-10 text-[var(--bt-tit-color-secondary)]"></i>
                <span>{{ $t("设置") }}</span>
            </div>
        </li>

    </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { openAgent } from "@/views/Agent/controller/index"
import { openModelManage } from "@/views/Settings/controller/index"
import { openSoftSettings } from "@/views/SoftSettings/controller"
import { openThirdPartyModel } from "../controller"
import { useAuthStore } from "@/stores/auth"
import { message } from "@/utils/naive-tools"
import { useI18n } from "vue-i18n";
const { t: $t } = useI18n()
const auth = useAuthStore()
const { isLoggedIn, email } = storeToRefs(auth)
function handleLogout() {
    auth.logout()
    message.success($t("已退出登录"))
}</script>

<style scoped lang="scss">
@use "@/assets/base";

.account-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 8px;
    border-radius: 8px;
    background: rgba(0,0,0,0.05);
    margin-bottom: 8px;

    .account-email {
        font-size: 12px;
        color: var(--bt-tit-color-secondary);
        max-width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .logout-btn {
        font-size: 12px;
        color: #ff4d4f;
    }
}

.recent-list {
    @include base.recent-list-style;
}
</style>