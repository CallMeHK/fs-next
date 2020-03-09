require('dotenv').config()

module.exports = {
    /* config options here */

    /* have to poll if you want to use docker */
    webpackDevMiddleware: config => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        }
        return config
      }
}

