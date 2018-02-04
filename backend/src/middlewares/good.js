'use strict';

exports = module.exports = async (server) => {
  try {
    await server.register({
      plugin: require('good'),
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          }, {
            module: 'good-console'
          }, 'stdout'],
          myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
          }, {
            module: 'good-squeeze',
            name: 'SafeJson'
          }, {
            module: 'good-file',
            args: ['./tmp/logs/awesome_log']
          }]
        }
      }
    });

  } catch (e) {
    console.error(['error', 'plugin'], 'plugin: good register error');
    throw e;
  }

  console.log(['info', 'plugin'], 'plugin: good registered');
  return true;

};