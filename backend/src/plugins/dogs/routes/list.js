const Joi = require('joi');
const DogController = require('../handlers');

module.exports = {
  method: 'GET',
  path: '/dogs',
  config: {
    validate: {
      query: {
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        pagination: Joi.boolean()
      }
    },
    plugins: {
      pagination: {
        enabled: true,
        defaults: {
          page: 10,
          limit: 1
        }
      },
    }
  },
  handler: DogController.list
};