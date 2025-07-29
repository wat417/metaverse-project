<template>
  <div class="switcher">
    <button
      v-for="type in types"
      :key="type"
      class="icon-button"
      :class="{ active: currentType === type }"
      @click="updateType(type)"
      v-html="icons[type]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStatisticsStore } from '../stores/statisticsStore'
import { chartIcons } from '../assets/chartIcons'

const store = useStatisticsStore()
const types = ['bar', 'line', 'pie']
const icons = chartIcons
const currentType = ref(store.chartType)

function updateType(type: string) {
  store.setChartType(type)
}
</script>

<style scoped>
.switcher {
  display: flex;
  gap: 12px;
}
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.icon-button.active {
  border: 2px solid #4b9fff;
  border-radius: 4px;
}
</style>