const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html'
  ,filename: 'index.html'
  ,inject: 'head'
})
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const miniCssConfig = new MiniCssExtractPlugin({
  filename: '[name].css'
  ,chunkFilename: '[id].css'
})

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OptimizeCssAssetsConfig = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /.css$/
  ,cssProcessor: require('cssnano')
  ,cssProcessorOptions: {discardComments: {removeAll:true}}
  ,canPrint: true
})
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const UglifyJSConfig = new UglifyJSPlugin({
  test: /\.js($|\?)/i
  ,uglifyOptions:{
    dead_code:true
    ,output: {
      comments:false
      ,beautify:false
    }
  }
  ,extractComments:true
})
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const alias = {
  App: path.resolve(__dirname,'app/')
  ,Shortener: path.resolve(__dirname,'app/shortener')
  ,Components: path.resolve(__dirname, 'components')
  ,Helpers: path.resolve(__dirname, 'helpers')
}

const externals = {
  // react: 'React'
  // ,'react-dom': 'ReactDOM'
}

// Set up routing base path for client
const routerPath = "/"
const webpack = require("webpack")
const basename = new webpack.DefinePlugin({
      BASENAME: JSON.stringify(routerPath)
    })


// Entry points for services
const entry = {
  shortener: path.resolve(__dirname, "app/shortener/shortenerClient.js")
  ,metadata: path.resolve(__dirname, "app/metadata/metadataClient.js")
  ,converter: path.resolve(__dirname, "app/metric-converter/converterClient.js")
  ,tracker: path.resolve(__dirname, "app/issueTracker/issueTrackerClient.js")
}




const devSettings = {
    mode: "development"

    // ,entry: __dirname + "/client.js"
    ,entry

    ,output: {
      filename: '[name].bundle.js'
      ,path: path.join(__dirname, 'build') // need to serve this as a public folder on node server
      ,publicPath: '/build' // sets where dev server's files are emitted
      // ,chunkFilename: '[name].bundle.js'
    }

    ,optimization: {
      splitChunks: {
        chunks: "all"
        ,name: "shared"
      }
    }

    ,resolve: {
      alias
      ,extensions: ['.ts', '.tsx', '.js', '.json']
    }

    ,module: {
      rules: [

        //babel
        { test: /\.[jt]sx?$/
          ,exclude: /node_modules/
          ,loader: 'babel-loader'
          ,options: {
            cacheDirectory: true // feature of babel-loader to speed up loads by caching
          }
        }

        //process css
        ,{ test: /\.css$/
          ,exclude: /node_modules/
          ,use: [MiniCssExtractPlugin.loader, 'css-loader']
        }

        //scss
        ,{ test: /\.(scss)$/
          ,exclude: /node_modules/
          ,use: [
            MiniCssExtractPlugin.loader
            ,'css-loader'
            ,"postcss-loader"
            ,'sass-loader'
          ]
        }

        //images
        ,{
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }

        //text files
        ,{
          test: /\.txt$/,
          use: 'raw-loader'
        }

      ] // end of rules
    } //end of module

    ,devtool: "source-map"

    ,devServer: {
      historyApiFallback:true // for react router
      ,index:""
      ,contentBase: path.join(__dirname, '/build')
      ,watchContentBase: true
      ,proxy:          
        [{ // redirecting webpack-dev-server to node server
          context: ()=>true
          ,target: "http://localhost:3000"
          ,secure: false
        }]
      ,port: 8000
      ,overlay: {
        warnings: true
        ,errors: true
      }
    }

    ,plugins: [
      // UglifyJSConfig
      // HTMLWebpackConfig
      // ,new BundleAnalyzerPlugin()
      // ,basename
      require('precss')
      ,require('autoprefixer')
      ,miniCssConfig
    ]
  }









  const prodSettings = {
    mode: "production"

    ,entry

    ,output: {
      filename: '[name].bundle.js'
      ,path: path.join(__dirname, '/build')
      // ,chunkFilename: '[name].bundle.js'
    }

    ,optimization: {
      splitChunks: {chunks: "all"}
    }

    ,resolve: {
      alias
      ,extensions: ['.ts', '.tsx', '.js', '.json']
    }

    ,module: {
      rules: [

        //babel
        { test: /\.js$/
          ,exclude: /node_modules/
          ,loader: 'babel-loader'
        }

        //process css
        ,{ test: /\.css$/
          ,exclude: /node_modules/
          ,use: [MiniCssExtractPlugin.loader, 'css-loader']
        }

        //scss
        ,{ test: /\.(scss)$/
          ,exclude: /node_modules/
          ,use: [
            MiniCssExtractPlugin.loader
            ,'css-loader'
            ,"postcss-loader"
            ,'sass-loader'
          ]
        }

        //images
        ,{
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }

        //text files
        ,{
          test: /\.txt$/,
          use: 'raw-loader'
        }

      ] // end of rules
    } //end of module

    ,externals
    
    // ,devtool: "source-map"

    // ,devServer: {
    //   historyApiFallback:true // for react router
    //   ,contentBase: path.join(__dirname, '/build/shortener')
    //   ,watchContentBase: true
    //   ,proxy: [ // redirecting requests to webpack-dev-server to node server
    //     {
    //       context: ["/api"]
    //       ,target: "http://localhost:3000"
    //       ,secure: false
    //     }
    //     ,{
    //       context: ["/build"]
    //       ,target: "http://localhost:3000"
    //       ,secure: false
    //     }
    //   ]
    //   ,port: 8000
    //   ,overlay: {
    //     warnings: true
    //     ,errors: true
    //   }
    // }

    ,plugins: [
      UglifyJSConfig
      // ,HTMLWebpackConfig
      ,new BundleAnalyzerPlugin()
      ,basename
      ,require('precss')
      ,require('autoprefixer')
      ,miniCssConfig
    ]
  }


module.exports = (env, argv) => {
  switch (argv.mode){
    case "development":
      return devSettings
    case "production":
      return prodSettings
  }
}
