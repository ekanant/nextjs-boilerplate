const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

function configFontLoader(config, options = {}) {
  let { isServer, name = "[name].[ext]" } = options;

  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
          fallback: "file-loader",
          publicPath: `/_next/static/fonts/`,
          outputPath: `${isServer ? "../" : ""}static/fonts/`,
          name
        }
      }
    ]
  });
  return config;
}

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
function configCss(config, { isServer, dev } = {}) {
  if (!isServer) {
    config.optimization.splitChunks.cacheGroups.styles = {
      name: "styles",
      chunks: "all",
      enforce: true
    };
  }

  config.module.rules.push({
    test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
          fallback: "file-loader",
          publicPath: `/_next/static/images/`,
          outputPath: `${isServer ? "../" : ""}static/images/`,
          name: dev ? "[name].[ext]" : "[hash].[ext]"
        }
      }
    ]
  });

  if (!dev) {
    /**
     * Optimize css in production mode
     */
    if (!Array.isArray(config.optimization.minimizer)) {
      config.optimization.minimizer = [];
    }
    config.optimization.minimizer.push(
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        }
      })
    );
  }

  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: "css-loader",
        options: {
          url: true,
          sourceMap: dev,
        }
      },
      "sass-loader"
    ]
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: dev
        ? "static/chunks/[name].css"
        : "static/chunks/[name].[contenthash:8].css",
      chunkFilename: dev
        ? "static/chunks/[name].chunk.css"
        : "static/chunks/[name].[contenthash:8].chunk.css",
      hot: dev
    })
  );

  return config;
}
const nextConfig = {
  webpack: (config, options) => {
    // Fixes npm packages that depend on `fs` module
    
    config.node = {
      fs: 'empty'
    }
  
    config = configFontLoader(config, options);
    config = configCss(config, options);

    return config
  }
}
module.exports = withBundleAnalyzer(nextConfig)
