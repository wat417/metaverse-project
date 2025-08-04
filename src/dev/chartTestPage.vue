<template>
  <ChartDisplay :chartType="chartType" :onTypeChange="onTypeChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChartDisplay from '@/components/ChartDisplay.vue'

const chartType = ref('bar')

const onTypeChange = (type: string) => {
  chartType.value = type
}
</script>