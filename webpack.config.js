const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: {
    content: "./src/content.js", // Content script
    background: "./src/background.js" // Background script
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js", // Creates content.bundle.js and background.bundle.js
  },
  target: "web",
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new Dotenv(), // Load .env variables
  ],
};
