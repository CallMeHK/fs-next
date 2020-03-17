require('dotenv').config()

const nextConfig = {
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

const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './less/antd-custom.less'), 'utf8'));



const plugins = [
	withCSS,
	withLess({
		lessLoaderOptions: {
			javascriptEnabled: true,
			modifyVars: themeVariables, 
		},
		webpack: (config, { isServer }) => {
			if (isServer) {
				const antStyles = /antd\/.*?\/style.*?/;
				const origExternals = [...config.externals];
				config.externals = [
					(context, request, callback) => {
						if (request.match(antStyles)) return callback();
						if (typeof origExternals[0] === 'function') {
							origExternals[0](context, request, callback);
						} else {
							callback();
						}
					},
					...(typeof origExternals[0] === 'function' ? [] : origExternals),
				];

				config.module.rules.unshift({
					test: antStyles,
					use: 'null-loader',
				});
			}
			return config;
		},
	}),
	withSass,
];
module.exports = withPlugins(plugins, nextConfig);