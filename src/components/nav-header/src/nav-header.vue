<template>
  <div class="nav-header">
    <el-icon :size="25" @click="handleFoldClick">
      <!-- 动态切换图标组件 -->
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
    <div class="content">
      <zz-breadcrumb-vue :breadcrumbs="breadcrumbs" />
      <user-info-vue />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfoVue from './user-info.vue'
import zzBreadcrumbVue from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    userInfoVue,
    zzBreadcrumbVue
  },
  // 声明传送事件
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 使用emit传送
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据
    const breadcrumbs = computed(() => {
      const store = useStore()
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      const currentpath = route.path
      return pathMapBreadcrumbs(userMenus, currentpath)
    })

    return { isFold, breadcrumbs, handleFoldClick }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .el-icon {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
