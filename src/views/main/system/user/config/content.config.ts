export const contentTableConfig = {
  category: '用户',
  propList: [
    { prop: 'name', label: '用户名' },
    { prop: 'realname', label: '真实姓名' },
    { prop: 'cellphone', label: '手机号码' },
    {
      prop: 'enable',
      label: '状态',
      slotName: 'status',
      minWidth: '60'
    },
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
