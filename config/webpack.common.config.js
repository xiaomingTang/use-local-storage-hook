const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const Paths = require("./Paths")
const { isProduction } = require("./Constants")

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "cheap-module-source-map",
  entry: isProduction
    ? { index: path.resolve(Paths.Src, "index/index.ts") }
    : { index: path.resolve(Paths.Src, "test/index.tsx") },
  output: {
    path: Paths.Dist,
    filename: "[name].min.js",
    library: "UseLocalStorage",
    libraryTarget: "umd",
  },
  externals: isProduction ? {
    "react": "react",
  } : {},
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@Src": Paths.Src,
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // 如果 node_modules 中的文件需要经过压缩等处理的, 必须在该 include 中添加路径
        include: [ Paths.Src ],
        exclude: /\.min\.js$/,
        use: [
          // { // 如果需要babel可自主启用(需下载相应依赖)
          //   loader: "babel-loader",
          //   options: {
          //     plugins: [
          //       [
          //         "@babel/plugin-transform-runtime",
          //         {
          //           corejs: 2,
          //         }
          //       ]
          //     ],
          //     presets: [
          //       "@babel/preset-env",
          //       "@babel/react",
          //     ]
          //   }
          // },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: !isProduction,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    !isProduction ? new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      title: "use-ducks",
      inject: "body",
      favicon: path.join(Paths.Public, "favicon.ico"),
      hash: true,
    }) : null,
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
  ].filter(Boolean),
}
