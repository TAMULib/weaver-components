module.exports = {
  ci: {
    collect: {
      staticDistDir: './',
    },
    upload: {
      target: 'temporary-public-storage',
      token: $LHCI_GITHUB_APP_TOKEN
    },
  },
};


