module.exports = {
    devServer: {
      proxy: {
        '/': {
          target: `http://localhost:${process.env.WEB_API_PORT || 3000}`,
        }
      }
    }
  }