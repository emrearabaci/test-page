const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '',
  pwa: {
    name: 'E-Bilgi',
    description: 'Bek',
    themeColor: '#008cba',
    msTitleColor: '#008cba'
  }
});
