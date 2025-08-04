<!-- ChartDisplay.vue -->
<template>
  <div>
    <select :value="chartType" @change="handleChange">
      <option v-for="type in chartTypeList" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <div id="chart-icon" v-html="chartIcon" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getChartIcon } from '../assets/chartIcons';
import { chartTypeList } from '../data/chartTypeList';

const props = defineProps<{
  chartType: string;
  onTypeChange: (type: string) => void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  props.onTypeChange(target.value);
};

const chartIcon = computed(() => getChartIcon(props.chartType));
</script>