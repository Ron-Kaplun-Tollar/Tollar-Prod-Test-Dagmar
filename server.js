const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// האתר המקומי
app.use(express.static(path.join(__dirname, "public")));

// פרוקסי לכל בקשה שמתחילה ב-/agent (שומר את הנתיב כמו שהוא)
app.use(
  createProxyMiddleware({
    target: "https://stage.tollar.com",
    changeOrigin: true,
    secure: true,
    ws: true,
    logLevel: "debug",
    cookieDomainRewrite: "localhost",
    pathFilter: (pathname) => pathname.startsWith("/agent"),
  })
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Open: http://localhost:${PORT}`));
