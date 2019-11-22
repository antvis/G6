module.exports = api => {
  api.cache(() => process.env.NODE_ENV);
  const isSite = api.env('site');

  if(isSite) {
    return {
      "presets": [
        "babel-preset-gatsby",
        "@babel/preset-env"
      ]
    }
  }
  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          "loose": true,
          "modules": false
        }
      ]
    ]
  }
}
