export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '角色名' },
    { prop: 'intro', label: '权限范围' },
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
      slotName: 'handler'
    }
  ],
  showIndexColum: true,
  showSelectColum: true
}
