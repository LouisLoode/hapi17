'use strict';

exports = module.exports = async (server) => {
  try {
    await server.register({
      plugin: require('blipp'),
      options: { showAuth: true }
    });

  } catch (e) {
    console.error(['error', 'plugin'], 'plugin: blipp register error');
    throw e;
  }

  console.log(['info', 'plugin'], 'plugin: blipp registered');
  return true;

};
