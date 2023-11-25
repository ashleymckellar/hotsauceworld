const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // change this to match your API endpoint
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL || 'http://localhost:8100',
      changeOrigin: true,
    })
  );
};
