<template>
  <div class="rose-echart">
    <base-echart-vue :options="options"></base-echart-vue>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import BaseEchartVue from '@/base-ui/echart'
import { IEchartDataType } from '../types'
import { EChartsOption } from 'echarts'
const props = defineProps<{
  roseData: IEchartDataType
}>()
const options = computed(() => {
  return {
    // legend: {
    //   top: 'bottom'
    // },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        labelLine: { length: 5, length2: 5 },
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  } as EChartsOption
})
</script>

<style scoped></style>
