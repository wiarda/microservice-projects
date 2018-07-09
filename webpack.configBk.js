var devSettings = require ('./webpackDev')
var prodSettings = require ('./webpackProd')
var webpack = require('webpack')
var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html'
  ,filename: 'index.html'
  ,inject: 'head'
})

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const miniCssConfig = new MiniCssExtractPlugin({
  filename: '[name].css'
  ,chunkFilename: '[id].css'
})

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var OptimizeCssAssetsConfig = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /.css$/
  ,cssProcessor: require('cssnano')
  ,cssProcessorOptions: {discardComments: {removeAll:true}}
  ,canPrint: true
})
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var UglifyJSConfig = new UglifyJSPlugin({
  test: /\.js($|\?)/i
  ,uglifyOptions:{
    dead_code:true
    ,output: {
      comments:false
      ,beautify:false
    }
  }
  // ,extractComments:true
})
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ROUTE_PATH = "/api/shorten"


module.exports = (env, argv) => {
  // let mode = argv.mode
  // let externals = mode === "development" ? {} : {
  //   react: 'React'
  //   ,'react-dom': 'ReactDOM'
  // }
  
  // Set up Routing

  // let routerPath = mode === "development" ? "/" : ROUTE_PATH
  // console.log("router path:",routerPath)
  // const basename = new webpack.DefinePlugin({
  //     BASENAME: JSON.stringify(routerPath)
  //   })


  switch (argv.mode){
    case "development":
      return devSettings
    case "production":
      return prodSettings
  }


  // return {
  //   mode: "development"

  //   ,entry: __dirname + "/client.js"

  //   ,resolve: {
  //     alias: {
  //       App: path.resolve(__dirname,'app/')
  //       ,Shortener: path.resolve(__dirname,'app/shortener')
  //       ,Components: path.resolve(__dirname, 'components')
  //       ,Helpers: path.resolve(__dirname, 'helpers')
  //     }
  //     // ,extensions: ['.js', '.jsx', '.png', '']
  //   }

  //   ,module: {
  //     rules: [

  //       //babel
  //       { test: /\.js$/
  //         ,exclude: /node_modules/
  //         ,loader: 'babel-loader'
  //         // ,query: {presets: ['env', 'react']}
  //       }

  //       //process css
  //       ,{ test: /\.css$/
  //         ,exclude: /node_modules/
  //         ,use: [MiniCssExtractPlugin.loader, 'css-loader']
  //       }

  //       //scss
  //       ,{ test: /\.(scss)$/
  //         ,exclude: /node_modules/
  //         ,use: [
  //           MiniCssExtractPlugin.loader
  //           ,'css-loader'
  //           ,"postcss-loader"
  //           ,'sass-loader'
  //         ]
  //       }

  //       //images
  //       ,{
  //         test: /\.(png|jpg|gif)$/,
  //         use: [
  //           {
  //             loader: 'file-loader',
  //             options: {}
  //           }
  //         ]
  //       }

  //       //text files
  //       ,{
  //         test: /\.txt$/,
  //         use: 'raw-loader'
  //       }

  //     ] // end of rules
  //   } //end of module

  //   // ,externals: externals

  //   ,output: {
  //     filename: 'client.js'
  //     // ,path: __dirname + '/build/shortener'
  //     ,path: path.join(__dirname, '/build/shortener') // for serving to node
  //     // publicPath for dev server
  //     // ,publicPath: '/'
  //     ,chunkFilename: '[name].bundle.js'
  //   }

  //   ,devtool: "source-map"

  //   ,devServer: {
  //     historyApiFallback:true // for react router
  //     ,contentBase: path.join(__dirname, '/build/shortener')
  //     ,watchContentBase: true
  //     ,proxy: [ // redirecting requests to webpack-dev-server to node server
  //       {
  //         context: ["/api"]
  //         ,target: "http://localhost:3000"
  //         ,secure: false
  //       }
  //       ,{
  //         context: ["/build"]
  //         ,target: "http://localhost:3000"
  //         ,secure: false
  //       }
  //     ]
  //     ,port: 8000
  //     ,overlay: {
  //       warnings: true
  //       ,errors: true
  //     }
  //   }

  //   ,plugins: [
  //     UglifyJSConfig
  //     // HTMLWebpackConfig
  //     // ,new BundleAnalyzerPlugin()
  //     // ,basename
  //     ,require('precss')
  //     ,require('autoprefixer')
  //     ,miniCssConfig
  //   ]
  // }

}
