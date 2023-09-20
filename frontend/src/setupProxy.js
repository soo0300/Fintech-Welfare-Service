const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      target: "http://j9c209.p.ssafy.io:8085",
      changeOrigin: true,
    })
  );
};
