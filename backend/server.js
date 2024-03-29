'use strict';

// DEPENDANCIES
const Hapi = require('hapi');
const Path = require('path');
const Glob = require('glob');
const Mongoose = require('mongoose');


// HapiJS configuration
const server = Hapi.Server({
  port: 9000,
  routes: { 
    cors: true, 
    jsonp: 'callback' 
  }
});

// INIT
const boot = async () => {

  // Development configuration
  if (process.env.NODE_ENV === 'development') {
    await Promise.all(
      [
        // require('./src/middlewares/inert')(server), 
        // require('./src/middlewares/vision')(server),
        // require('./src/middlewares/hapi-swagger')(server),
        require('./src/middlewares/blipp')(server)
      ]
    );
    ;
  }

  // Not for tests configuration
  if (process.env.NODE_ENV !== 'test') {
    await require('./src/middlewares/good')(server);
  }

  await require('./src/middlewares/hapi-pagination')(server);

  try {
    await Glob.sync('./src/plugins/**/index.js', {
      root: __dirname,
      ignore: [
        './src/plugins/**/*.spec.js', 
        './src/plugins/index.js'
      ]
    }).forEach((file) => {
      console.log(['info', 'route'], `routefile ${file}: registered`);
      let plugin = require(file);
      server.register(
        plugin
      );
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await server.start();
    // Once started, connect to Mongo through Mongoose
    Mongoose.connect('mongodb://mongodb:27017/dev_env', {}).then(() => {
      console.log(`Connected to Mongo server`)
      console.log(`Server running at: ${server.info.uri}`);
    }, err => {
      console.log(err)
    });
  }
  catch (err) {
    console.log(err)
  }


  return server;
}

boot()
  .then((server) => console.log(`Server initialized at http://localhost:${server.info.port}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

process.on('SIGINT', async () => {

  // My process has received a SIGINT signal
  // Meaning PM2 is now trying to stop the process
  try {
    await server.stop({ timeout: 1000 });
  } catch (e) {
    console.error(e);
  }
  console.log('Hapi server stopped');
  process.exit();
});


module.exports = exports = server;