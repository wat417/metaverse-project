import { defineStore } from 'pinia'
import { chartIcons } from '../assets/chartIcons'

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    chartType: 'bar',
    chartIcon: chartIcons['bar']
  }),
  actions: {
    setChartType(type: string) {
      this.chartType = type
      this.chartIcon = chartIcons[type]
    }
  }
})