const withImages = require('next-images')
const withModernizr = require("next-plugin-modernizr");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withImages(
  withBundleAnalyzer(
    withModernizr({
      exportTrailingSlash: true,
      exportPathMap: function() {
        return {
          '/': { page: '/' },
          '/en-th': { page: '/en-th' }
        };
      },
      webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
          fs: 'empty'
        }

        return config
      }
    })
  )
);
