<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon :size="15" class="ac-icon"><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account-vue ref="accountLoginRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon :size="15" class="ac-icon"><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone-vue />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import loginAccountVue from './login-account.vue'
import loginPhoneVue from './login-phone.vue'
import localCache from '@/utils/cache'
export default defineComponent({
  components: {
    loginAccountVue,
    loginPhoneVue
  },
  setup() {
    // 定义属性
    const currentTab = ref('account')
    const isKeepPassword = ref(false)
    const accountLoginRef = ref<InstanceType<typeof loginAccountVue>>()
    onMounted(() => {
      // 判断是否保存了密码
      if (localCache.getCache('password')) {
        isKeepPassword.value = true
      } else {
        isKeepPassword.value = false
      }
    })
    // 定义方法
    const handleLoginClick = () => {
      // 判断用户是哪种登录
      if (currentTab.value === 'account') {
        accountLoginRef.value?.accountLogin(isKeepPassword.value)
      } else {
        // TODO: 完善手机登录
      }
    }
    return { isKeepPassword, currentTab, accountLoginRef, handleLoginClick }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
.ac-icon {
  vertical-align: middle;
  margin-right: 5px;
}
</style>
