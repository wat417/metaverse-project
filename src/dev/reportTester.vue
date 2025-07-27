<!-- reportTester.vue -->
<template>
  <div>
    <h2>分類レポート</h2>
    <select v-model="format">
      <option value="markdown">Markdown</option>
      <option value="json">JSON</option>
    </select>
    <pre>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateReport } from '../chat/reportBuilder'
import type { ChatEvent } from '../types/message'

const format = ref<'markdown' | 'json'>('markdown')

const mockEvents: ChatEvent[] = [
  { timestamp: '2025-07-26T01:00:00', text: 'ユーザーがログインしました。', type: 'status.userJoined' },
  { timestamp: '2025-07-26T01:02:00', text: 'メッセージ送信', type: 'chat.messageSent' },
  { timestamp: '2025-07-26T01:03:00', text: '[system] 接続確認', type: 'connection.reconnected', system: true }
]

const report = computed(() => {
  return generateReport(mockEvents, format.value)
})
</script>