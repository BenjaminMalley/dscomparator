"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
var dev = process.env.NODE_ENV === "dev";
var pkgRoot = path.resolve(".");
var entryPoint = [process.env.ENTRY || path.join(pkgRoot,"src","index.js")];

var plugins = [
  new HtmlWebpackPlugin({
    template: "index.html",
    inject: true,
  }),
  new webpack.DefinePlugin({
    "__PRODUCTION__": !dev,
    "__TEST__": false,
    "__ENTRY_POINT__": "'" + entryPoint + "'",
  }),
];

if (dev) {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);
  entryPoint = entryPoint.concat(
    require.resolve("webpack-dev-server/client")+"?http://0.0.0.0:3000",
    require.resolve("webpack/hot/only-dev-server")
  );
} else {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
  ])
}

module.exports = {
  entry: entryPoint,
  devtool: "source-map",
  eslint: {
    configFile: path.join(__dirname, ".eslintrc"),
  },
  debug: true,
  output: {
    publicPath: "/",
    path: path.join(pkgRoot, "dist"),
    filename: "output.bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          require.resolve("style-loader"),
          require.resolve("css-loader")+"?localIdentName=[path][name]---[local]---[hash:base64:5]",
        ]
      },
      {
        test: /\.js$/,
        include: path.join(pkgRoot, "src"),
        loader: require.resolve("react-hot-loader"),
      },
      {
        test: /\.js$/,
        include: path.join(pkgRoot, "src"),
        loader: require.resolve("babel-loader"),
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: [
            ["transform-decorators-legacy"]
          ],
        },
      },
      {
        test: /\.js$/,
        include: path.join(pkgRoot, "src"),
        loader: require.resolve("eslint-loader"),
      },
      {
        test: /\.less$/,
        loaders: [
          require.resolve("style-loader"),
          require.resolve("css-loader")+"?localIdentName=[path][name]---[local]---[hash:base64:5]",
          require.resolve("less-loader"),
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          require.resolve("url-loader")+"?limit=10000&minetype=application/font-woff",
        ],
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          require.resolve("file-loader"),
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        loaders: [
          require.resolve("url-loader"),
        ],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    alias: {
      "common": path.join(pkgRoot, "src", "common"),
      "components": path.join(pkgRoot, "src", "components"),
      "src": path.join(pkgRoot, "src"),
    }
  }
};
