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
  // "@google-cloud/storage",
]);

// module.exports = nextConfig;
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["jamesmycologysite.s3.us-west-1.amazonaws.com"],
  },
});
