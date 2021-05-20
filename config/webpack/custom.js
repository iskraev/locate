const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '..', '..', 'app/assets/javascripts/components'),
      '@store': path.resolve(__dirname, '..', '..', 'app/assets/javascripts/store'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/assets/javascripts/utils'),
    }
  }
}