<template>
  <div class="goods">
    <page-content-vue :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope"
        ><el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          fit="contain"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported="true"
        ></el-image
      ></template>

      <template #oldPrice="scope">
        <s style="color: #909399">¥{{ scope.row.newPrice }}</s>
      </template>

      <template #newPrice="scope">
        <span style="color: #f56c6c">¥{{ scope.row.oldPrice }}</span>
      </template>

      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '在售' : '售罄' }}</el-button
        >
      </template>
    </page-content-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContentVue from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: { PageContentVue },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
