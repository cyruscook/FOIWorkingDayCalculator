module.exports = {
  entry: {
    main: "./src/js/index.js",
    calendar: "./src/js/calendar.js",
    flow1: "./src/js/flow1.js",
    results: "./src/js/results.js",
    proclaimed_dates: "./src/js/proclaimed_dates.js"
  },
  output: {
    filename: "[name].js",
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
}
