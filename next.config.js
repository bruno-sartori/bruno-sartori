const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const webpack = require('webpack');
const nextEnv = require('next-env');
const withPlugins = require('next-compose-plugins');
const path = require('path');

const getEnvPath = () => {
  let env = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      env = './.env.prod';
      break;
    case 'development':
      env = './.env.dev';
      break;
    case 'homolog':
      env = './.env.homolog';
      break;
    default:
      env = './.env.dev';
      break;
  }

  return env;
};

require('dotenv').config({ path: getEnvPath() });

module.exports = withPlugins([
  nextEnv(),
  withCSS(
    withSass({
      //withImages({
        webpack(config, { isServer }) {
          // Returns environment variables as an object
          const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
            return acc;
          }, {});
          // Allows you to create global constants which can be configured
          // at compile time, which in our case is our environment variables
          config.plugins.push(new webpack.DefinePlugin(env));
          
          config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              esModule: false
            }
          });
          // specific alias for sass
          config.resolve.alias['images'] = path.resolve(__dirname, './src/assets/images/');
          config.resolve.alias['styles'] = path.resolve(__dirname, './src/styles/');

        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }


          return config;
        }
      })
    //)
  )
]);
