<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zz-card-vue title="分类商品数量(饼图)">
          <pie-echart-vue :pieData="categoryGoodsCount"></pie-echart-vue>
        </zz-card-vue>
      </el-col>

      <el-col :span="10">
        <zz-card-vue title="不同城市商品销量"></zz-card-vue>
      </el-col>

      <el-col :span="7">
        <zz-card-vue title="分类商品数量(玫瑰图)">
          <rose-echart-vue :roseData="categoryGoodsCount"></rose-echart-vue>
        </zz-card-vue>
      </el-col>
    </el-row>
    <el-row class="content-row" :gutter="10">
      <el-col :span="12">
        <zz-card-vue title="分类商品的销量"></zz-card-vue>
      </el-col>
      <el-col :span="12">
        <zz-card-vue title="分类商品的收藏"></zz-card-vue>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import zzCardVue from '@/base-ui/card'
import { PieEchartVue, RoseEchartVue } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    zzCardVue,
    PieEchartVue,
    RoseEchartVue
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    return { categoryGoodsCount }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
