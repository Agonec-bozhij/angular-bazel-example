// The function exported from this file is used by the protractor_web_test_suite.
// It is passed to the `onPrepare` configuration setting in protractor and executed
// before running tests.
//
// If the function returns a promise, as it does here, protractor will wait
// for the promise to resolve before running tests.

const protractorUtils = require('@angular/bazel/protractor-utils');
const protractor = require('protractor');

module.exports = function(config) {
  // In this example, `@angular/bazel/protractor-utils` is used to run
  // the server. protractorUtils.runServer() runs the server on a randomly
  // selected port (given a port flag to pass to the server as an argument).
  // The port used is returned in serverSpec and the protractor serverUrl
  // is the configured.
  const isProdserver = config.server.endsWith('prodserver');
  return protractorUtils
      .runServer(config.workspace, config.server, isProdserver ? '-p' : '-port', [])
      .then(serverSpec => {
        // Example app is hosted under `/example` in the prodserver and under `/` in devserver
        const serverUrl = `http://localhost:${serverSpec.port}` + (isProdserver ? '/example' : '');
        protractor.browser.baseUrl = serverUrl;
      });
};
