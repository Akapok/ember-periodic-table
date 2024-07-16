'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'json'],
    },
  });

  return app.toTree();
};
