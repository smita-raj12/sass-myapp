const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  generateEtags: false,
  images: {
    domains: ['cloudapi.viewmynew.com', 'api.cloudapi.viewmynew.com'],
  },
  env: {
      REACT_APP_AUTH_NET_USER: process.env.REACT_APP_AUTH_NET_USER,
      REACT_APP_AUTH_NET_PASS: process.env.REACT_APP_AUTH_NET_PASS,
  }
});

