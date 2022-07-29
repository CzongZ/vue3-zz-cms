<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="25"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const name = useStore().state.login.userInfo.name
    return { name }
  }
})
</script>

<style scoped lang="less">
.user-info {
  min-width: 200px;
  .el-dropdown-link {
    cursor: pointer;
    min-width: 95px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
