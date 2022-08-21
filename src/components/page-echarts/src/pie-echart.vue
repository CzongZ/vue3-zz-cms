<template>
  <div class="pie-echart">
    <base-echart-vue :options="options"></base-echart-vue>
  </div>
</template>

<script setup lang="ts">
import BaseEchartVue from '@/base-ui/echart'
import { computed, defineProps } from 'vue'
import { IEchartDataType } from '../types'
import { EChartsOption } from 'echarts'
const props = defineProps<{
  pieData: IEchartDataType
}>()
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  } as EChartsOption
})
</script>

<style scoped></style>
