const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 解决跨域
  // devServer: {
  //   proxy: {
  //     '^api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  publicPath: './',
  transpileDependencies: true
})
