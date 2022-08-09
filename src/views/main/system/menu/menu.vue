<template>
  <div class="menu">
    <page-content-vue
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContentVue from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: { PageContentVue },
  name: 'zz-menu',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
