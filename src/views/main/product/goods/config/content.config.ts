export const contentTableConfig = {
  category: '商品',
  propList: [
    { prop: 'name', label: '商品名称' },
    { prop: 'oldPrice', label: '原价', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价', slotName: 'newPrice' },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '80',
      slotName: 'image'
    },
    {
      prop: 'status',
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
      slotName: 'handler',
      minWidth: '85'
    }
  ],
  showIndexColum: true,
  showSelectColum: true
}
