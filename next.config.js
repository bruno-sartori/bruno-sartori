const path = require('path');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withSass(withImages({
  cssModules: false,
  webpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, './src');

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }],
      },
    ];

    return config;
  }
}));
