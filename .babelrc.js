

module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  const isSite = api.env('site')

  if (isSite) {
    return {
      "plugins": [
        "transform-remove-strict-mode"
      ],
      "presets": [
        [
          "@babel/preset-env",
          {
            "loose": true,
            "modules": false
          }
        ],
        "babel-preset-gatsby"
      ]
    }
  }

  return {
    "plugins": [
      "transform-remove-strict-mode"
    ],
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