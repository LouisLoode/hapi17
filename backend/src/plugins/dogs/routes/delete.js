const Joi = require('joi');
const DogController = require('../handlers');

module.exports = {
  method: 'DELETE',
  path: '/dogs/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    plugins: {
      pagination: {
        enabled: false,
      }
    }
  },
  handler: DogController.remove
};