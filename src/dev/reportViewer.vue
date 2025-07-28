<!-- reportViewer.vue -->
<template>
  <div>
    <h2>レポートビューア</h2>
    <select v-model="format">
      <option value="markdown">Markdown</option>
      <option value="json">JSON</option>
      <option value="statistics">統計</option>
      <option value="history">履歴</option>
    </select>

    <input v-model="filterText" placeholder="フィルター対象（カンマ区切り）" />
    <button @click="loadReport">再生成</button>

    <div v-if="format === 'statistics'">
      <stats-chart :stats="stats" />
    </div>
    <pre v-else>{{ report }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateReport } from '../chat/reportBuilder'
import StatsChart from './statsChart.vue'
import type { ChatEvent, MessageType } from '../types/message'

const format = ref<'markdown' | 'json' | 'statistics' | 'history'>('markdown')
const filterText = ref('')
const report = ref('生成待ち…')
const stats = ref<Record<string, number>>({})

const mockEvents: ChatEvent[] = [
  { timestamp: '2025-07-28T08:30:00', text: 'ログイン成功', type: 'status.userJoined' },
  { timestamp: '2025-07-28T08:31:10', text: 'チャット送信', type: 'chat.messageSent' },
  { timestamp: '2025-07-28T08:32:15', text: '接続復旧', type: 'connection.reconnected', system: true }
]

async function loadReport() {
  const types = filterText.value.split(',').map(t => t.trim()) as MessageType[]
  const result = await generateReport(mockEvents, format.value, types)
  if (format.value === 'statistics') {
    stats.value = JSON.parse(result)
    report.value = '統計チャート表示中…'
  } else {
    report.value = result
  }
}

loadReport()
</script>