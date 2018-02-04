'use strict';

exports = module.exports = async (server) => {
  try {
    await server.register({
      plugin: require('hapi-pagination')
    });

  } catch (e) {
    console.error(['error', 'plugin'], 'plugin: hapi-pagination register error');
    throw e;
  }

  console.log(['info', 'plugin'], 'plugin: hapi-pagination registered');
  return true;

};
