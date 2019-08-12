const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  // // console.log('​app', app)
  const proxyUrl = 'http://192.168.1.139:7008'
  const uploadProxyUrl = 'http://192.168.1.139:7008'
  // app.use(
  //   proxy('/api/upload', {
  //     target: uploadProxyUrl,
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   })
  // )
  app.use(
    proxy('/api', {
      target: proxyUrl,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
