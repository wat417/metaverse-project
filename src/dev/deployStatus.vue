<!-- deployStatus.vue -->
<template>
  <div>
    <h3>デプロイステータス</h3>
    <p v-if="status === 'pending'">デプロイ待機中...</p>
    <p v-else-if="status === 'success'">デプロイ完了 ✅</p>
    <p v-else>デプロイ失敗 ❌</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const status = ref<'pending' | 'success' | 'failed'>('pending')

onMounted(() => {
  // 仮実装：API連携未設定
  setTimeout(() => {
    status.value = 'success'
  }, 1000)
})
</script>