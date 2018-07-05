const webpackConfigDev = {
    mode: "development"

    ,entry: __dirname + "/client.js"

    ,resolve: {
      alias: {
        App: path.resolve(__dirname,'app/')
        ,Shortener: path.resolve(__dirname,'app/shortener')
        ,Components: path.resolve(__dirname, 'components')
        ,Helpers: path.resolve(__dirname, 'helpers')
      }
      // ,extensions: ['.js', '.jsx', '.png', '']
    }

    ,module: {
      rules: [

        //babel
        { test: /\.js$/
          ,exclude: /node_modules/
          ,loader: 'babel-loader'
          // ,query: {presets: ['env', 'react']}
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

    // ,externals: externals

    ,output: {
      filename: 'client.js'
      ,path: __dirname + '/build/shortener'
      // publicPath for dev server
      // ,publicPath: '/'
      ,chunkFilename: '[name].bundle.js'
    }

    ,devServer: {
      historyApiFallback:true
    }

    ,plugins: [
    //   UglifyJSConfig
      // HTMLWebpackConfig
      // ,new BundleAnalyzerPlugin()
      // ,basename
      ,require('precss')
      ,require('autoprefixer')
      ,miniCssConfig
    ]
  }

  export default webpackConfigDev