const Glob = require('glob');
const register = async (server, options) => {

const routes = []
// Load plugins
  Glob.sync('/routes/*.js', {
    root: __dirname,
    ignore: [
      './src/plugins/**/*.spec.js', 
      __dirname + '/index.js'
    ]
  }).forEach((file) => {
    routes.push(require(file))
  });
  
  try {
    server.route(routes);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  name: 'dogsPlugin',
  version: '1.0.0'
};
