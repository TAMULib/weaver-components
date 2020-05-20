module.exports = {
  siteTitle: `Lighthouse Report`,
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
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}],
        "categories:pwa": ["error", {"minScore": 0.9}]
      },
    },
    upload: {
      target: 'temporary-public-storage'
    },
  },
};

  // "lighthouse": {
  //   "requiredScores": {
  //     "performance": 1,
  //     "accessibility": 90,
  //     "best-practices": 90,
  //     "seo": 90,
  //     "pwa":10
  //   }
  // }
