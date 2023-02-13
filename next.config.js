/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

// module.exports = nextConfig;
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["jamesmycologysite.s3.us-west-1.amazonaws.com", "localhost:3000"], /// need to look into what this was,
    // loader: "custom",
    // loaderFile: "./lib/upload.js",
  },
  browser: {
    fs: false,
    path: false,
    os: false,
  },
});
