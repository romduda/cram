module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: [['inline-dotenv', {
          path: '.env'
        }]]
      }
    }
    // transform: {
      // "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    //   "^.+\\.tsx?$": "ts-jest",
      // "^.+\\.[jt]sx?$": "babel-jest",
    }
  //   env: {
  //     "test": {
  //       "plugins": ["@babel/plugin-transform-modules-commonjs"]
  //     }
};



