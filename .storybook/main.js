const path = require('path');

module.exports = {
  stories: ['../**/*.stories.[tj]s'],
  addons: ['@storybook/addon-storysource', '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: false
      }
    }
  ],
  webpackFinal: async (config, { configType }) => {

    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader'
    })

    config.resolve.extensions.push(".ts");

    // Return the altered config
    return config;
  }
};
