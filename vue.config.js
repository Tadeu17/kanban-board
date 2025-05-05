const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    hot: true, // Ensure HMR is enabled
    host: "localhost", // Explicitly set the host
    port: 8080, // Set the port (default for Vue CLI)
    client: {
      overlay: true, // Show errors and warnings in the browser overlay
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/colors.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Ensure @ points to the src folder
      },
    },
  },
});
