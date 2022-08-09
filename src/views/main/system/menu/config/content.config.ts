export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '菜单名称' },
    { prop: 'type', label: '类型' },
    { prop: 'url', label: '菜单url' },
    { prop: 'icon', label: '菜单icon' },
    { prop: 'permission', label: '按钮权限' },
    {
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createAt',
      minWidth: '120'
    },
    {
      prop: 'updateAt',
      label: '修改时间',
      slotName: 'updateAt',
      minWidth: '120'
    },
    {
      prop: 'handler',
      label: '操作',
      slotName: 'handler',
      minWidth: '85'
    }
  ],
  showIndexColum: false,
  showSelectColum: false,
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  showFooter: false
}
