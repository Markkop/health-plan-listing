const path = require('path')

module.exports = {
  outputDir: 'client/dist',
  pages: {
    index: {
      entry: 'client/src/main.js',
      template: 'client/public/index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client/src'),
        '@atoms': path.resolve(__dirname, 'client/src/components/atoms'),
        '@molecules': path.resolve(__dirname, 'client/src/components/molecules'),
        '@organisms': path.resolve(__dirname, 'client/src/components/organisms'),
        '@pages': path.resolve(__dirname, 'client/src/components/pages')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('copy')
      .use(require('copy-webpack-plugin'), [[{
        from: path.resolve(__dirname, 'client/public'),
        to: path.resolve(__dirname, 'dist'),
        toType: 'dir',
        ignore: ['.DS_Store']
      }]])
  }
}
