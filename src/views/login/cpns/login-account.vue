<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRep">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // 获取表单实例
    const formRep = ref<InstanceType<typeof ElForm>>()
    const accountLogin = (isKeepPassword: boolean) => {
      // 获取表单规则是否匹配成功
      formRep.value?.validate((vali) => {
        if (vali) {
          // 1.判断是否保存密码
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return { account, rules, formRep, accountLogin }
  }
})
</script>

<style scoped lang="less"></style>
