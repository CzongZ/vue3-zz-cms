<template>
  <div class="app">
    <el-config-provider :locale="locale"></el-config-provider>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return { locale: zhCn }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
