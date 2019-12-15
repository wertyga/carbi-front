module.exports = {
  apps: [
    {
      name: "carbi-frontend",
      script: "public/server/server.js",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
  ],
};
