const Joi = require('joi');
const DogController = require('../handlers');

module.exports = {
  method: 'POST',
  path: '/dogs',
  config: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        breed: Joi.string().required(),
        age: Joi.string().required(),
        image: Joi.string().required()
      })
    },
    plugins: {
      pagination: {
        enabled: false,
      }
    }
  },
  handler: DogController.create
};