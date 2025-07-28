<template>
  <svg :width="width" :height="height">
    <g v-for="([key, value], index) in entries" :key="index">
      <rect
        :x="gap + index * (barWidth + gap)"
        :y="height - scale(value) - labelGap"
        :width="barWidth"
        :height="scale(value)"
        fill="#4b9fff"
      />
      <text
        :x="gap + index * (barWidth + gap) + barWidth / 2"
        :y="height - 5"
        text-anchor="middle"
        font-size="12"
        fill="#000"
      >
        {{ key }}
      </text>
      <text
        :x="gap + index * (barWidth + gap) + barWidth / 2"
        :y="height - scale(value) - labelGap - 5"
        text-anchor="middle"
        font-size="12"
        fill="#000"
      >
        {{ value }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  stats: {
    type: Object as PropType<Record<string, number>>,
    required: true
  }
})

const entries = computed(() => Object.entries(props.stats))
const width = 400
const height = 300
const barWidth = 40
const gap = 20
const labelGap = 20

function scale(value: number): number {
  const maxValue = Math.max(...entries.value.map(([_, v]) => v))
  return (value / maxValue) * (height - labelGap * 2)
}
</script>