module.exports = function (api) {
  console.log('babel.config.js called');
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
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



