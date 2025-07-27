<!-- reportViewer.vue -->
<template>
  <div>
    <h2>レポートビューア</h2>
    <label>表示形式：</label>
    <select v-model="format">
      <option value="markdown">Markdown</option>
      <option value="json">JSON</option>
    </select>

    <label>フィルター対象：</label>
    <input v-model="filterText" placeholder="カンマ区切りで入力（例：chat.messageSent,status.userJoined）" />

    <pre>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateReport } from '../chat/reportBuilder'
import type { ChatEvent, MessageType } from '../types/message'

const format = ref<'markdown' | 'json'>('markdown')
const filterText = ref('')

const mockEvents: ChatEvent[] = [
  { timestamp: '2025-07-26T10:00:00', text: 'ユーザーがログインしました', type: 'status.userJoined' },
  { timestamp: '2025-07-26T10:01:00', text: 'メッセージ送信', type: 'chat.messageSent' },
  { timestamp: '2025-07-26T10:02:00', text: '[system] 接続確認', type: 'connection.reconnected', system: true }
]

const report = computed(() => {
  const types = filterText.value
    .split(',')
    .map(t => t.trim())
    .filter(t => !!t) as MessageType[]
  return generateReport(mockEvents, format.value, types)
})
</script>