module.exports = {
  ci: {
    collect: {
      staticDistDir: './',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'uses-rel-preload': 'off',
        'uses-rel-preconnect': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage'
    },
  },
};


