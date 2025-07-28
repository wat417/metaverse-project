<!-- reportTester.vue -->
<template>
  <div>
    <h2>分類レポート</h2>
    <label>表示形式：</label>
    <select v-model="format">
      <option value="markdown">Markdown</option>
      <option value="json">JSON</option>
      <option value="statistics">統計</option>
      <option value="history">履歴</option>
    </select>

    <button @click="updateReport">再生成</button>
    <pre>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateReport } from '../chat/reportBuilder'
import type { ChatEvent } from '../types/message'

const format = ref<'markdown' | 'json' | 'statistics' | 'history'>('markdown')
const report = ref('生成待ち…')

const mockEvents: ChatEvent[] = [
  { timestamp: '2025-07-26T01:00:00', text: 'ユーザーがログインしました。', type: 'status.userJoined' },
  { timestamp: '2025-07-26T01:02:00', text: 'メッセージ送信', type: 'chat.messageSent' },
  { timestamp: '2025-07-26T01:03:00', text: '[system] 接続確認', type: 'connection.reconnected', system: true }
]

async function updateReport() {
  report.value = await generateReport(mockEvents, format.value)
}

updateReport()
</script>