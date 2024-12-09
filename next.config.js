/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  browserslist: {
    production: [
      "last 2 versions", // Последние 2 версии каждого браузера
      "> 1%", // Браузеры, которые используются более чем 1% пользователей
      "not dead", // Исключение устаревших браузеров, не получающих обновления
      "not op_mini all", // Исключение Opera Mini
    ],
    development: [
      "last 3 chrome version", // Использование последней версии Chrome для разработки
      "last 3 firefox version",
      "last 3 safari version",
    ],
  },
};

module.exports = nextConfig;
