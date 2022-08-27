<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zz-card-vue title="分类商品数量(饼图)">
          <pie-echart-vue :pieData="categoryGoodsCount"></pie-echart-vue>
        </zz-card-vue>
      </el-col>

      <el-col :span="10">
        <zz-card-vue title="不同城市商品销量">
          <map-echart-vue :mapData="addressGoodsSale"></map-echart-vue>
        </zz-card-vue>
      </el-col>

      <el-col :span="7">
        <zz-card-vue title="分类商品数量(玫瑰图)">
          <rose-echart-vue :roseData="categoryGoodsCount"></rose-echart-vue>
        </zz-card-vue>
      </el-col>
    </el-row>
    <el-row class="content-row" :gutter="10">
      <el-col :span="12">
        <zz-card-vue title="分类商品的销量">
          <line-echart-vue v-bind="categoryGoodsSale"></line-echart-vue>
        </zz-card-vue>
      </el-col>
      <el-col :span="12">
        <zz-card-vue title="分类商品的收藏">
          <bar-echart-vue v-bind="categoryGoodsFavor"></bar-echart-vue>
        </zz-card-vue>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import zzCardVue from '@/base-ui/card'
import {
  PieEchartVue,
  RoseEchartVue,
  LineEchartVue,
  BarEchartVue,
  MapEchartVue
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    zzCardVue,
    PieEchartVue,
    RoseEchartVue,
    LineEchartVue,
    BarEchartVue,
    MapEchartVue
  },
  setup() {
    // 请求数据
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      console.log(xLabels, values)
      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
