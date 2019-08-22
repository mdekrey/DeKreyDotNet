const webpackMerge = require("webpack-merge");

const tsConfig = {
    resolve: {
      extensions: [".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loaders: "babel-loader",
          options: {
            babelrc: false,
            extends: "./crau.babelrc"
          }
        }
      ]
    }
};

module.exports = {
  webpackPlugins: [],
  modifyWebpack: config => webpackMerge(config, tsConfig)
};