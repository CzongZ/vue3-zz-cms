import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认的所有routes
  const allRoutes: RouteRecordRaw[] = []
  // 使用函数批量加载文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 取出各个文件名
  routeFiles.keys().forEach((key) => {
    // 加载具体文件（文件名的切割和拼接）
    const route = require('../router/main' + key.split('.')[1])
    // 在路由列表中添加路由实例
    allRoutes.push(route.default)

    // 2.根据菜单选择需要添加的routes
    const _recurseGetRoute = (menus: any[]) => {
      for (const menu of menus) {
        if (menu.type === 2) {
          const route = allRoutes.find((route) => route.path === menu.url)
          if (route) routes.push(route)
          if (!firstMenu) firstMenu = menu
        } else {
          _recurseGetRoute(menu.children)
        }
      }
    }
    _recurseGetRoute(userMenus)
  })
  return routes
}

// 获取当前路径对应的菜单位置
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) return menu
  }
}

// 获取当前路径的面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 获取菜单权限

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

// 获取菜单子节点id
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetleaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) _recurseGetleaf(menu.children)
      else leafKeys.push(menu.id)
    }
  }
  _recurseGetleaf(menuList)
  return leafKeys
}

export { firstMenu }
