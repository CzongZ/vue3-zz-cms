<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">Vue3+TS+ELp</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      active-text-color="#0a60bd"
      :router="true"
    >
      <!-- 遍历父菜单 -->
      <template v-for="(item, index) in userMenus" :key="item.id">
        <!-- 判断是否有子菜单 -->
        <template v-if="item.type === 1">
          <!-- 显示父菜单 -->
          <el-sub-menu :index="item.url">
            <template #title>
              <!-- 图标组件 -->
              <el-icon v-if="item.icon">
                <component :is="oneIcon[index]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 如果有子菜单 遍历子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 显示子菜单 -->
              <el-menu-item :index="subitem.url">
                <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 无子菜单，显示其菜单 -->
        <template v-else-if="item.if === 2">
          <el-menu-item :index="item.url">
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <!-- 图标组件 -->
            <component class="icons" :is="oneIcon[index]" />
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
// import { useRouter } from 'vue-router'

export default defineComponent({
  // 接收传值
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    // 使用监听修改route
    // const router = useRouter()
    // const handleMenuItemClick = (item: any) => {
    //   router.push({
    //     path: item.url ?? '/not-found'
    //   })
    // }
    // 获取icon组件名字
    const oneIcon = computed<Array<any>>(() => {
      let newIconArr = userMenus.value.map((item: any) => {
        let newIcon = item.icon.substring(8, item.icon.length)
        return newIcon
      })
      return newIconArr
    })
    return { userMenus, oneIcon }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
  }

  ::v-deep .el-sub-menu__title {
    color: #b7bdc3;
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.el-menu-item {
  padding-left: 25% !important;
  color: #b7bdc3;
  background-color: #0c2135 !important;
}
.el-menu-item:hover {
  color: #fff;
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>
