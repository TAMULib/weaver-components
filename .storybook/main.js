module.exports = {
  stories: ['../**/*.stories.[tj]s'],
  addons: ['@storybook/addon-storysource', '@storybook/addon-knobs',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: false
      }
    }
  ]
};
