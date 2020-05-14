module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:8080/'],
      startServerCommand: 'npm run start:static',
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


