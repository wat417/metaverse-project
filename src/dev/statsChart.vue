<template>
  <div class="chart-wrapper">
    <h3 class="chart-title">{{ title }}</h3>
    <div class="chart-icon" v-html="chartIcon" />

    <svg v-if="chartType === 'bar'" :width="width" :height="height">
      <g v-for="([key, value], index) in entries" :key="index">
        <rect :x="gap + index * (barWidth + gap)" :y="height - scale(value) - labelGap" :width="barWidth" :height="scale(value)" fill="#4b9fff" />
      </g>
    </svg>

    <svg v-else-if="chartType === 'line'" :width="width" :height="height">
      <polyline :points="linePoints" fill="none" stroke="#ff9f4b" stroke-width="2" />
    </svg>

    <svg v-else-if="chartType === 'pie'" :width="width" :height="height">
      <circle cx="150" cy="150" r="100" fill="#ddd" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStatisticsStore } from '../stores/statisticsStore'
import { chartIcons } from '../assets/chartIcons'

const store = useStatisticsStore()
const chartType = store.chartType
const chartIcon = chartIcons[chartType]

const props = defineProps({
  stats: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: '統計結果チャート'
  }
})

const entries = computed(() => Object.entries(props.stats))
const width = 400
const height = 300
const barWidth = 40
const gap = 20
const labelGap = 20
const pointGap = 80

function scale(value: number): number {
  const maxValue = Math.max(...entries.value.map(([_, v]) => v))
  return (value / maxValue) * (height - labelGap * 2)
}

const linePoints = computed(() =>
  entries.value.map(
    ([_, value], index) =>
      `${gap + index * pointGap},${height - scale(value) - labelGap}`
  ).join(' ')
)
</script>

<style scoped>
.chart-wrapper {
  margin-bottom: 24px;
}
.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}
.chart-icon {
  margin-bottom: 8px;
}
</style>