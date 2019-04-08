module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@lux/babel-preset-lux']
  };
};
