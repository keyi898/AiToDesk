<template>
    <div class="answer" style="margin-bottom: 20px;">
        <div class="w-30 h-30 text-26px">
            <n-image :src="appIcon" width="30" height="30" preview-disabled />
        </div>
        <div class="answer-token">
            <p>{{ $t("欢迎使用 aitodesk，这是一款简单好用的 AI 助手，支持知识库、模型 API、联网搜索、智能体。") }}</p>
        </div>
    </div>
    <div class="answer" style="margin-bottom: 20px;">
        <div class="w-30 h-30 text-26px">
            <n-image :src="appIcon" width="30" height="30" preview-disabled />
        </div>
        <div class="answer-token">
            <p>{{ $t("您可以在设置中关闭新手指引。") }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import appIcon from "@/assets/images/logo.png"
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n()
</script>

<style scoped lang="scss">
.answer {
    width: 100%;
    display: grid;
    grid-template-columns: 30px 1fr;
    column-gap: 10px;
    justify-content: start;

    .answer-token {
        box-sizing: border-box;
        border-radius: 5px;
        padding: 4px var(--bt-pd-normal) 20px 0;
    }
}
</style>
