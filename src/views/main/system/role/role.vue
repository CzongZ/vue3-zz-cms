<template>
  <div class="role">
    <page-search-vue :searchFormConfig="searchFormConfig" />
    <page-content-vue
      pageName="role"
      :contentTableConfig="contentTableConfig"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearchVue from '@/components/page-search'
import PageContentVue from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageSearchVue,
    PageContentVue
  },
  name: 'role',
  setup() {
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped></style>
