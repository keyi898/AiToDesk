<template>
  <n-modal v-model:show="showAnn" preset="card" :title="currentAnn?.title || \'公告\'" style="width: 480px;">
    <div class="ann-content">{{ currentAnn?.content }}</div>
    <template #footer>
      <div class="ann-footer">
        <span class="ann-date">{{ currentAnn?.date }}</span>
        <n-button size="small" @click="closeAnn">{{ $t("我知道了") }}</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NModal, NButton } from "naive-ui";

const API_BASE = "http://154.40.49.200:3000";
const showAnn = ref(false);
const announcements = ref<any[]>([]);
const currentAnn = ref<any>(null);
const storageKey = "ann_closed_v2";

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/api/announcements`);
    const data = await res.json();
    if (data.announcements && data.announcements.length > 0) {
      announcements.value = data.announcements;
      // Check if latest ann was already closed
      const closed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const latest = data.announcements[0];
      if (!closed.includes(latest.title + "|" + latest.date)) {
        currentAnn.value = latest;
        showAnn.value = true;
      }
    }
  } catch {}
});

function closeAnn() {
  showAnn.value = false;
  // Mark as closed
  if (currentAnn.value) {
    const key = currentAnn.value.title + "|" + currentAnn.value.date;
    const closed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    closed.push(key);
    localStorage.setItem(storageKey, JSON.stringify(closed));
  }
}
</script>

<style scoped lang="scss">
.ann-content {
  font-size: 15px;
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
}
.ann-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ann-date {
  font-size: 13px;
  color: #888;
}
</style>
