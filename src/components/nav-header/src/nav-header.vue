<template>
  <div class="nav-header">
    <el-icon :size="25" @click="handleFoldClick">
      <!-- 动态切换图标组件 -->
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  // 声明传送事件
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 使用emit传送
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .el-icon {
    cursor: pointer;
  }
}
</style>
